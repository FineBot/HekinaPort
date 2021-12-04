import {reportDate, userData} from "../structures";
import ProjectItem from "../ProjectItem/ProjectItem";
import styles from './EditReport.module.scss'
import Button from "../Button/Button";
import {useEffect, useState} from "react";
import {query2} from "../other";

interface ReportsListProps {
  reports: reportDate[],
  onDelete:(e:number)=>void,
}

export default function ReportsList({reports, onDelete}: ReportsListProps) {

  const [reportsDate,setReports] = useState(reports)

  useEffect(()=>{
    setReports(reportsDate)
  },[reports])
  useEffect(()=>{
    setReports(reportsDate)
  },[])

  return (
    <div className={styles.parentContainer}>
      <Button size={"s"} type={"outline"} onClick={() => {
        window.location.href = "/reports/create"
      }}>Создать отчет</Button>

      <div className={styles.reportComponents}>

        {reportsDate.map((e, i) => {

          return <>
            <ProjectItem mode={"strict"} color={"outline"} text={
              <div className={styles.reportsParent}>
                <div className={styles.title}>
                  {e.title}
                </div>
                <div className={styles.fio}>
                  {e.author.lastName} {e.author.firstName} {e.author.middleName}
                </div>
                <div className={styles.date}>
                  {e.publishDate}
                </div>
                <div className={styles.buttonParent}>
                  <Button size={"s"} type={"outline"} onClick={() => {
                    window.location.href = "/reports/" + e.id
                  }
                  }>Открыть</Button>
                  <Button size={"s"} type={"outline"}
                          onClick={() => {
                            window.location.href = "/reports/edit/" + e.id
                          }}
                  >Редактировать</Button>
                  <Button size={"s"} type={"outline red"} onClick={()=>{
                    let buff=JSON.parse(JSON.stringify(reports))
                    let el = buff[i]
                    buff.splice(i,1)
                    setReports(buff)

                    query2("/reports/"+el.id,"DELETE",undefined,()=>{})
                  }}>Удалить</Button>
                </div>
              </div>
            }/>
          </>
        })}
      </div>
    </div>
  )
}
