import React from 'react'
import st from './style/settingbar.module.css'
import canvasState from '../store/canvasState'

export default function SettingBar() {
  const {ctx, setFillStyle, setStrokeStyle, setLineWidth} = canvasState()

  const lineWidth = (e) =>{
    setLineWidth(e.target.value)
    ctx.lineWidth = e.target.value
  }
  const StrokeStyle = (e) =>{
    setStrokeStyle(e.target.value)
    ctx.strokeStyle = e.target.value
    console.log(ctx.strokeStyle)
  }
  const fillStyle = (e) =>{
    setFillStyle(e.target.value)
    ctx.fillStyle = e.target.value
  }

  return (
    <div className={st.SettingBar}>
        <label style={{margin: 20}}  htmlFor='width'>Толщина линии:</label>
        <input onChange={e => lineWidth(e)} style={{marginRight: 20}} id='width' type='number' defaultValue={1} min={1} max={50}/>
        <label style={{marginLeft: 'auto'}}  htmlFor='fillStyle'>Цвет заливки:</label>
        <input onChange={e => fillStyle(e)} style={{marginLeft: 20}} type='color' id='fillStyle'/>
        <label style={{margin: 20}}  htmlFor='strokeStyle'>Цвет обводки:</label>
        <input onChange={e => StrokeStyle(e)} style={{marginRight: 20}} type='color' id='strokeStyle'/>
    </div>
  )
}