import styles from './CheckBox.module.scss'
import React, {useRef} from "react";

export default function CheckBox({name, value, defaultChecked=false, onChange=()=>{},}:CheckBoxProps) {
  let elem:React.RefObject<HTMLInputElement>
  elem = React.createRef()

  return (
    <div className={styles.checkbox}>
      <input ref={elem} onChange={(e)=>onChange(e.target.checked)} defaultChecked={defaultChecked} className={styles.customCheckbox} type="checkbox" id={value+name+(new Date().toUTCString())} name={name} value={value}/>
      <label onClick={()=>elem.current?.click()} htmlFor="color-1">{name}</label>
    </div>
  )
}

export interface CheckBoxProps{
  name:string,
  value:string,
  defaultChecked?:boolean,
  onChange?:(e:boolean)=>void,
}
