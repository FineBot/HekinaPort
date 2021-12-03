import styles from './ProjectsExample.module.scss'
import ProjectItem from "../../../ProjectItem/ProjectItem";
import {useEffect, useRef, useState} from "react";

export default function ProjectsExample(props){
  const [startaps, setStartaps] = useState([])
  const startapsRef = useRef()
  startapsRef.current=startaps

  useEffect(()=>{
    startapsRef.current=startaps
  },[startaps])

  useEffect(()=>{

    setStartaps([
      {hide:false},
      {hide:false},
      {hide:false},
      {hide:false},
      {hide:false},
      {hide:false},
      {hide:false},
      {hide:false},
      {hide:false},
    ])

    setInterval(()=>{
      let i =0;
      let inte=setInterval(()=>{
        if(i>=startapsRef.current.length){
          clearInterval(inte)
          setStartaps([
            {hide:false},
            {hide:false},
            {hide:false},
            {hide:false},
            {hide:false},
            {hide:false},
            {hide:false},
            {hide:false},
            {hide:false},
          ])
        }else{
          let data=JSON.parse(JSON.stringify(startapsRef.current))
          data[i].hide=true
          i++
          setStartaps(data)
        }
      },100)
    },5000)
  },[])

  return(
    <div className={styles.parent} id={props.name}>
      <div className={styles.content}>
        <h1>Здесь собраны стартапы, предлагающие решение обширного спектра проблем</h1>
        <div className={styles.items}>
          {startaps.map((e,i)=>{
            return (
              <ProjectItem color={"secondary"} key={i} hide={e.hide.toString()} text={"fff"}>Название мега крутого проекта</ProjectItem>
            )
          })}

        </div>
      </div>
    </div>
  )
}
