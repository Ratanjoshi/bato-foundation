const { WebSocketServer } = require("ws");
const { verifyToken } = require("./helpers/jwt-helper");
const { findSingleUserLog } = require("./api/services/session-logs");
// Import clients from notification.js instead of defining a new one
const { clients } = require("./helpers/send-notification");

const initWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws, req) => {
    try {
      const protocolHeader = req.headers["sec-websocket-protocol"];
      if (!protocolHeader) {
        console.log("No token provided, closing connection.");
        ws.close(4000, "Authentication required");
        return;
      }

      const token = protocolHeader.replace("Admin, ", "").trim();
      if (!token) {
        console.log("Token is empty, closing connection.");
        ws.close(4000, "Invalid token");
        return;
      }

      const userData = await verifyToken(token);
      if (!userData || !userData.id) {
        console.log("Invalid token, closing connection.");
        ws.close(4000, "Invalid token");
        return;
      }

      const isSession = await findSingleUserLog(userData.id);
      if (!isSession) {
        console.log("Unauthorized user, closing connection.");
        ws.close(4000, "You're not authorized!");
        return;
      }

      clients.set(userData.id, ws);
      ws.user = userData;
      console.log(`User connected: ${userData.id}`);

      ws.on("close", () => {
        clients.delete(userData.id);
        console.log(`User disconnected: ${userData.id}`);
      });

      ws.send("Connected to WebSocket server");
    } catch (err) {
      console.log("Error in WebSocket connection:", err.message);
      ws.close(4000, "Internal Server Error");
    }
  });
};

module.exports = { initWebSocket };
