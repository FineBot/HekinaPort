import styles from './TaskComponent.module.scss'
import TagItem from "../TagItem/TagItem";
import React from "react";
import {taskData} from "../structures";
import UserItem from "../UserItem/UserItem";

interface taskProps{
  taskInfo:taskData
}

export default function TaskComponent({taskInfo}:taskProps) {



  return (
   <div>
     <div className={styles.parent}>
       <div className={styles.component}>
         <div>
           <div className={styles.subtitle}>Проблема</div>
           <div className={styles.text}>{taskInfo.problem}</div>
         </div>
         <div>
           <div className={styles.subtitle}>Описание требуемого решения</div>
           <div className={styles.text}>{taskInfo.desc}</div>
         </div>
         <div>
           <div className={styles.subtitle}>Сценарий взаимодействия</div>
           <div className={styles.text}>{taskInfo.interaction}</div>
         </div>
       </div>
       <div className={styles.component}>
         {taskInfo.tags && taskInfo.tags.length > 0 ? (
           <div>
             <div className={styles.subtitle}>Направления</div>
             <div className={styles.tagsParent}>
               {taskInfo.tags.map((e) => {
                 return <> <TagItem color={"green"}>{e}</TagItem></>
               })}
             </div>
           </div>
         ) : null}
         {taskInfo.tech && taskInfo.tags.length > 0 ? (
           <div>
             <div className={styles.subtitle}>Стек технологий</div>
             <div className={styles.tagsParent}>
               {taskInfo.tech.map((e) => {
                 return <> <TagItem color={"green"}>{e}</TagItem></>
               })}
             </div>
           </div>
         ) : null}
         <div>
          <div>
            {taskInfo.budget?(
              <>
                <div className={styles.subtitle}>Стоимость разработки</div>
                <div className={styles.cost}>{taskInfo.budget} ₽</div>
              </>
            ):null}
            {taskInfo.deadline?(
              <>
                <div className={styles.subtitle}>Сроки реализации</div>
                <div className={styles.deadline}>{new Date(taskInfo.deadline).toLocaleDateString("ru")}</div>
              </>
            ):null}
            {taskInfo.author?(
              <>
                <div className={styles.subtitle}>Кейсодержатель</div>
                <UserItem userData={taskInfo.author}/>
              </>
            ):null}

          </div>
         </div>
       </div>
     </div>
   </div>
  )
}
