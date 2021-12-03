import styles from './ProjectPage.module.scss'
import TagItem from "../TagItem/TagItem";
import React from "react";
import UserItem from "../UserItem/UserItem";
import {projectData} from "../structures";

interface projectPageProps {
  projectInfo: projectData
}


export default function ProjectPage({projectInfo,}: projectPageProps) {


  return (
    <div className={styles.parent}>
      <div className={styles.component}>
        <div className={styles.title}>{projectInfo.name}</div>
        <div>
          <div className={styles.subtitle}>Описание</div>
          <div className={styles.text}>
            {projectInfo.desc}
          </div>
        </div>
        <div>
          <div className={styles.subtitle}>Кейсы использования</div>
          <div className={styles.text}>
            {projectInfo.problem}
          </div>
        </div>
        <div>
          <div className={styles.subtitle}>Ссылка на прототип</div>
          <a target={"_blank"} href={projectInfo.linkPrototype} rel="noreferrer">
            {projectInfo.linkPrototype}
          </a>
        </div>
        <div>
          <div className={styles.subtitle}>Ссылка на презентацию</div>
          <a target={"_blank"} href={projectInfo.linkPrototype} rel="noreferrer">
            {projectInfo.linkPresentation}
          </a>
        </div>
        <div>
          <div className={styles.subtitle}>Анализ данных</div>
          <a className={styles.text}>
            {projectInfo.analytics}
          </a>
        </div>
        <div>
          <div className={styles.subtitle}>Сайт</div>
          <a target={"_blank"} href={projectInfo.site} rel="noreferrer">
            {projectInfo.site}
          </a>
        </div>
        <div>
          <div className={styles.subtitle}>Тип</div>
          <div className={styles.text}>
            {projectInfo.type==="pilot"?"Пилотный":"Стандартный"}
          </div>
        </div>
        <div>
          <div className={styles.subtitle}>Фаза тестирования</div>
          <div className={styles.text}>
            {projectInfo.phase}
          </div>
        </div>
        <div>
          <div className={styles.subtitle}>Требует сертификации: <span>{projectInfo.setrify}</span></div>
        </div>
        <div>
          <div className={styles.subtitle}>Контактное лицо</div>
          <UserItem userData={projectInfo.contact?projectInfo.contact:{
            firstName:"",lastName:"",middleName:"",id:""
          }}/>
        </div>
        <div className={styles.costAndDeadline}>
          <div>
            <div className={styles.subtitle}>Стоимость реализации</div>
            <div className={styles.cost}>{projectInfo.cost}</div>
          </div>
          {projectInfo.deadline ? (
            <div>
              <div className={styles.subtitle}>Сроки реализации</div>
              <div className={styles.cost}>{new Date(projectInfo.deadline).toLocaleDateString("ru")}</div>
            </div>

          ) : null}
        </div>
      </div>
      <div className={styles.component}>
        {projectInfo.tags && projectInfo.tags.length > 0 ? (
          <div>
            <div className={styles.subtitle}>Направления проекта</div>
            <div className={styles.tagsParent}>
              {projectInfo.tags.map((e) => {
                return <> <TagItem color={"green"}>{e}</TagItem></>
              })}
            </div>
          </div>
        ) : null}
        {projectInfo.tech && projectInfo.tech.length > 0 ? (
          <div>
            <div className={styles.subtitle}>Стек технологий проекта</div>
            <div className={styles.tagsParent}>
              {projectInfo.tech.map((e) => {
                return <> <TagItem color={"green"}>{e.text}</TagItem></>
              })}
            </div>
          </div>
        ) : null}
        <div>
          <div>
            <div className={styles.subtitle}>Команда</div>
            <div className={styles.teamParent}>
              {projectInfo.team?.members.map((e) => {
                return <> <UserItem userData={e}></UserItem></>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
