import styles from './UserItem.module.scss'
import TagItem from "../TagItem/TagItem";
import Button from "../Button/Button";
import {userData, userItem} from "../structures";

interface userItemProps{
  userData: userData,
  onButton?:()=>void,
  buttonText?:string,
}

export default function UserItem({userData, onButton=()=>{}, buttonText=undefined}:userItemProps) {

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.title}>{userData.lastName} {userData.firstName} {userData.middleName}</div>
        <div className={styles.userInfo}>
          <img src="/static/icons/mail.svg" alt=""/>
          <div>{userData.username}</div>

          <img src="/static/icons/plane.svg" alt=""/>
          <div>{userData.tgLink}</div>

          <img src="/static/icons/work.svg" alt=""/>
          <div>{userData.position}</div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"space-between"}}>
        {userData.skills?(
          <div>
            <div className={styles.title}>Навыки</div>
            <div className={styles.containerOfSkills}>
              {userData.skills.map((e,i)=>{
                return <><TagItem color={"green"}>{e}</TagItem></>
              })}
            </div>
          </div>
        ):null}
        {buttonText?(
          <div style={{height:"fit-content", display:"flex",alignItems:"flex-end"}}>
            <Button onClick={()=>{
              onButton()
            }} size={"s"} type={"outline red"}>Удалить</Button>
          </div>
        ):null}
      </div>
    </div>
  )
}

