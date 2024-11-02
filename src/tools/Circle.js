import useCanvasState from '../store/canvasState'

export default function Brush() {
    const stateCanvas = useCanvasState.getState()

    const ctx = stateCanvas.canvas.getContext('2d')
    let mouseDown = false
    let startX
    let startY
    let saved
    
    const mouseUpHandler = () => {
        mouseDown = false
    };
    
    const mouseDownHandler = (e) => {
        mouseDown = true
        ctx.beginPath()
        ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        startX = e.pageX - e.target.offsetLeft
        startY =  e.pageY - e.target.offsetTop
        saved = stateCanvas.canvas.toDataURL()
    };
    
    const mouseMoveHandler = (e) => {
        if (mouseDown){
            let currentX = e.pageX - e.target.offsetLeft
            let radius = currentX - startX
            draw(startX, startY, radius)
        }
    };
    
    const draw = (x, y, r) => {
        if (r <= 0) {
            r = 0
        }
        const img = new Image()
        img.src = saved
        img.onload = () => {
            ctx.clearRect(0, 0, stateCanvas.canvas.width, stateCanvas.canvas.height)
            ctx.drawImage(img, 0, 0)
            ctx.beginPath()
            ctx.arc(x, y, r, 0, Math.PI * 2, false)
            ctx.fill()
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