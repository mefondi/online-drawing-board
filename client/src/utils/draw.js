import useCanvasState from "../store/canvasState";

export default function drawHandler(message, ctx) {
  ctx.lineWidth = message.lineWidth;
  ctx.fillStyle = message.fillStyle;
  ctx.strokeStyle = message.strokeStyle;
  const stateCanvas = useCanvasState.getState();

  switch (message.figure) {
    case "Brush":
      Brush(message, ctx);
      break;
    case "Eraser":
      Eraser(message, ctx);
      break;
    case "React":
      React(message, ctx);
      break;
    case "Circle":
      Circle(message, ctx);
      break;
    case "Line":
      Line(message, ctx);
      break;
    case "Undo":
      stateCanvas.undo();
      break;
    case "Rendo":
      stateCanvas.rendo();
      break;
    case "AddUndo":
      stateCanvas.pushUndoList(message.Url)
      break;
    case "stopDraw":
      ctx.beginPath();
      break;
  };
}

function Eraser(message, ctx) {
  const { x, y } = message;
  const color = ctx.strokeStyle
  ctx.strokeStyle = "white";
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.strokeStyle = color;
}

function Brush(message, ctx) {
  const { x, y } = message;
  ctx.lineTo(x, y);
  ctx.stroke(); 
}

const React = (message, ctx) => {
  const { x, y, width, height } = message;
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fill();
  ctx.stroke();
};

const Circle = (message, ctx) => {
  const { x, y, r } = message;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.stroke();
};

const Line = (message, ctx) => {
  const { x, y, currentX, currentY } = message;
  ctx.beginPath();
  ctx.moveTo(currentX, currentY);
  ctx.lineTo(x, y);
  ctx.stroke();
};
