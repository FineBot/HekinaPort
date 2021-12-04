import styles from './HeadersRoadmapButtons.module.scss'
import {useEffect, useState} from "react";

export default function HeadersRoadmapButtons(props:any){

  const [progress, setProgress] = useState(props?.progress)

  useEffect(()=>{
    setProgress(props.progress)
  },[props.progress])


  return (
    <div className={styles.parentContainer}>
      <div className={styles.parent} onClick={()=>{
        if(props.onClick)
          props.onClick()
      }}>
        <img src="data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Crect x='2.82843' y='16.9707' width='28' height='4' rx='2' transform='rotate(45 2.82843 16.9707)' fill='black'/%3E %3Crect y='19.7988' width='28' height='4' rx='2' transform='rotate(-45 0 19.7988)' fill='black'/%3E %3C/svg%3E " alt=""/>
        <div>Первые шаги</div>
      </div>
      <div className={styles.progressParent}>
        <div className={styles.status}><b>
          <span>1</span> из <span>4</span>
        </b></div>
        <div className={styles.progress}>
          <div className={styles.status}></div>
          <div style={{width:progress+"%"}}></div>
        </div>
      </div>
    </div>
  )
}

