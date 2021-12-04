import styles from './index.module.scss';

export enum RoadmapCardStatus {
  Done,
  InProcess,
  Unavailable
}

export interface RoadmapCardProps {
  title: string,
  description: string,
  status: RoadmapCardStatus,
  availableFrom: number,
  imgUrl: string
}

export default function RoadmapCard(props: RoadmapCardProps) {
  return (
    <div className={styles.roadmap_card}>
      <div style={{display: "grid", gridTemplateColumns: '50% 1fr'}}>
        <div style={{padding: 20, color: props.status === RoadmapCardStatus.Unavailable ? '#CECECE' : ''}}>
          <div style={{fontWeight: 700, marginBottom: 8}}>{props.title}</div>
          <div>{props.description}</div>
        </div>
        <div style={{textAlign: "center"}}>
          <div style={{ position: "relative", top: -2 }}>
            {props.status === RoadmapCardStatus.InProcess ?
              <div style={{ display: 'inline-block', padding: '2px 12px', background: "#009A96"}}>В процессе</div>
              : <div style={{ display: 'inline-block', padding: '2px 12px', background: "#CC2872"}}>Недоступно</div>
            }
          </div>
          <img width={120} style={{padding: 8}} src={props.imgUrl}/>
        </div>
      </div>
    </div>
  );
}