import styles from './Select.module.scss'
import React, {useEffect, useState} from "react";

export interface options{
  value:string,
  text:string,
}

interface selectProps{
  options:options[],
  onChange:(e:any)=>void,
  title?:string,
  defaultValue?:string
}

export default function Select({options, onChange,title=undefined, defaultValue=undefined}:selectProps){
  const [df, setDf]=useState(defaultValue)
  const re:React.RefObject<any>=React.createRef()

  useEffect(()=>{
    re.current.value=defaultValue
    setDf(defaultValue)
  },[defaultValue])
  return(
    <div className={styles.parent}>
      <div className={styles.title}>
        {title}
      </div>
      <select ref={re} defaultValue={df} onChange={(e)=>{
        onChange(e.target.value)
      }}>
        {options?.map((e)=>{
          return <><option value={e.value}>{e.text}</option></>
        })}
      </select>
    </div>
  )
}
