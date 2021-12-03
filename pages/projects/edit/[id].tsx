import {useRouter} from "next/router";
import ProjectPage from "../../../components/ProjectPage/ProjectPage";
import {projectData, userData} from "../../../components/structures";
import Header from "../../../components/Header/Header";
import styles from "../../profile/index.module.scss";
import Input from "../../../components/Input/Input";
import TagsInput from "../../../components/TagsInput/TagsInput";
import TasksList from "../../../components/Tasks/TasksList";
import {useEffect, useState} from "react";
import getMenuTabs from "../../../components/getMenuTabs";
import {parseJwt, query2} from "../../../components/other";
import EditProject from "../../../components/pagesComponents/profile/EditProject";

export default function ProjectURL() {
  const routes: any = useRouter()
  let data:userData = {
    firstName: "", id: "", lastName: "", middleName: ""
  }
  let projectsData: projectData = {
    desc: "", name: "", tags: []
  }
  let userRole = "user"
  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  useEffect(() => {
    userRole = parseJwt().sub
    setTabs(getMenuTabs(userRole))
  }, [])

  const [projectInfo, setProjectInfo]=useState(projectsData)

  useEffect(()=>{
    query2("/projects/"+routes.query.id,"GET",undefined,(e:projectData)=>{
      setProjectInfo(e)
    })
  },[routes])

  return (
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          <EditProject close={()=>{

          }} projectInfoData={projectInfo} save={(e)=>{
            query2("/projects/"+e.id,"PUT",e,(e:any)=>{
              window.history.back()
            },()=>{
              window.history.back()
            })
          }}/>
        </div>
      </div>
    </div>
  )
}
