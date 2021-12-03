import styles from './index.module.scss'
import Header from "../../components/Header/Header";
import {EditTask} from "../../components/EditTask/EditTask";
import {useEffect, useState} from "react";
import getMenuTabs from "../../components/getMenuTabs";
import UsersList from "../../components/UsersList/UsersList";
import {parseJwt, query2} from '../../components/other';
import Input from "../../components/Input/Input";

export default function Index(){
  let userRole = "user"
  const [tabs, setTabs] = useState(getMenuTabs(userRole))
  const [users, setUsers] = useState([])
  useEffect(()=>{
    userRole=parseJwt().sub

    setTabs(getMenuTabs(userRole))


    query2("/users","GET",undefined,(e:any)=>{
      setUsers(e)

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
          <UsersList users={users}/>
        </div>
      </div>
    </div>
  )
}
