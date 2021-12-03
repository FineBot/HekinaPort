import Header from "../../components/Header/Header";
import styles from "../users/index.module.scss";
import UsersList from "../../components/UsersList/UsersList";
import {useEffect, useState} from "react";
import getMenuTabs from "../../components/getMenuTabs";
import Editor from "../../components/Editor/Editor";
import {parseJwt, query2} from "../../components/other";
import {useRouter} from "next/router";
import {reportDate} from "../../components/structures";

export default function Index(){
  const params = useRouter()
  const [show, setShow]=useState(false)
  let ReportInfo:reportDate={
    author:{id:"",lastName:"",firstName:"",middleName:""}
  }
  const [info, setInfo] = useState(ReportInfo)

  let userRole = "user"
  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  useEffect(()=>{
    userRole=parseJwt().sub
    setTabs(getMenuTabs(userRole))
  },[])

  useEffect(()=>{
    console.log(params.query)
    query2("/reports/"+params.query.id,"GET",undefined,(e:any)=>{
      setInfo(e)
      setShow(true)
    },()=>{})
  },[params])
  return(
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          {show?(
            <Editor onlyShow={true} firstState={info.content}
            />
          ):null}
        </div>
      </div>
    </div>
  )
}
