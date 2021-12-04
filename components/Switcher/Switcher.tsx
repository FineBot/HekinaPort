import styles from './Switcher.module.scss'
import React, {useEffect} from "react";



export default function Switcher(props:any){
  const elem1:React.RefObject<any> = React.createRef()
  const elem2:React.RefObject<any> = React.createRef()

  useEffect(()=>{
    elem1.current.setAttribute("active","true")
    elem2.current.setAttribute("active","false")
  },[])

  return(
    <div className={styles.parent}>
      <div className={styles.button} ref={elem1} onClick={()=>{
        elem1.current.setAttribute("active","true")
        elem2.current.setAttribute("active","false")

        if(props.onClick){
          props.onClick(1)
        }
      }}>
        Статья
      </div>
      <div className={styles.button} ref={elem2} onClick={()=>{
        elem1.current.setAttribute("active","false")
        elem2.current.setAttribute("active","true")
        if(props.onClick){
          props.onClick(2)
        }
      }}>
        Видео
      </div>
    </div>
  )
}
