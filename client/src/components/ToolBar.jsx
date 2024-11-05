import React, { useEffect } from 'react'
import st from './style/toolbar.module.css'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'
import Save from '../tools/Save'
import useCanvasState from '../store/canvasState'

export default function ToolBar() {
  const {undo, rendo, lineWidth, fillStyle, strokeStyle, tool, canvas} = useCanvasState();
  
  useEffect(() => {
    if (canvas.length === 0) {
      return
    }
    switch (tool) {
      case "Brush":
        Brush();
        break;
      case "Eraser":
        Eraser();
        break;
      case "React":
        Rect();
        break;
      case "Circle":
        Circle();
        break;
      case "Line":
        Line();
        break;
    };
  }, [lineWidth, fillStyle, strokeStyle])



  return (
    <div className={st.tollbar}>
        <button className={[st.tollbar__btn, st.brush].join(' ')}  onClick={() => Brush()}></button>
        <button className={[st.tollbar__btn, st.quadrat].join(' ')} onClick={() => Rect()}></button>
        <button className={[st.tollbar__btn, st.kreis].join(' ')} onClick={() => Circle()}></button>
        <button className={[st.tollbar__btn, st.radiergummi].join(' ')} onClick={() => Eraser()}></button>
        <button className={[st.tollbar__btn, st.linie].join(' ')} onClick={() => Line()}></button>
        <button className={[st.tollbar__btn, st.back].join(' ')} onClick={() => undo()}></button>
        <button className={[st.tollbar__btn, st.forward].join(' ')} onClick={() => rendo()}></button>
        <button className={[st.tollbar__btn, st.save].join(' ')} onClick={() => Save()}></button>
    </div>

  )
}