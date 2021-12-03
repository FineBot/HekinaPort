import Header from "../../components/Header/Header";
import styles from "../profile/index.module.scss";
import Input from "../../components/Input/Input";
import TagsInput from "../../components/TagsInput/TagsInput";
import ProjectsComponents from "../../components/ProjectsComponent/ProjectsComponent";
import {useEffect, useState} from "react";
import getMenuTabs from "../../components/getMenuTabs";
import {parseJwt, query2} from "../../components/other";
import EditTeam from "../../components/Teams/EditTeam";
import {teamData} from "../../components/structures";
import {useRouter} from "next/router";

export default function Id() {
  let userRole = "user"
  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  const params = useRouter()
  const teamIn: teamData = {members: [], name: ""}
  const [teamInfo, setTeamInfo] = useState(teamIn)
  useEffect(() => {
    userRole = parseJwt().sub
    setTabs(getMenuTabs(userRole))

  }, [])


  return (
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          <EditTeam teamInfo={teamInfo} save={(e) => {
            query2("/teams/", "POST", e, (e: any) => {
              setTimeout(()=>{
                window.location.href="/teams"
              },200)
            }, () => {
              setTimeout(()=>{
                window.location.href="/teams"
              },200)
            })
          }}/>
        </div>
      </div>
    </div>
  )
}
