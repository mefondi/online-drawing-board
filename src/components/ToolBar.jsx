import React from 'react'
import st from './style/toolbar.module.css'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'

export default function ToolBar() {
  return (
    <div className={st.tollbar}>
        <button className={[st.tollbar__btn, st.brush].join(' ')}  onClick={() => Brush()}></button>
        <button className={[st.tollbar__btn, st.quadrat].join(' ')} onClick={() => Rect()}></button>
        <button className={[st.tollbar__btn, st.kreis].join(' ')} onClick={() => Circle()}></button>
        <button className={[st.tollbar__btn, st.radiergummi].join(' ')} onClick={() => Eraser()}></button>
        <button className={[st.tollbar__btn, st.linie].join(' ')} onClick={() => Line()}></button>
        <input style={{marginLeft: 20}} type='color'/>
        <button className={[st.tollbar__btn, st.back].join(' ')}></button>
        <button className={[st.tollbar__btn, st.forward].join(' ')}></button>
        <button className={[st.tollbar__btn, st.save].join(' ')}></button>
    </div>
  )
}