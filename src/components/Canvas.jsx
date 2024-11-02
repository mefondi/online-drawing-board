import React, { useEffect, useRef } from 'react'
import st from './style/canvas.module.css'
import useCanvasState from '../store/canvasState'
import Brush from '../tools/Brush'

export default function Canvas() {
  const {setCanvas, setUndoList} = useCanvasState()
  const canvasRef = useRef()
  
  useEffect(()=>{
    setCanvas(canvasRef.current)
    Brush()
  }, [])

  const mouseDownHandler = () => {
    setUndoList(canvasRef.current.toDataURL())
  }

  return (
    <div className={st.canvas}>
        <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={1600} height={700}/>
    </div>
  )
}