import useCanvasState from "../store/canvasState";
import useSessionState from "../store/sessionState";

export default function Line() {
  const stateCanvas = useCanvasState.getState();
  const sessionState = useSessionState.getState();

  const ctx = stateCanvas.canvas.getContext("2d");
  stateCanvas.setTool('Line')
  let mouseDown = false;
  let currentX;
  let currentY;
  let saved;
  let x;
  let y;

  const mouseUpHandler = () => {
    mouseDown = false;
    sessionState.socket.send(
      JSON.stringify({
        method: "draw",
        figure: "Line",
        id: sessionState.sessionId,
        x: x,
        y: y,
        currentX: currentX,
        currentY: currentY,
        fillStyle: stateCanvas.fillStyle,
        lineWidth: stateCanvas.lineWidth ,
        strokeStyle: stateCanvas.strokeStyle,
      })
    );
  };

  const mouseDownHandler = (e) => {
    mouseDown = true;
    ctx.beginPath();
    currentX = e.pageX - e.target.offsetLeft;
    currentY = e.pageY - e.target.offsetTop;
    ctx.moveTo(currentX, currentY);
    saved = stateCanvas.canvas.toDataURL();
  };

  const mouseMoveHandler = (e) => {
    if (mouseDown) {
      x = e.pageX - e.target.offsetLeft;
      y = e.pageY - e.target.offsetTop;
      draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  };

  const draw = (x, y) => {
    const img = new Image();
    img.src = saved;
    ctx.lineWidth = stateCanvas.lineWidth;
    ctx.fillStyle = stateCanvas.fillStyle;
    ctx.strokeStyle = stateCanvas.strokeStyle;
    img.onload = () => {
      ctx.clearRect(0, 0, stateCanvas.canvas.width, stateCanvas.canvas.height);
      ctx.drawImage(img, 0, 0);
      ctx.beginPath();
      ctx.moveTo(currentX, currentY);
      ctx.lineTo(x, y);
      ctx.stroke();
    };
  };
  stateCanvas.canvas.onmousemove = null;
  stateCanvas.canvas.onmousedown = null;
  stateCanvas.canvas.onmouseup = null;
  stateCanvas.canvas.onmousemove = (e) => mouseMoveHandler(e);
  stateCanvas.canvas.onmousedown = (e) => mouseDownHandler(e);
  stateCanvas.canvas.onmouseup = (e) => mouseUpHandler(e);
  stateCanvas.setCtx(ctx);
}
