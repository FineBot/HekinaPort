import styles from './Input.module.scss'
import React, {useEffect, useRef} from "react";
import exp from "constants";

export default function Input({onInput,style = {},placeholder="",type="",defaultValue="",title=""}: InputProps) {
  let elem: React.RefObject<HTMLInputElement>
  elem = React.createRef()


  return (
    <>
      <div className={styles.parent} style={style}>
        {title?(
          <div className={styles.title}>{title}</div>
          ):null}
        <input
          placeholder={placeholder}
          type={type}
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
