import styles from './Button.module.scss'
import React from "react";

export default function Button(props) {

  let button=(
    <div buttonsize={props?.size} style={props.style} className={styles.greenButton} onClick={props?.onClick}>
      {props.children}
    </div>
  )

  switch (props?.type){
    default:

      break;

    case 'outline':
      button=(
        <div buttonsize={props?.size} style={props.style} className={styles.outlineButton} onClick={props?.onClick}>
          {props.children}
        </div>
      )
      break;
    case 'outline revert':
      button=(
        <div buttonsize={props?.size} style={props.style} className={styles.outlineRevertButton} onClick={props?.onClick}>
          {props.children}
        </div>
      )
      break;
    case 'outline red':
      button=(
        <div buttonsize={props?.size} style={props.style} className={styles.outlineRedButton} onClick={props?.onClick}>
          {props.children}
        </div>
      )
      break;

    case 'text':
      button=(
        <div buttonsize={props?.size} style={props.style} className={styles.text} onClick={props?.onClick}>
          {props.children}
        </div>
      )
      break;
    case 'text red':
      button=(
        <div buttonsize={props?.size} style={props.style} className={styles.textRed} onClick={props?.onClick}>
          {props.children}
        </div>
      )
      break;
    case 'text blue':
      button=(
        <div buttonsize={props?.size} style={props.style} className={styles.textBlue} onClick={props?.onClick}>
          {props.children}
        </div>
      )
      break;
  }

  return (
    button
  )
}
