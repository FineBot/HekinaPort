import Input from "../Input/Input";
import {reportDate, taskData} from "../structures";
import Editor from "../Editor/Editor";
import styles from './EditReport.module.scss'
import Button from "../Button/Button";
import {useEffect, useState} from "react";

interface reportProps {
  reportInfo?: reportDate,
  save: (e: reportDate) => void,
}

export default function EditReport({
                                     reportInfo = {
                                       author: {
                                         lastName: "", firstName: "", middleName: "", id: ""
                                       }
                                     }, save
                                   }: reportProps) {

  let task: reportDate = JSON.parse(JSON.stringify(reportInfo))


  return (
    <div className={styles.parent}>
      <Input placeholder={"Название отчета"} defaultValue={task.title} onInput={(e) => {
        task.title = e
      }}/>
      <Editor firstState={reportInfo.content} onChange={(e: any) => {
        task.content = e
      }}/>
      <div className={styles.buttonParent}>
        <Button type={"outline"} onClick={() => {
          save(task)
        }}>Сохранить</Button>
      </div>
    </div>
  )
}
