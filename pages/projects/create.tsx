import Header from "../../components/Header/Header";
import styles from "../profile/index.module.scss";
import Input from "../../components/Input/Input";
import TagsInput from "../../components/TagsInput/TagsInput";
import ProjectsComponents from "../../components/ProjectsComponent/ProjectsComponent";
import {useEffect, useState} from "react";
import getMenuTabs from "../../components/getMenuTabs";
import {parseJwt, query, query2} from "../../components/other";
import EditProject from "../../components/pagesComponents/profile/EditProject";
import {projectData} from "../../components/structures";
import {name} from "next/dist/telemetry/ci-info";


export default function Create(){
  let userRole = "user"
  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  useEffect(()=>{
    userRole=parseJwt().sub
    setTabs(getMenuTabs(userRole))
  },[])

  let project:projectData={
    desc: "", tags: [],
    name:""
  }

  return(
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          <EditProject projectInfoData={project} save={(e)=>{
            query2("/projects","POST",e,(e:any)=>{
              window.location.href="/projects"
            },(e:any)=>{
              window.location.href="/projects"
            })
          }}/>
        </div>
      </div>
    </div>
  )
}
