import useSessionState from "../store/sessionState";
import useCanvasState from "../store/canvasState.js";
import drawHandler from "./draw.js";

export default function serverRequests(username, id) {
  const { setSocket, setSessionId } = useSessionState.getState();
  const { ctx } = useCanvasState.getState();
  if (username) {
    const socket = new WebSocket("ws://localhost:3500/");
    setSocket(socket);
    setSessionId(id);
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          id: id,
          username: username,
          method: "connection",
        })
      );
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.method) {
        case "connection":
          console.log(`Пользователь ${message.username} подключен`);
          break;
        case "draw":
          drawHandler(message, ctx);
          break;
      }
    };
  }
}
