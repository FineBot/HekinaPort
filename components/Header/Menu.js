import styles from './Header.module.scss'
import {useEffect, useRef, useState} from "react";


let lastI = 0
export default function Menu (props) {
  const tabManager = useRef("")
  const [lastI, setLastI] = useState(0)
  const blockScrollChangeRef = useRef(false)

  const tabs = props.tabs


  useEffect(()=>{
    for(let e in tabs){
      if(window.location.pathname.indexOf(tabs[e].pathname)!==-1){
        tabManager.current=Number(e)
        setLastI(e)
      }
    }
  },[tabs])

  return (
    <div
      id={"menuParent"}

      // @ts-ignore
      name={props.open}

      className={styles.menuParent}>
      <div id={"menu"} className={styles.menu}
           // onMouseLeave={() => {
           //   tabManager.current=(lastI)
           //   let las = JSON.parse(JSON.stringify(lastI))
           //   setLastI(0)
           //   setTimeout(()=>setLastI(las))
           // }}
      >
        {tabs.map((e, i) => {
          return (
            <>
              <div active={(i === tabManager.current).toString()} id={"menuItemId" + i.toString()}
                   // onMouseEnter={() => {
                   //   // lastI=JSON.parse(JSON.stringify(activeTab))
                   //   tabManager.current=i
                   //   let las = lastI
                   //   setLastI(-1)
                   //   setTimeout(()=>setLastI(las))
                   //
                   // }}
                   onClick={() => {
                     blockScrollChangeRef.current=true
                     tabManager.current=(i)
                     setLastI(i)
                     e.onClick()

                   }}>
                {e.title}
              </div>
            </>
          )
        })}
      </div>

      <div className={styles.touchCloseHiddenPanel} style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        marginLeft:"-10px",
      }} onClick={() => {
        if(props.open)
          props.setOpenMenu(false)
      }}/>


    </div>
  )
}
