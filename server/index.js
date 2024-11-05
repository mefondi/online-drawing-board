const express = require("express");
const app = express();
const WSServer = require("express-ws")(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT || 3500;

app.use(express.json())

app.ws("/", (ws, req) => {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "draw":
        BroadcastConnection(ws, msg);
        break;
    }
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server running on ${PORT} PORT`);
  }
});

function connectionHandler(ws, msg) {
  ws.id = msg.id;
  BroadcastConnection(ws, msg);
}
function BroadcastConnection(ws, msg) {
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
}
