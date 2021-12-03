import {teamData} from "../structures";
import React, {useEffect, useState} from "react";
import ProjectItem from "../ProjectItem/ProjectItem";
import styles from './Teams.module.scss'
import Button from "../Button/Button";
import {query2} from "../other";

interface TeamsListProps{
  teams:teamData[],
  setTeams:(e:teamData[])=>void
}

export default function TeamsList({teams,setTeams}:TeamsListProps){
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    let buff:any={}
    teams.forEach((e)=>{
      query2("/projects?team.id="+e.id,"GET",undefined,(ex:any)=>{
        buff['team'+e.id]=ex
      })
    })
    setProjects(buff)
  },[])

  return(
    <div className={styles.listParent}>
      <Button size={"s"} type={"outline"} onClick={()=>{window.location.href="/teams/create"}}>Создать команду</Button>
      <div className={styles.titleHeader}>
        <div>Название команды</div>
        <div>Участники команды</div>
        <div>Проекты</div>
      </div>
      <div className={styles.parentContent}>
        {teams.map((e,i)=>{

          return <>
            <ProjectItem mode={"strict"} color={"outline"} text={
              <div className={styles.contentParent}>
                <div>{e.name}</div>
                <div>
                  {e.members.map((ex)=>{
                    return <><div>{ex.lastName} {ex.firstName} {ex.middleName}</div></>
                  })}
                </div>
                <div>
                  <div>{e.id}</div>
                  {e.projects?.map((ex)=>{
                    return <><div>{ex.name}</div></>
                  })}
                </div>
                <div className={styles.buttonsBlock}>
                  <div className={styles.fullButtons} onClick={() => {

                  }}>
                    <div className={styles.firstImg}/>
                    <Button type={"text red"} onClick={()=>{
                      query2("/teams/"+e.id,"DELETE",undefined,()=>{})
                      let buff = JSON.parse(JSON.stringify(teams))
                      buff.splice(i,1)
                      setTeams(buff)
                    }}>Удалить</Button>
                  </div>
                  <div className={styles.fullButtons} onClick={() => {
                    window.location.href = "/teams/edit/" + e.id
                  }}>
                    <div className={styles.secondImg}/>
                    <Button type={"text blue"}>Редактировать</Button>
                  </div>

                </div>
              </div>
            }/>
          </>
        })}
      </div>
    </div>
  )
}
