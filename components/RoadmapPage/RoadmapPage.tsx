import styles from './RoadmapPage.module.scss'
import RoadmapStep from "../RoadmapStep/RoadmapStep";
import HeadersRoadmapButtons from "../HeaderRoadmapButtons/HeadersRoadmapButtons";
import {useEffect, useState} from "react";
import Switcher from "../Switcher/Switcher";
import Button from "../Button/Button";


export default function RoadmapPage(props: any) {
  let a: any
  const [popout, setPopout] = useState(a)
  const [popoutPage, setPopoutPage] = useState(1)
  const [contentsPage, setContentsPage] = useState(a)

  useEffect(()=>{
    setPopoutPage(1)
  },[popout])
  return (
    <div className={styles.parent}>

      {popout ? (
        <div className={styles.popoutParent}>
          <div className={styles.popout}>
            <div className={styles.contentPopoutParent}>
              <div className={styles.title}>ЗАГОЛОВОК ЕБАТЬ</div>
              <div className={styles.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, consequuntur
                eligendi est illum impedit inventore labore quae vero vitae voluptates.
              </div>
              <div className={styles.switchParent}>
                <Switcher onClick={(e: any) => {
                  setPopoutPage(e)
                }}/>
              </div>
              <div>
                {popoutPage === 1 ? (
                  <div>
                    {contentsPage.length>0?contentsPage[0]:null}
                  </div>
                ) : (
                  <div>
                    {contentsPage.length>1?contentsPage[1]:null}

                  </div>
                )}
              </div>
              <div className={styles.switchParent}>
                <Button size={"s"} type={"outline"} onClick={() => {
                  setPopout(null)
                }}>Закрыть</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <HeadersRoadmapButtons progress={props?.progress} onClick={() => {
        if (props.onClick)
          props.onClick()
      }}/>
      <div className={styles.contentParent}>
        <RoadmapStep onClick={() => {
          setPopout(true)
          setContentsPage([(
            <>
              <div>
                Контент первой страницы
              </div>
            </>
          ), (
            <>
              <div>
                Контент второй страницы
              </div>
            </>
          )])
        }} title={"01"} color={"orange"} text={"Зачем тебе в бизнес?"}/>
        <RoadmapStep onClick={() => {
          setPopout(true)
        }} title={"01"} color={"orange"} text={"Зачем тебе в бизнес?"}/>
        <RoadmapStep onClick={() => {
          setPopout(true)
        }} title={"01"} color={"orange"} text={"Зачем тебе в бизнес?"}/>
        <RoadmapStep onClick={() => {
          setPopout(true)
        }} title={"01"} color={"orange"} text={"Зачем тебе в бизнес?"}/>
      </div>
      <div className={styles.centerParent}>
        <img
          src="data:image/svg+xml,%3Csvg width='186' height='186' viewBox='0 0 186 186' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3Crect width='186' height='186' fill='url(%23pattern0)'/%3E %3Cdefs%3E %3Cpattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'%3E %3Cuse xlink:href='%23image0_294_3592' transform='scale(0.00195312)'/%3E %3C/pattern%3E %3Cimage id='image0_294_3592' width='512' height='512' xlink:href='data:image/png;base64,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'/%3E %3C/defs%3E %3C/svg%3E "
          alt=""/>
        <div className={styles.text}>
          Твой путь продолжается. Успешно пройдёшь этот блок - и откроется следующий!
        </div>
      </div>

    </div>
  )
}
