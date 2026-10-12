const router = require("express").Router();
const path = require("path");
const fs = require("fs");

const routesPath = path.join(__dirname, "routes");

fs.readdirSync(routesPath).forEach((file) => {
  if (file.endsWith("-route.js")) {
    const filePath = path.join(routesPath, file);
    const route = require(filePath);
    const routeName = `/${file.replace("-route.js", "")}`;
    router.use(routeName, route);
  }
});

router.get("/", (req, res) => {
  res.send("api/v1 health check!");
});

module.exports = router;
