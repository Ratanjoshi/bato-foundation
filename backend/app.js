"use strict";
require("dotenv").config();
require("./utils/media/deleteMediaTimer");
require("./helpers/passport-helper");

// package
const express = require("express");
const device = require("express-device");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const crypto = require("crypto");
const ip = require("ip");
const session = require("express-session");
const morgan = require("morgan");
const fs = require("fs");

//path
const messageConstants = require("./constants/message-constant");
const setupPath = require("./configs/setup");
const { Sequelize } = require("./models");
const logger = require("./configs/logger");
const { apiRateLimiter } = require("./utils/loginRateLimit");

// const { apiRateLimiter } = require("./utils/loginRateLimit");

//websocket
const { initWebSocket } = require("./websocket");
const { sendNotification } = require("./helpers/send-notification");
const { authenticate } = require("passport");
const { authentication } = require("./middlewares/auth-middleware");

const morganFormat = ":method :url :status :response-time ms";
const baseUrl = "";

const app = express();
const server = require("http").createServer(app);

app.use(
  "/resources",
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: false,
    methods: ["GET", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
  express.static(path.join(__dirname, "resources")),
);

const allowedOrigins = [
  "http://192.168.1.251:2004",
  "https://staging.unimomo.co.uk", // frontend URL
  "https://admin.unimomo.co.uk", // frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        /^http:\/\/localhost:\d+$/.test(origin)
      )
        return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(helmet());
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  }),
);

app.set("trust proxy", 1);
app.use((req, res, next) => {
  // Get the relevant headers
  const userAgent = req.headers["user-agent"] || "";
  const acceptLanguage = req.headers["accept-language"] || "";
  const connection = req.headers["connection"] || "";
  const ip =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress || "";

  // Generate a fingerprint using SHA-256 (you can use other hash functions)
  const fingerprint = crypto
    .createHash("sha256")
    .update(userAgent + acceptLanguage + connection + ip)
    .digest("hex");

  // Attach the fingerprint to the request object
  req.deviceFingerprint = fingerprint;

  next();
});

app.use(device.capture());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
  }),
);

// Redis session storage
app.use(
  session({
    secret: process.env.SESSION_SECRET || "nirvana", // Use env for security
    resave: false,
    saveUninitialized: false, // Only save authenticated sessions
    // cookie: {
    //   maxAge: 1 * 60 * 60 * 1000, // 1 day expiration
    //   httpOnly: true, // Prevent JS access
    //   secure: process.env.NODE_ENV === "production", // HTTPS in prod
    //   sameSite: "lax", // CSRF protection
    // },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(baseUrl + "/api/v1", apiRateLimiter, require("./api")); // -------- main api -----------

app.use("/setup/", setupPath);

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(
  "/uploads",
  // authentication,
  express.static(path.join(__dirname, "uploads")),
);
console.log("Static path:", path.join(__dirname, "../client/web"));
app.use((req, res, next) => {
  if (/(.ico|.js|.css|.jpg|.svg|.png|.map)$/i.test(req.path)) {
    next();
  } else {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.sendFile(path.join(__dirname, "../client/web", "index.html"));
  }
});
app.use("/", express.static(path.join(__dirname, "../client/web")));

const MAX_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB cap

app.get("/video/:filepath", (req, res) => {
  const { filepath } = req.params;
  const videoPath = path.join(__dirname, "videos", filepath);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).send("Video not found");
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;
  console.log(range);
  if (!range) {
    console.warn(`Full file request rejected for ${videoPath}`);
    return res.status(416).json({
      error:
        "Range header required for streaming. Full file downloads are not allowed.",
    });
  }

  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

  // Cap the chunk size
  const requestedChunkSize = end - start + 1;
  if (requestedChunkSize > MAX_CHUNK_SIZE) {
    end = start + MAX_CHUNK_SIZE - 1; // Limit to 5MB
    if (end >= fileSize) end = fileSize - 1; // Don’t exceed file size
  }
  const chunkSize = end - start + 1;

  console.log(chunkSize, start, end);
  const file = fs.createReadStream(videoPath, { start, end });

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunkSize,
    "Content-Type": "video/mp4",
  });

  file.pipe(res);
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//error handler
app.use((err, req, res, next) => {
  const { message, title } =
    err instanceof Sequelize.ValidationError
      ? {
          message: err.errors?.[0]?.message || "Validation error occurred.",
          title: "Validation Error",
        }
      : {
          message: err.message || "An unknown error occurred.",
          title: err.title || messageConstants.EN.INTERNAL_SERVER_ERROR,
        };
  logger.error(message);

  res.status(err.status || 500).json({
    title,
    message,
    data: [],
  });
});

initWebSocket(server);

module.exports = { app, server };
