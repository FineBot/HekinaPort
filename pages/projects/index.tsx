import Header from "../../components/Header/Header";
import styles from "../profile/index.module.scss";
import Input from "../../components/Input/Input";
import TagsInput from "../../components/TagsInput/TagsInput";
import TasksList from "../../components/Tasks/TasksList";
import {useEffect, useState} from "react";
import getMenuTabs from "../../components/getMenuTabs";
import ProjectsComponents from "../../components/ProjectsComponent/ProjectsComponent";
import {getTags, parseJwt, query2} from "../../components/other";
import {projectData, userData} from "../../components/structures";

export default function Index() {
  let userRole = "user"
  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  useEffect(()=>{
    userRole=parseJwt().sub
    setTabs(getMenuTabs(userRole))
  },[])

  const [searchTags, setSearchTags] = useState([])
  const [isEditProject, setIsEditProject] = useState(-1)

  const [projects, setProjects] = useState([])


  const [suggestions, setSuggestions] = useState([])
  useEffect(()=>{
    let buff:any = []
    getTags().forEach(((e,i)=>buff.push({id:e.name,text:e.name})))
    setSuggestions(buff)

    query2("/projects","GET",undefined,(e:any)=>{
      setProjects(e)
    })
  },[])

  return (
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          <div className={styles.searchContainer}>
            <Input onInput={(e)=>{}} placeholder={"Поиск"}></Input>
            <TagsInput tags={searchTags} suggestions={suggestions} setTags={(e)=>setSearchTags(e)} placeholder={"Направления"}/>
          </div>
          <ProjectsComponents isEditProject={isEditProject} setIsEditProject={(e) => setIsEditProject(e)} projects={projects}
                              setProjects={(e)=>setProjects(e)}/>
        </div>
      </div>
    </div>
  )
}
