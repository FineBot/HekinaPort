import Header from "../../components/Header/Header";
import styles from "../profile/index.module.scss";
import Input from "../../components/Input/Input";
import TagsInput from "../../components/TagsInput/TagsInput";
import TasksList from "../../components/Tasks/TasksList";
import {useEffect, useState} from "react";
import getMenuTabs from "../../components/getMenuTabs";
import RichEditorExample from "../../components/Editor/Editor";
import EditReport from "../../components/Reports/EditReport";
import {parseJwt, query, query2} from "../../components/other";
import {reportDate} from "../../components/structures";

export default function CreateReport(){
  let userRole = "user"
  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  useEffect(()=>{
    userRole=parseJwt().sub
    setTabs(getMenuTabs(userRole))
  },[])

  return(
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          <EditReport save={(e)=>{
            let buff:reportDate = JSON.parse(JSON.stringify(e))
            buff.author.id=parseJwt().id
            query("/v1/users/"+parseJwt().id,"GET",undefined,(e:any)=>{
              buff.author=e
              query2("/reports","POST",buff)

            })
          }}/>
        </div>
      </div>
    </div>
  )
}
