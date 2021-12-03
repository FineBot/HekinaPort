import {useEffect, useState} from "react";
import getMenuTabs from "../../components/getMenuTabs";
import Header from "../../components/Header/Header";
import styles from "../profile/index.module.scss";
import {EditTask} from "../../components/EditTask/EditTask";
import TasksList from "../../components/Tasks/TasksList";
import Input from "../../components/Input/Input";
import TagsInput from "../../components/TagsInput/TagsInput";
import {getTags, parseJwt, query2} from "../../components/other";
import {taskData} from "../../components/structures";
import {useRouter} from "next/router";


export default function Tasks() {
  const [data, setData] = useState([])
  let userRole = "user"
  const params = useRouter()
  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  const [searchTags, setSearchTags] = useState([])
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])

  useEffect(() => {
    userRole = parseJwt().sub
    setTabs(getMenuTabs(userRole))
    let buff: any = []
    getTags().forEach((e) => {
      buff.push({id: e.name, text: e.name})
    })
    setTags(buff)
  }, [])

  useEffect(() => {
    query2("/tasks/", "GET", undefined, (e: any) => {
      setData(e)
    }, () => {
    })
  }, [params])


  return (
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          <div className={styles.searchContainer}>
            <Input onInput={(e: any) => {
              if(e){
                query2("/tasks/?q="+e, "GET", undefined, (e: any) => {
                  setData(e)
                }, () => {
                })
              }else{
                query2("/tasks/", "GET", undefined, (e: any) => {
                  setData(e)
                }, () => {
                })
              }
            }} placeholder={"Название"} style={{width: "100%"}}/>
          </div>
          <TasksList tasksElements={data} userRole={"admin"}/>
        </div>
      </div>
    </div>
  )
}
