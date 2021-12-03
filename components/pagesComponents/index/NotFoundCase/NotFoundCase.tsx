import styles from './NotFoundCase.module.scss'
import Button from "../../../Button/Button";

export default function NotFoundCase(props: any) {

  return (
    <div className={styles.parent}>
      <div className={styles.content}>
        <div className={styles.child}>
          <h2>Не нашли решение своего кейса?</h2>
          <h3>Создайте задачу, команды сами предложат Вам свои идеи</h3>
        </div>
        <div>
            <Button onClick={()=>{
              window.location.pathname="/login"
            }}>Войти</Button>
        </div>
      </div>
      <div id={"backgroundImageInNotFoundCase"} className={styles.background}>

      </div>
    </div>
  )
}
