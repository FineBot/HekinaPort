import {useRouter} from "next/router";
import Header from "../../components/Header/Header";
import styles from "../profile/index.module.scss";
import {EditTask} from "../../components/EditTask/EditTask";
import {useEffect, useState} from "react";
import getMenuTabs from "../../components/getMenuTabs";
import TaskComponent from "../../components/TaskComponent/TaskComponent";
import {parseJwt, query2} from "../../components/other";
import {taskData} from "../../components/structures";


export default function TaskId(props:any){
  let userRole = "user"
  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  const params = useRouter()

  let d:taskData={desc: "", name: "", tags: []}
  const [taskData, setTaskData]=useState(d)

  useEffect(()=>{
    userRole=parseJwt().sub
    setTabs(getMenuTabs(userRole))
  },[])

  useEffect(()=>{
    query2("/tasks/"+params.query.id,"GET",undefined,(e:any)=>{
      setTaskData(e)
      query2("/users/?id="+e.author,"GET",undefined,(ex:any)=>{
        let buff = JSON.parse(JSON.stringify(e))
        buff.author=ex[0]
        setTaskData(buff)
      })
    },()=>{})
  },[params])
  return(
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          <TaskComponent taskInfo={taskData}/>
        </div>
      </div>
    </div>
  )
}
