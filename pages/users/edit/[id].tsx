import Header from "../../../components/Header/Header";
import styles from "../../profile/index.module.scss";
import ProjectPage from "../../../components/ProjectPage/ProjectPage";
import {useEffect, useState} from "react";
import getMenuTabs from "../../../components/getMenuTabs";
import EditProfile from "../../../components/pagesComponents/profile/EditProfile";
import {userData} from "../../../components/structures";
import {parseJwt, query2} from "../../../components/other";
import {useRouter} from "next/router";

export default function UsersEditPage() {
  let userRole = "user"
  const params = useRouter()
  let user: userData = {
    id: "",
    firstName: "1Имя",
    lastName: "Фамилия",
    middleName: "Отчество",
    tgLink: "@test",
    username: "mail@mail.ru",
    skills: ["ML", "Android"]
  }
  const [userData, setUserData]=useState(user)

  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  useEffect(() => {
    userRole = parseJwt().sub
    setTabs(getMenuTabs(userRole))
  }, [])

  useEffect(()=>{
    query2("/users/"+params.query.id,"GET",undefined,(e:any)=>{
      setUserData(e)
    })
  },[params])



  return (
    <div>
      <Header tabs={tabs}/>
      <div className={styles.parent}>
        <div className={styles.content}>
          <EditProfile userInfoData={userData} save={(e) => {
            query2("/users/"+params.query.id,"PUT",e,(ex:any)=>{
              window.location.href="/users"
            },()=>{
              window.location.href="/users"
            })

          }} userRole={"admin"}/>
        </div>
      </div>
    </div>
  )
}
