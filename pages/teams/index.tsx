import Header from "../../components/Header/Header";
import styles from "../profile/index.module.scss";
import Input from "../../components/Input/Input";
import TagsInput from "../../components/TagsInput/TagsInput";
import TasksList from "../../components/Tasks/TasksList";
import {useEffect, useState} from "react";
import getMenuTabs from "../../components/getMenuTabs";
import {parseJwt, query2} from "../../components/other";
import TeamsList from "../../components/Teams/TeamsList";
import {teamData} from "../../components/structures";
import ProjectsComponents from "../../components/ProjectsComponent/ProjectsComponent";

export default function Teams(){
  let userRole = "user"
  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  let te:teamData[]=[{members: [], name: ""}]
  const [teams, setTeams] = useState(te)
  useEffect(()=>{
    userRole=parseJwt().sub
    setTabs(getMenuTabs(userRole))

    query2("/teams","GET",undefined,(e:any)=>{
      setTeams(e)
    })
  },[])



  return(
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          <div className={styles.searchContainer} style={{marginBottom:"30px"}}>
            <Input onInput={(e)=>{}} placeholder={"Поиск"}></Input>
          </div>
          <TeamsList teams={teams} setTeams={(e:teamData[])=>{setTeams(e)}}/>

        </div>
      </div>
    </div>
  )
}
