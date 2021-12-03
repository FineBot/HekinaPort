import styles from '../../../pages/profile/index.module.scss'
import Header from "../../Header/Header";
import {useEffect, useState} from "react";
import Button from "../../Button/Button";
import ProjectItem from "../../ProjectItem/ProjectItem";
import TagItem from "../../TagItem/TagItem";
import Input from "../../Input/Input";
import CheckBox from "../../CheckBox/CheckBox";
import {teamData, userData} from "../../structures";
import {parseJwt, query2} from "../../other";
import Select from "../../Select/Select";

export interface EditProfileProps {
  close?: () => void,
  userInfoData: userData,
  save: (e: userData) => void,
  userRole: string
}

export default function EditProfile({
                                      close = () => {
                                      }, userInfoData, save, userRole
                                    }: EditProfileProps) {

  const [tags, setTag] = useState([
    {name: "Backend", checked: false},
    {name: "Frontend", checked: false},
    {name: "IOS", checked: false},
    {name: "Android", checked: false},
    {name: "Game Dev", checked: false},
    {name: "Windows", checked: false},
    {name: "MacOS", checked: false},
    {name: "Linux", checked: false},
    {name: "Desktop", checked: false},
    {name: "Data Science", checked: false},
    {name: "Embedded Developer", checked: false},
    {name: "Automotion QA", checked: false},
    {name: "DevOps", checked: false},
    {name: "Design", checked: false},
    {name: "UI/UX", checked: false},
    {name: "ML", checked: false},

  ].sort((k, j) => {
    if (k.name > j.name)
      return 1
    else
      return -1
  }))

  let userInfo = userInfoData
  userInfo.birthday = userInfoData.birthday

  const [userCurrentRole, setUserCurrentRole] = useState("user")
  let f: any = "user"
  if (userInfo.roles?.length)
    f = userInfo.roles[0]
  const [userInfoAccess, setUserInfoAccess] = useState(f)
  const [birthdayString, setBirthdayString] = useState("")
  let teamsInit: teamData[] = []
  const [teams, setTeams] = useState(teamsInit)

  useEffect(() => {
    let buff = JSON.parse(JSON.stringify(tags))
    if (userInfoData.skills) {
      tags.forEach((item, index) => {
        if (userInfoData.skills?.indexOf(item.name) != -1) {
          buff[index].checked = true
        }
      })
    }
    setTag(buff)

    setUserCurrentRole(parseJwt().sub)


    query2("/teams", "GET", undefined, (e: any) => {
      setTeams(e)
      query2("//", "GET", undefined, (ex: any) => {
        setTeams(e)
      })
    })

    try {
      setBirthdayString(userInfo.birthday?.getFullYear() + "-" + ("0" + (Number(userInfo.birthday?.getMonth()) + 1)).slice(-2) + "-" + ("0" + userInfo.birthday?.getDate()).slice(-2))
    } catch (e) {

    }

  }, [])
  useEffect(() => {
    if (userInfo.roles) {
      setUserInfoAccess(userInfo.roles[0])
    }
  }, [userInfo])

  return (
    <div className={styles.profileInfo}>
      <div>
        <div className={styles.editProfileContainerParent}>
          <div className={styles.userData}>
            <h3>Name of user</h3>
            <h3>ID</h3>
            <div>Фамилия</div>
            <Input defaultValue={userInfo.lastName} onInput={(e) => {
              userInfo.lastName = e
            }}/>
            <div>Имя</div>
            <Input defaultValue={userInfo.firstName} onInput={(e) => {
              userInfo.firstName = e
            }}/>
            <div>Отчество</div>
            <Input defaultValue={userInfo.middleName} onInput={(e) => {
              userInfo.middleName = e
            }}/>
            <div>Дата рождения</div>
            <Input
              defaultValue={birthdayString}
              type={"date"} onInput={(e) => {
              userInfo.birthday = new Date(e)
            }}/>

            <div>Электронная почта</div>
            <Input defaultValue={userInfo.username} onInput={(e) => {
              userInfo.username = e
            }}/>
            <div>Telegram</div>
            <Input defaultValue={userInfo.tgLink} onInput={(e) => {
              userInfo.tgLink = e
            }}/>
            <div>Номер телефона</div>
            <Input defaultValue={userInfo.phone} onInput={(e) => {
              userInfo.phone = e
            }}/>
            <div>Пол</div>
            <Input defaultValue={userInfo.gender} onInput={(e) => {
              userInfo.gender = e
            }}/>
            <div>Город</div>
            <Input defaultValue={userInfo.city} onInput={(e) => {
              userInfo.city = e
            }}/>
            <div>Роль / должность</div>
            <Input defaultValue={userInfo.position} onInput={(e) => {
              userInfo.position = e
            }}/>
            <div>ВУЗ</div>
            <Input defaultValue={userInfo.university} onInput={(e) => {
              userInfo.university = e
            }}/>

            {userCurrentRole === "admin" ? (
              <>

                <div>
                  Права доступа
                </div>
                <Select defaultValue={userInfoAccess} onChange={(e) => {
                  userInfo.roles = []
                  userInfo.roles?.push(e)
                  setUserInfoAccess(e)
                }} options={[
                  {value: "user", text: "Участник"},
                  {value: "worker", text: "Сотрудник"},
                  {value: "admin", text: "Администратор"}
                ]}/>

              </>
            ) : null}
            <div>Пароль</div>
            <Input onInput={() => {
            }} type={"password"}/>

          </div>
          {userRole === "user" ? (<>
            <div>
              <h3 style={{marginBottom: "20px"}}>Навыки</h3>
              <div className={styles.editPageTagsParent}>
                {tags.map((el) => {
                  return (
                    <>
                      <CheckBox onChange={(e) => {
                        let buff = JSON.parse(JSON.stringify(tags))
                        for (let i in buff) {
                          if (buff[i].name === el.name) {
                            buff[i].checked = e
                          }
                        }
                        setTag(buff)
                      }} defaultChecked={userInfoData.skills?.indexOf(el.name) != -1} name={el.name} value={el.name}/>
                    </>
                  )
                })}
              </div>
            </div>
          </>) : null}

        </div>
        <Button type={"outline"} style={{marginTop: "20px"}} onClick={() => {
          userInfo.skills = []
          for (let i of tags)
            if (i.checked)
              userInfo.skills.push(i.name)

          save(userInfo)
          close()
        }}>Сохранить</Button>
      </div>
    </div>
  )
}


