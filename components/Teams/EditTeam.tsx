import styles from './Teams.module.scss'
import {teamData, userData} from "../structures";
import {useEffect, useState} from "react";
import {getTags, query2} from "../other";
import Button from "../Button/Button";
import Input from "../Input/Input";
import UserItem from "../UserItem/UserItem";
import Select from "../Select/Select";
// @ts-ignore

export interface EditTeam {
  close?: () => void,
  teamInfo: teamData,
  save: (e: teamData) => void
}

export default function EditTeam({
                                      close = () => {
                                      }, teamInfo, save
                                    }: EditTeam) {


  const [teamInfoDate, editTeamInfoDate] = useState(teamInfo)
  let us:userData[]=[{firstName: "", id: "", lastName: "", middleName: ""}]
  const [onSelectValue, setOnSelectValue]=useState(-1)

  const [users,setUsers] = useState(us)


  const setTeamInfoDate=(e:any)=>{
    editTeamInfoDate({...teamInfoDate,...e})
  }

 useEffect(()=>{
   setTeamInfoDate(teamInfo)
 },[teamInfo])

  useEffect(()=>{
    query2("/users","GET",undefined,(e:any)=>{
      setUsers(e)
      setOnSelectValue(e[0].id)
    })
  },[])


  return (
    <div className={styles.teamInfo}>
      <div style={{width:"100%"}}>
        <div className={styles.editProjectPageContainer}>
          <Input defaultValue={teamInfoDate.name} onInput={(e)=>{
            setTeamInfoDate({name:e})
          }} placeholder={"Название проекта"}/>
          <div>
            <div className={styles.addUserBlock}>
              <Select options={
                users.filter((ex)=>{
                  return !teamInfoDate.members.some((ey)=>ey?.id===ex.id)
                }).map((e)=>{
                  return {value:e.id, text:e.lastName+" "+e.firstName+" "+e.middleName}
                })
              } onChange={(e)=>{setOnSelectValue(e)}}/>
              <Button type={"outline"} size={"s"} style={{marginBottom:"-5px"}} onClick={()=>{
                let buff = JSON.parse(JSON.stringify(teamInfoDate))

                let usedIds:any=users.filter((ex)=>{
                  return !teamInfoDate.members.some((ey)=>ey.id===ex.id)
                }).map((e)=>{
                  return {value:e.id, text:e.lastName+" "+e.firstName+" "+e.middleName}
                })[0].value

                buff.members.push(users.filter((ex)=>{return ex.id.toString()===onSelectValue.toString()})[0])
                setOnSelectValue(usedIds)

                setTeamInfoDate(buff)

              }}>Добавить пользователя</Button>
            </div>
            <div className={styles.subtitle}>Участники</div>
            <div className={styles.membersList}>
              <div className={styles.memberData}>
                {teamInfoDate.members.map((e,i)=>{
                  return <>
                    <UserItem buttonText={"Удалить"} onButton={()=>{
                      let buff = JSON.parse(JSON.stringify(teamInfoDate))
                      buff.members.splice(i,1)
                      setTeamInfoDate(buff)
                    }} userData={e}/>
                  </>
                })}
              </div>
            </div>

          </div>
          <Button type={"outline"} size={"m"} style={{width:"fit-content", minWidth:"fit-content"}} onClick={() => {
            save(teamInfoDate)
          }}>Сохранить</Button>
        </div>

      </div>
    </div>
  )
}


