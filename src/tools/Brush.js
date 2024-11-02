import useCanvasState from '../store/canvasState'

export default function Brush() {
    const stateCanvas = useCanvasState.getState()

    const ctx = stateCanvas.canvas.getContext('2d')
    let mouseDown = false

    const mouseUpHandler = () => {
        mouseDown = false
    };

    const mouseDownHandler = (e) => {
        mouseDown = true
        ctx.beginPath()
        ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    };

    const mouseMoveHandler = (e) => {
        if (mouseDown) {
            draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    };

    function draw(x, y) {
        ctx.strokeStyle = 'black'
        ctx.lineTo(x, y)
        ctx.stroke()
    }
    stateCanvas.canvas.onmousemove = null
    stateCanvas.canvas.onmousedown = null
    stateCanvas.canvas.onmouseup = null
    stateCanvas.canvas.onmousemove = (e) => mouseMoveHandler(e)
    stateCanvas.canvas.onmousedown = (e) => mouseDownHandler(e)
    stateCanvas.canvas.onmouseup = (e) => mouseUpHandler(e)
    stateCanvas.setСtx(ctx)
}
