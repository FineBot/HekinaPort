import styles from './UsersList.module.scss'
import ProjectItem from "../ProjectItem/ProjectItem";
import Button from "../Button/Button";
import {userData} from "../structures";
import React, {useEffect, useState} from "react";
import {query2} from "../other";

interface UsersListProps{
  users:userData[]
}

export default function UsersList({users}:UsersListProps) {
  const [currentUsers, setCurrentUsers] = useState(users)

  useEffect(()=>{
    setCurrentUsers(users)
  },[users])

  return (
    <div className={styles.parent}>
      <Button size={"s"} type={"outline"} style={{marginBottom:"25px"}} onClick={()=>{
        window.location.href="/users/create"
      }}>Создать пользователя</Button>
      <div className={styles.headContent}>
        <div>ФИО</div>
        <div>Номер телефона</div>
        <div>Электронная почта</div>
      </div>
      {currentUsers.map((e, i) => {

        return (
          <>
            <ProjectItem mode={"strict"} color={"outline"}
                         text={
                           <div className={styles.content}>
                             <div>{e.lastName + " " + e.firstName + " " + e.middleName}</div>
                             <div>{e.phone ? e.phone : "-"}</div>
                             <div>{e.username ? e.username : "-"}</div>
                             <div className={styles.buttonsBlock}>
                               <div className={styles.fullButtons} onClick={() => {
                                 let buff = JSON.parse(JSON.stringify(currentUsers))
                                 buff.splice(i, 1)
                                 setCurrentUsers(buff)
                               }}>
                                 <div className={styles.firstImg}/>
                                 <Button type={"text red"} onClick={()=>{
                                   query2("/users/"+e.id,"DELETE",undefined,()=>{})
                                 }}>Удалить</Button>
                               </div>
                               <div className={styles.fullButtons} onClick={() => {
                                 window.location.href = "/users/edit/" + e.id
                               }}>
                                 <div className={styles.secondImg}/>
                                 <Button type={"text blue"}>Редактировать</Button>
                               </div>
                             </div>
                           </div>
                         }
            />
          </>
        )
      })}
    </div>
  )
}
