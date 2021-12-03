import Header from "../../../components/Header/Header";
import styles from "../../profile/index.module.scss";
import ProjectPage from "../../../components/ProjectPage/ProjectPage";
import {useEffect, useState} from "react";
import getMenuTabs from "../../../components/getMenuTabs";
import EditProfile from "../../../components/pagesComponents/profile/EditProfile";
import {userData} from "../../../components/structures";
import {parseJwt, query, query2} from "../../../components/other";

export default function CreateUsers() {
  let userRole = "user"
  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  useEffect(() => {
    userRole = parseJwt().sub
    setTabs(getMenuTabs(userRole))
  }, [])

  let user: userData = {
    id: "",
    firstName: "",
    lastName: "",
    middleName: "",
    tgLink: "",
    email: "",
    roles: [""],
    skills: []
  }

  return (
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          <EditProfile userInfoData={user} save={(e) => {
            // query("/v1/users","POST",e)
            let buff=JSON.parse(JSON.stringify(e))
            buff.password="1111"
            query2("/users/", "POST", buff, (e: any) => {
            })
            window.history.back()
          }} userRole={"admin"}/>
        </div>
      </div>
    </div>
  )
}
