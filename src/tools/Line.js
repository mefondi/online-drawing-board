import useCanvasState from '../store/canvasState'

export default function Brush() {
    const stateCanvas = useCanvasState.getState()

    const ctx = stateCanvas.canvas.getContext('2d')
    let mouseDown = false
    let currentX
    let currentY
    let saved
    
    const mouseUpHandler = () => {
        mouseDown = false
    };
    
    const mouseDownHandler = (e) => {
        mouseDown = true
        ctx.beginPath()
        currentX = e.pageX-e.target.offsetLeft
        currentY = e.pageY-e.target.offsetTop
        ctx.moveTo(currentX, currentY )
        saved = stateCanvas.canvas.toDataURL()
    };
    
    const mouseMoveHandler = (e) => {
        if (mouseDown){
            draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop);
        }
    };
    
    const draw = (x, y) => {
        const img = new Image()
        img.src = saved
        img.onload = () => {
            ctx.clearRect(0,0, stateCanvas.canvas.width, stateCanvas.canvas.height)
            ctx.drawImage(img, 0, 0)
            ctx.beginPath()
            ctx.moveTo(currentX, currentY )
            ctx.lineTo(x, y)
            ctx.stroke()
        }
    }
    stateCanvas.canvas.onmousemove = null
    stateCanvas.canvas.onmousedown = null
    stateCanvas.canvas.onmouseup = null
    stateCanvas.canvas.onmousemove = (e) => mouseMoveHandler(e)
    stateCanvas.canvas.onmousedown = (e) => mouseDownHandler(e)
    stateCanvas.canvas.onmouseup = (e) => mouseUpHandler(e)
    stateCanvas.setCtx(ctx)
}