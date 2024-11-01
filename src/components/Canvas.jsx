import React, { useEffect, useRef } from 'react'
import st from './style/canvas.module.css'
import useCanvasState from '../store/canvasState'
import useToolState from '../store/toolState'
import Brush from '../tools/Brush'

export default function Canvas() {
  const {canvas, setCanvas} = useCanvasState()
  const {tool, setTool} = useToolState()
  const canvasRef = useRef()
  
  useEffect(()=>{
    setCanvas(canvasRef.current)
    setTool(new Brush(canvasRef.current))
  }, [])

  return (
    <div className={st.canvas}>
        <canvas ref={canvasRef} width={1000} height={600}/>
    </div>
  )
}