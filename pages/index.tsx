import Header from '../components/Header/Header.js'
import styles from './styles.module.scss'
import FirstWidget from "../components/pagesComponents/index/FirstWidget/FirstWidget.js";
import ProjectsExample from '../components/pagesComponents/index/ProjectsExample/ProjectsExample'
import NotFoundCase from "../components/pagesComponents/index/NotFoundCase/NotFoundCase";

export default function Home() {

  return (
    <div className={styles.parent}>
      <Header/>
      <FirstWidget name={"widget0"}/>
      <ProjectsExample name={"widget1"}/>
      <NotFoundCase/>
    </div>
  )
}
