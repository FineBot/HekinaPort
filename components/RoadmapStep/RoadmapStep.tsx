import styles from './RoadmapStep.module.scss'
import React, {useEffect, useRef} from "react";

interface roadmapCardProps{
  title:string,
  color:string,
  text:string,
  onClick?:()=>void

}

export default function RoadmapStep({title,color,text,onClick=()=>{}}:roadmapCardProps){
  const element:React.RefObject<any> = useRef()

  useEffect(()=>{
    element.current.setAttribute("color",color)

  },[])

  return(
    <div className={styles.parent} ref={element} onClick={()=>{
      onClick()
    }}>
      <div className={styles.title}>{title}</div>
      <div className={styles.text}>{text}</div>
    </div>
  )
}
