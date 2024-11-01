import React from 'react'
import st from './style/toolbar.module.css'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'
import useCanvasState from '../store/canvasState'
import useToolState from '../store/toolState'

export default function ToolBar() {
  const canvas = useCanvasState((state) => state.canvas)
  const setTool = useToolState((state) => state.setTool)
  return (
    <div className={st.tollbar}>
        <button className={[st.tollbar__btn, st.brush].join(' ')} onClick={() => setTool(new Brush(canvas))}></button>
        <button className={[st.tollbar__btn, st.quadrat].join(' ')} onClick={() => setTool(new Rect(canvas))}></button>
        <button className={[st.tollbar__btn, st.kreis].join(' ')} onClick={() => setTool(new Circle(canvas))}></button>
        <button className={[st.tollbar__btn, st.radiergummi].join(' ')} onClick={() => setTool(new Eraser(canvas))}></button>
        <button className={[st.tollbar__btn, st.linie].join(' ')} onClick={() => setTool(new Line(canvas))}></button>
        <input style={{marginLeft: 20}} type='color'/>
        <button className={[st.tollbar__btn, st.back].join(' ')}></button>
        <button className={[st.tollbar__btn, st.forward].join(' ')}></button>
        <button className={[st.tollbar__btn, st.save].join(' ')}></button>
    </div>
  )
}