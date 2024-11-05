import useCanvasState from "../store/canvasState";

export default function () {
  const stateCanvas = useCanvasState.getState();
  const dataURL = stateCanvas.canvas.toDataURL();

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `${Date.now()}.png`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
