import styles from './FirstWidget.module.scss'
import {getHeader} from "../../../Header/Header";
import Button from "../../../Button/Button.js";

export default function FirstWidget(props) {

  return (
    <div className={styles.parent} id={props.name}>
      <div className={styles.titleContainer}>
        <div>
          <h1>Найдите решение своей задачи среди десятков предложений</h1>
          <Button onClick={()=>window.location="/login"}>Войти</Button>
        </div>
      </div>
    </div>
  )
}

