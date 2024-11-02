import React, { useEffect, useRef } from 'react'
import st from './style/canvas.module.css'
import useCanvasState from '../store/canvasState'

export default function Canvas() {
  const setCanvas = useCanvasState((s) => s.setCanvas)
  const canvasRef = useRef()
  
  useEffect(()=>{
    setCanvas(canvasRef.current)
  }, [])

  return (
    <div className={st.canvas}>
        <canvas ref={canvasRef} width={1000} height={600}/>
    </div>
  )
}