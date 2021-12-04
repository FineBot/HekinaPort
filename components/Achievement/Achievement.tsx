import styles from './Achievement.module.scss'

export default function Achievements(props:any){

  return(
    <div className={styles.parent}>
      <div><div className={styles.backImg} style={{background:"url(\'"+props.img+"\')",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}/></div>
      <div style={{width:"100%"}}>
        <div style={{
          display:"flex",
          justifyContent:"space-between"
        }}>
          <div className={styles.title}>{props.text}</div>
          <div className={styles.title}>1 ранг</div>
        </div>
        <div className={styles.line}></div>
      </div>
    </div>
  )
}
