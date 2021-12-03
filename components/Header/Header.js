import styles from './Header.module.scss'
import Menu from './Menu'
import lottie from "lottie-web";
import {useEffect, useRef, useState} from "react";

export const getHeader = () => {
  let elem = document.getElementById("header")

}

export default function Header(props) {
  const [open, setOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const header = useRef();
  const defalutTabs = [
    {title:"Главная",pathname:"/",onClick:()=>{window.location="/"}},
    {title:"Войти",pathname: "/login",onClick:()=>{window.location="/login"}},
  ]

  const [tabs, setTabs] = useState(props.tabs || defalutTabs)

  useEffect(()=>{
    setTabs(props.tabs)
  },[props.tabs])

  useEffect(() => {

    if (window.innerWidth < 700) {
      setMobile(true)
    }
    if(props.setDefaultBackground)
      header.current?.setAttribute("onScroll", "true")

    document.addEventListener("scroll", (e) => {
      if (window.scrollY > 50) {
        header.current?.setAttribute("onScroll", "true")
      } else {
        if(!props.setDefaultBackground){
          header.current?.setAttribute("onScroll", "false")
        }
      }

      if(window.location.pathname==="/"){
        let elem=document.getElementById("backgroundImageInNotFoundCase")
        if(window.scrollY>=elem.offsetTop-elem.offsetHeight/9){
          elem.style.opacity="1"
        }else{
          elem.style.opacity="0"

        }
      }
    })
    window.addEventListener("resize", () => {
      if (window.innerWidth > 700) {
        setMobile(false)
        setOpen(false)
      } else {
        setMobile(true)
      }
    })
  }, [])

  useEffect(() => {


    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [open])


  return (
    <div className={styles.parent} ref={header} id={"header"} opened={open.toString()}>
      {mobile ? (<div style={{
        cursor: "pointer", marginLeft: "25px", paddingTop: "10px",
      }} onClick={() => {
        setOpen(!open)
      }}>
        <div opened={open.toString()} id={"burgerMenu"}
             className={styles.mobileButtonMenu}
        >
          <div>Home</div>
        </div>
      </div>) : null}

      <div className={styles.logoAndMenu}>
        <div className={styles.logo}></div>

        {tabs?(
          <Menu
            tabs={tabs}
            setOpenMenu={(e) => setOpen(e)}
            open={open.toString()}/>
        ):null}
      </div>

    </div>
  )
}

