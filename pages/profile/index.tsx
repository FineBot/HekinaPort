import styles from './index.module.scss'
import Header from "../../components/Header/Header";
import React, {AriaAttributes, DOMAttributes, useEffect, useState} from "react";
import Button from "../../components/Button/Button";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import TagItem from "../../components/TagItem/TagItem";
import EditProfile from '../../components/pagesComponents/profile/EditProfile'
import EditProject from "../../components/pagesComponents/profile/EditProject";
import UserItem from "../../components/UserItem/UserItem";
import getMenuTabs from '../../components/getMenuTabs'
import Tasks from '../../components/Tasks/TasksList';
import ProjectsComponents from "../../components/ProjectsComponent/ProjectsComponent";
import {projectData, reportDate, taskData, teamData, userData} from "../../components/structures";
import EditorContainer from '../../components/Editor/Editor'
import RichEditorExample from "../../components/Editor/Editor";
import Editor from "../../components/Editor/Editor";
import EditReport from "../../components/Reports/EditReport";
import {parseJwt, query, query2} from "../../components/other";
import ReportsList from "../../components/Reports/ReportsList";

declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    selected?: any;
  }
}
;

export interface tech {
  id: string,
  text: string,
}


export default function Index(props: any) {
  const [userRole, setUserRole] = useState("user")
  /**
   * admin, worker, user
   */
  let data: userData;
  data = {
    id: "",
    firstName: "",
    lastName: "",
    middleName: "",
    birthday: new Date(),
    email: "",
    phone: "",
    gender: "",
    city: "",
    roles: [],
    tgLink: "",
    skills: []
  }
  const [userInfo, setUserInfo] = useState(data)
  const [tabs, setTabs] = useState(getMenuTabs(userRole))

  let reportsInit: reportDate[] = [
    {author: {firstName: "", lastName: "", middleName: "", id: ""}, title: "fdfsf", publishDate: "24.11.2020"},
  ]

  const [myReports, setMyReports] = useState(reportsInit)

  let tasks: taskData[] = [{name: "", desc: "", tags: []}]
  const [tasksElements, setTasksElements] = useState(tasks)
  let b:teamData={members: [], name: ""}
  const [myTeam, setMyTeam] = useState(b)

  useEffect(() => {

    setUserRole(parseJwt().sub)
    setTabs(getMenuTabs(parseJwt().sub))

    query2("/users/" + parseJwt().id, "GET", undefined, (e: any) => {
      localStorage.setItem("id", e.id)
      localStorage.setItem("roles", e.roles[0])
      setUserInfo(e)
    })
    query2("/reports/?author.id=" + parseJwt().id, "GET", undefined, (e: any) => {
      setMyReports(e)
    })

    query2("/tasks?admin.id=" + parseJwt().id, "GET", undefined, (e: any) => {
      setTasksElements(e)
    }, () => {
    })

    let teams = []
    query2("/teams", "GET", undefined, (e: any) => {
      teams = e
      teams.forEach((ex: any) => {
        if (ex.members) {
          ex.members.forEach((ey: any) => {
            if (ey.id.toString() === localStorage.getItem("id")) {
              setMyTeam(ex)
            }
          })
        }
      })
    })
  }, [])


  const [editProfile, setEditProfile] = useState(false)
  const [isEditProject, setIsEditProject] = useState(-1)

  const firstTitleButton: React.RefObject<any> = React.createRef()
  const secondTitleButton: React.RefObject<any> = React.createRef()
  const lastTitleButton: React.RefObject<any> = React.createRef()


  let projectsData: projectData[] = [
    {
      name: "string",
      desc: "string",
      tags: [],
      cost: 0,
      id: "0",
      problem: "",
      linkPrototype: "string",
      linkPresentation: "string",
      analytics: "string",
      deadline: "string",
      tech: [{id: "f", text: "F"}],
      status: "string",
      setrify: "",
      contact: data,
      team: {
        name: "f",
        members: [data, data]
      },
      type: "",
      phase: "",
      site: "string"
    },

  ]
  const [projects, setProjects] = useState(projectsData)


  let users: userData[] = [
    {
      firstName: "string",
      lastName: "string",
      middleName: "string",
      email: "string",
      phone: "string",
      gender: "string",
      roles: [''],
      id: "",
    },
    {
      firstName: "string",
      lastName: "string",
      middleName: "string",
      email: "string",
      phone: "string",
      gender: "string",
      roles: ["s"],
      id: "",

    },
    {
      firstName: "string",
      lastName: "string",
      middleName: "string",
      email: "string",
      phone: "string",
      gender: "string",
      roles: ["s"],
      id: "",

    },

  ]
  const [groupTeam, setGroupTeam] = useState(users)

  const [profileActiveTab, setProfileActiveTab] = useState(0)

  useEffect(() => {
    if (profileActiveTab === 1) {
      setEditProfile(false)
      if (firstTitleButton.current)
        firstTitleButton.current.setAttribute("selected", "false")
      secondTitleButton.current.setAttribute("selected", "true")
      if (lastTitleButton.current)
        lastTitleButton.current.setAttribute("selected", "false")

    } else if (profileActiveTab === 0) {
      if (firstTitleButton.current)
        firstTitleButton.current.setAttribute("selected", "true")
      if (secondTitleButton.current) {
        secondTitleButton.current.setAttribute("selected", "false")
      }
      if (lastTitleButton.current) {
        lastTitleButton.current.setAttribute("selected", "false")
      }
      setIsEditProject(-1)
    } else {
      firstTitleButton.current.setAttribute("selected", "false")
      if (secondTitleButton.current) {
        secondTitleButton.current.setAttribute("selected", "false")
      }
      if (lastTitleButton)
        lastTitleButton.current.setAttribute("selected", "true")
      setIsEditProject(-1)
    }

  }, [profileActiveTab])


  return (
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          <div className={styles.headerButtons}>
            <h1 ref={firstTitleButton} onClick={() => setProfileActiveTab(0)}>Личный кабинет</h1>
            {userRole === "user" ? (
              <h1 ref={secondTitleButton} onClick={() => setProfileActiveTab(1)}>Проекты</h1>) : null}
            {userRole === "worker" ? (
              <>
                <h1 ref={secondTitleButton} onClick={() => setProfileActiveTab(1)}>Задачи</h1>
                <h1 ref={lastTitleButton} onClick={() => setProfileActiveTab(3)}>Мои отчеты</h1>
              </>) : null}
          </div>
          {profileActiveTab === 0 ? profileTab() :
            <>
              {profileActiveTab === 1 ? (
                <>
                  {userRole === "user" ? projectsPage() : <>{userRole === "worker" ? (
                    <Tasks userRole={userRole} tasksElements={tasksElements}/>) : (
                    <ReportsList onDelete={(e) => {

                    }} reports={myReports}/>
                  )}</>}
                </>
              ) : (
                <>
                  <ReportsList onDelete={(e) => {

                  }} reports={myReports}/>
                </>
              )}
            </>}
        </div>
      </div>
    </div>
  )

  function profileTab() {
    let birthdayString = undefined
    try {
      birthdayString = userInfo.birthday?.toLocaleDateString("ru")
    } catch (e) {

    }

    return (
      <>
        {editProfile ? (
          <EditProfile userRole={userRole} close={() => {
            setEditProfile(false)
            window.scrollTo(0, 0)
          }} userInfoData={userInfo} save={(e) => {
            console.log(e)
            setUserInfo(e)
            query2(`/users/${e.id}`, "PUT", e, (e: any) => {
            }, () => {
            })
            // query("/v1/users/","PUT",e,()=>{},()=>{})
            // fetch("http://localhost:3001/users", {
            //   method: "POST",
            //   body: JSON.stringify(e)
            // }).then(r  =>r.json())
          }}/>
        ) : (
          <div className={styles.profileInfo}>
            <div>
              <div className={styles.userData}>
                <h3>Name of user</h3>
                <h3>ID</h3>
                {birthdayString ? (
                  <>
                    <div>Дата рождения</div>
                    <div>{birthdayString}</div>
                  </>
                ) : null}
                <div>Электронная почта</div>
                <div>{userInfo.username}</div>
                <div>Telegram</div>
                <div>{userInfo.tgLink}</div>
                <div>Номер телефона</div>
                <div>{userInfo.phone}</div>
                <div>Пол</div>
                <div>{userInfo.gender}</div>
                <div>Город</div>
                <div>{userInfo.city}</div>
                <div>Роль / должность</div>
                <div>{userInfo.position}</div>
                <div>ВУЗ</div>
                <div>{userInfo.university}</div>
                {userInfo.roles?.length ? (
                  <>
                    <div>Права доступа</div>
                    <div>{(userInfo.roles[0] === "admin" ? ("Администратор") : (
                        <>
                          {userInfo.roles[0] === "worker" ? "Сотрудник" : "Участник"}
                        </>)
                    )}</div>
                  </>
                ) : (null)}
                {userRole === "user" ? (
                  <>

                    <div>Навыки</div>
                    <div className={styles.tagsParent}>
                      {userInfo.skills?.map((e) => {
                        return (
                          <>
                            <TagItem color={"green"}>{e}</TagItem>
                          </>
                        )
                      })}
                    </div>
                  </>
                ) : null}
              </div>
              <Button type={"outline"} style={{marginTop: "20px"}}
                      onClick={() => setEditProfile(true)}>Редактировать</Button>
            </div>
            {userRole === "user" && myTeam ? (
              <div className={styles.groupData}>
                <div className={styles.groupName}>
                  <div>
                    <h2>Команда:</h2>
                    <h2>{myTeam.name}</h2>
                  </div>
                </div>
                <div className={styles.usersList}>
                  {myTeam.members.map((e, i) => {
                    return (
                      <>
                        <UserItem

                          buttonText={""}
                          onButton={() => {
                            let buff = JSON.parse(JSON.stringify(groupTeam))
                            buff.splice(i, 1)
                            setGroupTeam(buff)
                          }}

                          userData={e}/>
                      </>
                    )
                  })}
                </div>

              </div>
            ) : null}
          </div>
        )}
      </>
    )
  }

  function projectsPage() {
    return <ProjectsComponents isEditProject={isEditProject} projects={projects} setProjects={(e) => {
      setProjects(e)
    }} setIsEditProject={(e) => {
      setIsEditProject(e)
    }}/>
  }
}


