import useCanvasState from "../store/canvasState";
import useSessionState from "../store/sessionState";

export default function Brush() {
  const stateCanvas = useCanvasState.getState();
  const sessionState = useSessionState.getState();

  const ctx = stateCanvas.canvas.getContext("2d");
  let mouseDown = false;
  stateCanvas.setTool('Brush')

  const mouseUpHandler = () => {
    mouseDown = false;
  };

  const mouseDownHandler = (e) => {
    if (!sessionState.socket) {
      return
    }
    mouseDown = true;
    sessionState.socket.send(
      JSON.stringify({
        method: "draw",
        figure: "stopDraw",
        id: sessionState.sessionId,
        fillStyle: stateCanvas.fillStyle,
        lineWidth: stateCanvas.lineWidth ,
        strokeStyle: stateCanvas.strokeStyle,
      })
    );
    ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
  };

  const mouseMoveHandler = (e) => {
    if (mouseDown) {
      sessionState.socket.send(
        JSON.stringify({
          method: "draw",
          figure: "Brush",
          id: sessionState.sessionId,
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop,
        })
      );
    }
  };
  stateCanvas.canvas.onmousemove = null;
  stateCanvas.canvas.onmousedown = null;
  stateCanvas.canvas.onmouseup = null;
  stateCanvas.canvas.onmousemove = (e) => mouseMoveHandler(e);
  stateCanvas.canvas.onmousedown = (e) => mouseDownHandler(e);
  stateCanvas.canvas.onmouseup = (e) => mouseUpHandler(e);
  stateCanvas.setCtx(ctx);
}
