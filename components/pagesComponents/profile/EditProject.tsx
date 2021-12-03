import styles from '../../../pages/profile/index.module.scss'
import Header from "../../Header/Header";
import {useEffect, useState} from "react";
import Button from "../../Button/Button";
import ProjectItem from "../../ProjectItem/ProjectItem";
import TagItem from "../../TagItem/TagItem";
import Input from "../../Input/Input";
import CheckBox from "../../CheckBox/CheckBox";
import TextArea from "../../TextArea/TextArea";
import TagsInput from "../../TagsInput/TagsInput";
import {getTags, query2} from "../../other"
// @ts-ignore
import {getStack} from "../../other"
import UserItem from "../../UserItem/UserItem";
import {projectData, teamData} from "../../structures";
import Select from "../../Select/Select";

export interface EditProjectsrops {
  close?: () => void,
  projectInfoData: projectData,
  save: (e: projectData) => void
}

export default function EditProject({
                                      close = () => {
                                      }, projectInfoData, save
                                    }: EditProjectsrops) {

  const [tags, setTag] = useState(getTags().sort((k, j) => {
    if (k.name > j.name)
      return 1
    else
      return -1
  }))

  const [selectOptions, setSelectOptions] = useState([])
  const [projectInfo, setProjectInfo]=useState(projectInfoData)
  const [projectTechTags, setProjectTechTags] = useState(projectInfo.tech)

  let initTeams:teamData[]=[]
  const [teams, setTeams] = useState(initTeams)

  useEffect(() => {
    let buff = JSON.parse(JSON.stringify(tags))
    if (projectInfo.tags) {
      tags.forEach((item, index) => {
        if (projectInfo.tags?.indexOf(item.name) != -1) {
          buff[index].checked = true
        }
      })
    }
    setTag(buff)

    query2("/teams","GET",undefined,(e:any)=>{
      setTeams(e)
    })
  }, [])

  useEffect(()=>{
    setProjectInfo(projectInfoData)
  },[projectInfoData])

  useEffect(()=>{
    setProjectTechTags(projectInfo.tech)

    let buff:any=projectInfo
    buff=buff?.team?.members

    setSelectOptions(buff?.map((e:any)=>{
      return {value:e.id,text:e.lastName+" "+e.firstName+" "+e.middleName}
    }))
  },[projectInfo])


  return (
    <div className={styles.profileInfo}>
      <div style={{width:"100%"}}>
        <div className={styles.editProjectPageContainer}>
          <div className={styles.projectData}>
            <Input title={"Название проекта"} onInput={(e)=>projectInfo.name=e} defaultValue={projectInfo.name}></Input>
            <TextArea title={"Описание"} onInput={(e)=>projectInfo.desc=e} defaultValue={projectInfo.desc}></TextArea>
            <TextArea title={"Кейсы использования"} onInput={(e)=>projectInfo.problem=e} defaultValue={projectInfo.problem}></TextArea>
            <Input title={"Ссылка на прототип"} onInput={(e)=>{projectInfo.linkPrototype=e}} defaultValue={projectInfo.linkPrototype}></Input>
            <Input title={"Ссылка на презентацию"} onInput={(e)=>{projectInfo.linkPresentation=e}} defaultValue={projectInfo.linkPresentation}></Input>
            <TextArea title={"Анализ данных"} onInput={(e)=>{projectInfo.analytics=e}} defaultValue={projectInfo.analytics}></TextArea>
            <TagsInput placeholder={"Стек технологий проекта"} setTags={(e)=>{setProjectTechTags(e)}} tags={projectTechTags} onInput={(e)=>{}} suggestions={getStack().map((e:any)=>{
              return {id:e, text:e}
            })}></TagsInput>
            <div className={styles.costAndDeadline}>
              <Input title={"Стоимость"} onInput={(e)=>projectInfo.cost=e} defaultValue={(projectInfo.cost?projectInfo.cost+"":"")} type={"number"}></Input>
              <Input title={"Сроки реализации"} onInput={(e)=>{projectInfo.deadline=e}} defaultValue={projectInfo.deadline} type={"date"}></Input>
            </div>
            <Input title={"Сайт"} onInput={(e)=>{projectInfo.site=e}} defaultValue={projectInfo.site}></Input>
            <Select defaultValue={projectInfo.team?projectInfo.team.id:undefined} title={"Команда"} options={
              teams.map((e:any,i:number)=>{
                return {value:e.id,text:e.name}
              })
            } onChange={(e)=>{
              projectInfo.team=teams.filter((ex)=>ex?.id?.toString()===e.toString())[0]
              console.log(projectInfo)

              let buff:any=projectInfo
              buff=buff.team.members

              setSelectOptions(buff?.map((e:any)=>{
                return {value:e.id,text:e.lastName+" "+e.firstName+" "+e.middleName}
              }))
            }}></Select>
            <div>
              <Select title={"Контактное лицо"} options={selectOptions} onChange={(e)=>{
                let buff:any=projectInfo
                projectInfo.contact=buff.members.filter((ex:any)=>{
                  return ex.id.toString()===e.toString()
                })[0]
                console.log(projectInfo.contact)
              }}/>
            </div>
            <Select defaultValue={projectInfo.type} title={"Тип"} options={[
              {value:"pilot", text:"Пилотный"},
              {value:"base", text:"Обычный"}
            ]} onChange={(e)=>{
              projectInfo.type=e
            }}/>
            <Input title={"Фаза тестирования"} defaultValue={projectInfo.phase} onInput={(e)=>{projectInfo.phase=e}}/>
            <Select defaultValue={projectInfo.setrify} title={"Требует ли сертификации"} options={[
              {
                value:"not",text:"Нет"
              },
              {
                value:"yesHas",text:"Да (сертифицирован)"
              },
              {
                value:"yesNotHas",text:"Да (не сертификации)"
              }
            ]} onChange={(e)=>{
              projectInfo.setrify=e
            }}></Select>
          </div>
          <div style={{marginTop:"0px", flex:"1 1 10%"}}>
            <h3 style={{marginBottom: "20px"}}>Направления проекта</h3>
            <div className={styles.editProjectPageTagsParent}>
              {tags.map((el) => {
                let defaultChecked=false
                if(projectInfo.tags)
                  defaultChecked=projectInfo.tags?.indexOf(el.name) !== -1
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
                    }} defaultChecked={defaultChecked} name={el.name} value={el.name}/>
                  </>
                )
              })}
            </div>
          </div>

        </div>
        <Button type={"outline"} style={{marginTop: "20px"}} onClick={() => {
          projectInfo.tags = []

          projectInfo.tech=projectTechTags

          for (let i of tags)
            if (i.checked)
              projectInfo.tags.push(i.name)

          save(projectInfo)
          close()
        }}>Сохранить</Button>
      </div>
    </div>
  )
}


