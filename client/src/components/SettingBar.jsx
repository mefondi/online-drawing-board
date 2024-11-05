import React from 'react'
import st from './style/settingbar.module.css'
import canvasState from '../store/canvasState'

export default function SettingBar() {
  const {setFillStyle, setStrokeStyle, setLineWidth} = canvasState()

  return (
    <div className={st.SettingBar}>
        <label style={{margin: 20}}  htmlFor='width'>Толщина линии:</label>
        <input onChange={e => setLineWidth(e.target.value)} style={{marginRight: 20}} id='width' type='number' defaultValue={1} min={1} max={50}/>
        <label style={{marginLeft: 'auto'}}  htmlFor='fillStyle'>Цвет заливки:</label>
        <input onChange={e => setFillStyle(e.target.value)} style={{marginLeft: 20}} type='color' id='fillStyle'/>
        <label style={{margin: 20}}  htmlFor='strokeStyle'>Цвет обводки:</label>
        <input onChange={e => setStrokeStyle(e.target.value)} style={{marginRight: 20}} type='color' id='strokeStyle'/>
    </div>
  )
}