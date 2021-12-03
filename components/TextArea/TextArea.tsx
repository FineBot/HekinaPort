import styles from './TextArea.module.scss'
import React, {useEffect, useRef} from "react";
import exp from "constants";

export default function TextArea({onInput,style = {},placeholder="",type="",defaultValue="",title=""}: InputProps) {
  let elem: React.RefObject<any>
  elem = React.createRef()

  useEffect(()=>{
    elem.current.value=defaultValue
  },[defaultValue])


  return (
    <>
      <div className={styles.parent} style={style}>
        {title?(
          <div className={styles.title}>{title}</div>
          ):null}
        <textarea
          placeholder={placeholder}
          ref={elem}
          defaultValue={defaultValue}
          onInput={(e) => {
            onInput(elem.current?.value)
          }}
        />
      </div>
    </>
  )
}

export interface InputProps {
  style?: object,
  placeholder?: string,
  type?: string,
  onInput: (e:any)=>void,
  defaultValue?:string,
  title?:string,
}
