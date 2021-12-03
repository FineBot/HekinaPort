import styles from './TagItem.module.scss'
import React, {useEffect} from "react";

export default function TagItem(props: any) {
  const elem:React.RefObject<any>=React.createRef()

  useEffect(()=>{
    if(props.color){
      elem.current.setAttribute("color",props.color)
    }
  },[])

  return (
    <div ref={elem} className={styles.parent}>
      {props.children}
    </div>
  )
}
