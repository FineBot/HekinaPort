import styles from './Tasks.module.scss'
import {useEffect, useState} from "react";
import ProjectItem from "../ProjectItem/ProjectItem";
import TagItem from "../TagItem/TagItem";
import Button from "../Button/Button";
import {EditTask} from "../EditTask/EditTask";
import {taskData} from '../structures'
import {parseJwt, query, query2} from "../other";

interface TasksList {
  userId?: string,
  userRole: string,
  tasksElements:taskData[]
}



export default function TasksList({userId = "", userRole,tasksElements}: TasksList) {
  let initData: taskData[] = []
  const [tasks, setTasks] = useState(tasksElements)
  let e:any="user"
  const [role,setRole] = useState(e)
  const [editTask, setEditTask] = useState(-1)

  useEffect(()=>{
    setRole(parseJwt().sub)
  },[])

  useEffect(()=>{
    setTasks(tasksElements)
  },[tasksElements])


  if(editTask!==-1){
    console.log(tasks[editTask])
    return <EditTask save={(e)=>{
      let buff = JSON.parse(JSON.stringify(tasks))
      buff[editTask]=e
      setTasks(buff)
      setEditTask(-1)

      let buff1:any = JSON.parse(JSON.stringify(e))
      buff1.author=localStorage.getItem("id")
      query2("/tasks/"+e.id,"PUT",buff1,()=>{
      },()=>{
      })

    }} task={tasks[editTask]}/>
  }

  return (
    <div>
      <div style={{marginBottom:"10px"}}>
        {userRole != "user" ? (
          <>
            <Button type={"outline"} size={"s"} onClick={()=>{
              window.location.href="/tasks/create"
            }}>Создать задачу</Button>
          </>
        ) : null}
      </div>
      <div className={styles.parent}>
        {tasks.map((e, i) => {

          return (
            <>
              <ProjectItem mode={"strict"} color={"outline"} text={
                <div className={styles.taskContainer}>
                  <div className={styles.firstColumn}>
                    <div className={styles.desc}>
                      {e.desc}
                    </div>
                    <div className={styles.costAndDeadline}>
                      <div className={styles.cost}>{e.budget}</div>
                      <div className={styles.deadline}>Срок реализации: <span>{e.deadline}</span></div>
                    </div>
                  </div>
                  <div className={styles.secondColumn}>
                    <div>Направления проекта</div>
                    <div className={styles.tagsContainer}>
                      {e.tags.map((e)=>{
                        return <><TagItem>{e}</TagItem></>
                      })}
                    </div>
                    <div className={styles.buttonsBlock}>
                      <Button type={"outline"} size={"s"} onClick={()=>{window.location.href="/tasks/"+e.id}}>Подробнее</Button>
                      {role!=="user"?(<>
                        <Button type={"outline"} size={"s"} onClick={()=>{setEditTask(i)}}>Редактировать</Button>
                        <Button type={"outline red"} size={"s"} onClick={()=>{
                          query2("/tasks/"+e.id,"DELETE",undefined,(e:any)=>{
                            let buff = JSON.parse(JSON.stringify(tasks))
                            buff.splice(i,1)
                            setTasks(buff)
                          },()=>{})
                        }}>Удалить</Button>
                      </>):null}
                    </div>
                  </div>
                </div>
              }></ProjectItem>
            </>
          )
        })}
      </div>
    </div>
  )
}
