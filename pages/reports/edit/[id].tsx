import Header from '../../../components/Header/Header';
import styles from "../../profile/index.module.scss";

import {useEffect, useState} from "react";
import getMenuTabs from "../../../components/getMenuTabs";
import EditReport from "../../../components/Reports/EditReport";
import {parseJwt, query, query2} from "../../../components/other";
import {reportDate} from "../../../components/structures";
import {useRouter} from "next/router";

export default function CreateReport(){
  const params=useRouter()
  let userRole = "user"
  const [tabs, setTabs] = useState(getMenuTabs(userRole))


  let ReportInfo:reportDate={
    author:{id:"",lastName:"",firstName:"",middleName:""}
  }

  const [show, setShow]=useState(false)
  const [info, setInfo] = useState(ReportInfo)
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
            <EditReport reportInfo={info} save={(e:any)=>{
              query2("/reports/"+params.query.id,"PUT",(e),(e:any)=>{
                setInfo(e)
                setShow(true)
              },()=>{})
            }}/>
          ):null}
        </div>
      </div>
    </div>
  )
}
