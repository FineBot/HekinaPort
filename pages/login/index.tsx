import styles from './index.module.scss'
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import React, {useEffect} from "react";
import {parseJwt, query2} from "../../components/other";


export default function Index(props: any) {
  let login = ""
  let pass = ""

  return (
    <div>
      <Header setDefaultBackground={"true"}/>

      <div className={styles.parent}>
        <div>
          <div className={styles.loginCard}>
            <h1>Авторизация</h1>
            <Input placeholder={"Логин"} style={{width: "90%"}} type={"profile"} onInput={(e) => {
              login = e
            }}/>
            <Input placeholder={"Пароль"} style={{width: "90%"}} type={"password"} onInput={(e) => {
              pass = e
            }}/>
            <Button style={{marginTop: "15px"}} type={"outline"} onClick={() => {
              query2("/users?username="+login+"&password="+pass,"GET",undefined,(e:any)=>{
                localStorage.setItem("login",login)
                localStorage.setItem("pass",pass)
                localStorage.setItem("id",e[0].id)
                localStorage.setItem("roles",e[0].roles[0])
                window.location.href="/profile"
              })
              return






              // fetch(process.env.NEXT_PUBLIC_API_URL+"/auth/login", {
              //   method: "POST",
              //   headers:{
              //     "Content-type":"application/json"
              //   },
              //   body:JSON.stringify({username:login,password:pass})
              // }).then(r => {return [r.json(),r.status]})
              //   .then((result:any)=>{
              //     if(result[1]===200){
              //       result[0].then((e:any)=>{
              //         localStorage.setItem("accessToken",e.token)
              //         window.location.href="/profile"
              //       })
              //     }else
              //       alert(result[1])
              //   })
            }}>Войти</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
