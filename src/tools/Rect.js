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
            const currentX = e.pageX - e.target.offsetLeft
            const currentY =  e.pageY - e.target.offsetTop
            const width = currentX - startX
            const height = currentY - startY
            draw(startX, startY, width, height)
        }
    };
    
    const draw = (x, y, w, h) => {
        const img = new Image()
        img.src = saved
        img.onload = () => {
            ctx.clearRect(0, 0, stateCanvas.canvas.width, stateCanvas.canvas.height)
            ctx.drawImage(img, 0, 0)
            ctx.beginPath()
            ctx.rect(x, y, w, h)
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
    stateCanvas.setСtx(ctx)
}