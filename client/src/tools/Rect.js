import useCanvasState from "../store/canvasState";
import useSessionState from "../store/sessionState";

export default function React() {
  const stateCanvas = useCanvasState.getState();
  const sessionState = useSessionState.getState();

  const ctx = stateCanvas.canvas.getContext("2d");
  let mouseDown = false;
  
  stateCanvas.setTool('React')

  let startX;
  let startY;
  let width;
  let height;
  let saved;

  const mouseUpHandler = () => {
    mouseDown = false;
    sessionState.socket.send(
      JSON.stringify({
        method: "draw",
        figure: "React",
        id: sessionState.sessionId,
        x: startX,
        y: startY,
        width: width,
        height: height,
        fillStyle: stateCanvas.fillStyle,
        lineWidth: stateCanvas.lineWidth ,
        strokeStyle: stateCanvas.strokeStyle,
      })
    );
  };

  const mouseDownHandler = (e) => {
    mouseDown = true;
    ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    startX = e.pageX - e.target.offsetLeft;
    startY = e.pageY - e.target.offsetTop;
    saved = stateCanvas.canvas.toDataURL();
  };

  const mouseMoveHandler = (e) => {
    if (mouseDown) {
      const currentX = e.pageX - e.target.offsetLeft;
      const currentY = e.pageY - e.target.offsetTop;
      width = currentX - startX;
      height = currentY - startY;
      draw(startX, startY, width, height);
    }
  };
  const draw = (x, y, w, h) => {
    const img = new Image();
    img.src = saved;
    ctx.lineWidth = stateCanvas.lineWidth;
    ctx.fillStyle = stateCanvas.fillStyle;
    ctx.strokeStyle = stateCanvas.strokeStyle;
    img.onload = () => {
      ctx.clearRect(0, 0, stateCanvas.canvas.width, stateCanvas.canvas.height);
      ctx.drawImage(img, 0, 0);
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fill();
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
