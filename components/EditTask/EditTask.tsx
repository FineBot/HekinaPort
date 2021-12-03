import styles from './EditTask.module.scss'
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import {useEffect, useState} from "react";
import CheckBox from "../CheckBox/CheckBox";
import Button from "../Button/Button";
import {getTags} from "../other";
import {taskData} from "../structures";

interface EditTaskProps{
  task:taskData,
  save:(e:any)=>void,
}

export function EditTask({task, save}:EditTaskProps){

  const [taskData,addTaskData]=useState(task)
  const setTaskData=(e:any)=>{
    addTaskData({...taskData,...e})
  }
  const [tags, setTag] = useState(getTags().sort((k, j) => {
    if (k.name > j.name)
      return 1
    else
      return -1
  }))
  useEffect(()=>{
    setTaskData(task)
    let buff = JSON.parse(JSON.stringify(tags))
    buff.forEach((e:any,i:number)=>{
      if(task.tags.indexOf(e.name)!=-1)
        buff[i].checked=true
    })
    setTag(buff)
  },[task])


  useEffect(()=>{
    let buff = JSON.parse(JSON.stringify(tags))
    buff.forEach((e:any,i:number)=>{
      if(taskData.tags.indexOf(e.name)!=-1)
        buff[i].checked=true
    })
    setTag(buff)
  },[])

  return(
    <div>
      <div className={styles.title} style={{maxWidth:"400px", marginBottom:"20px"}}>Заполните поля ниже, чтобы создать заявку. Опишите проблемы которые нужно решить и выберите направления.</div>

      <div className={styles.parent}>
        <div className={styles.component}>
          <TextArea onInput={(e)=>{setTaskData({problem:e})}} title={"Проблема"} defaultValue={taskData.problem}></TextArea>
          <TextArea onInput={(e)=>{setTaskData({desc:e})}} title={"Описание требуемого решения"} defaultValue={taskData.desc}></TextArea>
          <TextArea onInput={(e)=>{setTaskData({interaction:e})}} title={"Сценарий взаимодейтсивя"} defaultValue={taskData.interaction}></TextArea>
          <div className={styles.costAndDeadline}>
            <Input onInput={(e)=>{setTaskData({budget:e})}} title={"Бюджет"} type={"number"} defaultValue={taskData.budget}/>
            <Input onInput={(e)=>{setTaskData({deadline:e})}} title={"Сроки реализации"} type={"date"} defaultValue={taskData.deadline}/>
          </div>
        </div>
        <div className={styles.component}>
          <div className={styles.subtitle}>
            Направления проекта
          </div>
          <div className={styles.editProjectPageTagsParent}>
            {tags.map((el) => {

              return (
                <>
                  <CheckBox onChange={(e) => {
                    let buff = JSON.parse(JSON.stringify(tags))
                    for (let i in buff) {
                      if (buff[i].name === el.name) {
                        buff[i].checked = e
                      }
                    }
                    setTag(buff)
                  }} defaultChecked={taskData.tags.indexOf(el.name)!==-1} name={el.name} value={el.name}/>
                </>
              )
            })}
          </div>
        </div>
      </div>
      <Button style={{marginTop:"20px"}} type={"outline"} onClick={(e:any)=>{
        let buff=JSON.parse(JSON.stringify(taskData))
        buff.tags=[]
        tags.forEach((e)=>{if(e.checked)buff.tags.push(e.name)})
        save(buff)
      }}>Сохранить</Button>
    </div>
  )
}
