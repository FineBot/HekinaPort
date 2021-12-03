import styles from './ProjectItem.module.scss'
import React, {useEffect} from "react";
import Button from "../Button/Button";

interface ProjectItemProps {
  hide?: string | boolean,
  color?: string,
  buttonText?: string,
  onButtonClick?: () => void,
  children?: string,
  text?: string | object,
  mode?:string,
  style?:object,
}


export default function ProjectItem({
                                      hide = false, color = "standart", buttonText=undefined, onButtonClick = ()=>{},
                                      children = "", text="",mode="",style={}
                                    }: ProjectItemProps) {

  const element: React.RefObject<any> = React.createRef()

  useEffect(() => {
    element.current.setAttribute("hide", hide)
    element.current.setAttribute("color", color)
    element.current.setAttribute("mode", mode)
  }, [hide,color,mode])


  return (
    <div ref={element} className={styles.parent} style={style}>
      <div className={styles.title}>
        {children}
      </div>
      <div className={styles.desc}>
        {text}
      </div>
      {buttonText ? (
        <div style={{width: "100%", display: "flex", justifyContent: "flex-end", marginTop: "15px",marginBottom:"0px"}}>
          <Button onClick={() => onButtonClick()} size={"s"} type={"outline"}
                  style={{width: "fit-content", maxWidth: "fit-content"}}>{buttonText}</Button>
        </div>
      ) : null}
    </div>
  )
}


