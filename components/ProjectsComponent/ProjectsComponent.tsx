import styles from './ProjectsComponents.module.scss'
import EditProject from "../pagesComponents/profile/EditProject";
import ProjectItem from "../ProjectItem/ProjectItem";
import React, {useEffect, useState} from "react";
import TagItem from "../TagItem/TagItem";
import Button from "../Button/Button";
import ProjectPage from "../ProjectPage/ProjectPage";
import {projectData} from "../structures";
import {parseJwt, query2} from "../other";

export interface projectsPageProps {
  isEditProject: number,
  setIsEditProject: (e: number) => void,
  projects: projectData[],
  setProjects: (e: any) => void
}


export default function ProjectsComponents({
                                             isEditProject,
                                             projects,
                                             setIsEditProject,
                                             setProjects
                                           }: projectsPageProps) {

  const [width, setWidth] = useState(0)
  const [viewProject, setViewProject] = useState(-1)
  const [userRole, setUserRole] = useState("user")

  useEffect(() => {
    setWidth(window.innerWidth)
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth)
    })
    setUserRole(parseJwt().sub)
  }, [])

  if (viewProject != -1) {
    return <ProjectPage projectInfo={projects[viewProject]}/>
  }


  return (
    <div>
      {userRole === "user" ? null : (
        <Button style={{margin: "15px 0px"}} size={"s"} type={"outline"} onClick={() => {
          window.location.href = "/projects/create"
        }}>Создать проект</Button>
      )}
      <div className={styles.projectsList}>


        {projects.map((e, i) => {


          if (width < 700) {
            return (
              <>
                <ProjectItem mode={"strict"} color={"outline"} text={
                  <div className={styles.projectsListParent}>
                    <div className={styles.component}>
                      <div className={styles.title}>{e.name}</div>
                      <div className={styles.desc}>{e.desc}</div>
                      {e.tags && e.tags.length > 0 ? (
                        <div className={styles.component}>
                          <div className={styles.title}>Направления проекта</div>
                          <div className={styles.tagsParent}>
                            {e.tags.map((e) => {
                              return <> <TagItem>{e}</TagItem></>
                            })}
                          </div>
                        </div>
                      ) : null}
                      <div className={styles.deadlineAndCost}>
                        <div>{e.cost} руб.</div>
                        <div>Срок реализации: <span className={styles.greenDate}>{e.deadline}</span></div>
                      </div>
                      <div className={styles.buttonsBlock}>
                        <Button type={"outline"} size={"s"} onClick={() => {
                          window.location.href = "/projects/" + e.id
                        }}>Подробнее</Button>
                        <Button type={"outline"} size={"s"} onClick={() => {
                          window.location.href="/projects/edit/"+e.id
                        }}>Редактировать</Button>
                        <Button type={"outline red"} size={"s"}>Удалить</Button>
                      </div>
                    </div>
                  </div>
                }
                             onButtonClick={() => setIsEditProject(i)}></ProjectItem>
              </>
            )
          }

          return (
            <>
              <ProjectItem mode={"strict"} color={"outline"} text={
                <div className={styles.projectsListParent}>
                  <div className={styles.component}>
                    <div className={styles.title}>{e.name}</div>
                    <div className={styles.desc}>{e.desc}</div>
                    <div className={styles.deadlineAndCost}>
                      {e.cost ? (<div>{e.cost} руб.</div>) : <div style={{marginRight: "-10px"}}/>}
                      {e.deadline?(<div>Срок реализации: <span className={styles.greenDate}>{e.deadline}</span></div>):null}
                    </div>
                  </div>
                  <div className={styles.component}>
                    {e.tags && e.tags.length > 0 ? (
                      <>
                        <div className={styles.title}>Направления проекта</div>
                        <div className={styles.tagsParent}>
                          {e.tags.map((e) => {
                            return <> <TagItem>{e}</TagItem></>
                          })}
                        </div>
                      </>
                    ) : null}

                    <div className={styles.buttonsBlock}>
                      <Button type={"outline"} size={"s"} onClick={() => {
                        window.location.href = "/projects/" + e.id
                      }}>Подробнее</Button>
                      <Button type={"outline"} size={"s"} onClick={() => {
                        window.location.href="/projects/edit/"+e.id
                      }}>Редактировать</Button>
                      <Button type={"outline red"} size={"s"}>Удалить</Button>
                    </div>
                  </div>
                </div>
              }
              ></ProjectItem>
            </>
          )
        })}
      </div>
    </div>
  )
}
