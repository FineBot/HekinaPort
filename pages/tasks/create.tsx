import Header from "../../components/Header/Header";
import {useEffect, useState} from "react";
import getMenuTabs from "../../components/getMenuTabs";
import styles from "../profile/index.module.scss";
import {EditTask} from "../../components/EditTask/EditTask";
import {reportDate, taskData} from "../../components/structures";
import {parseJwt, query, query2} from "../../components/other";

export default function Create(props:any){
  let userRole = "user"
  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  useEffect(()=>{
    userRole=parseJwt().sub
    setTabs(getMenuTabs(userRole))
  },[])

  let task:taskData={desc: "", name: "", tags: []}

  return(
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          <EditTask save={(e)=>{
            let buff:reportDate = JSON.parse(JSON.stringify(e))
            query("/v1/users/"+parseJwt().id,"GET",undefined,(e:any)=>{
              buff.author=e
              query2("/tasks","POST",buff,()=>{},()=>{})
            },()=>{})
          }} task={task}/>
        </div>
      </div>
    </div>
  )
}
