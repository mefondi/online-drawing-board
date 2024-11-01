import Tool from "./Tool"

export default class Brush extends Tool {
    constructor(canvas) {
        super(canvas)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e){
        this.mouseDown = false
    }
    mouseDownHandler(e){
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        this.startX = e.pageX - e.target.offsetLeft
        this.startY =  e.pageY - e.target.offsetTop
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e){
        if (this.mouseDown){
            let currentX = e.pageX - e.target.offsetLeft
            let radius = currentX - this.startX
            this.draw(this.startX, this.startY, radius)
        }
    }

    draw(x, y, r) {
        if (r <= 0) {
            r = 0
        }
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0)
            this.ctx.beginPath()
            this.ctx.arc(x, y, r, 0, Math.PI * 2, false)
            this.ctx.fill()
            this.ctx.stroke()
        } 
    }
}