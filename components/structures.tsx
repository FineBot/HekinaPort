export interface userItem {
  name: string,
  email: string,
  tgLink: string,
  role: string,
  skills: string[],
  buttonText?:string,
  onButton?:()=>any,
}

export interface userData {
  firstName: string,
  lastName: string,
  middleName: string,
  birthday?: Date,
  phone?: string,
  gender?: string,
  city?: string,
  team_role?: string,
  skills?: string[],
  tgLink?: string,
  id:string,
  roles?:string[], // права
  username?:string, // он же почта и логин
  position?:string, // роль в команде
  team?:string,
  university?:string,
  password?:string,
}

export interface tech{
  id:string,
  text:string,
}

export interface projectData {
  name: string,
  desc: string,
  tags: string[],
  cost?:number,
  id?:string,
  problem?:string,
  linkPrototype?:string,
  linkPresentation?:string,
  analytics?:string,
  deadline?:string,
  tech?:tech[],
  status?:string,
  setrify?:string,
  contact?:userData,
  site?:string,
  team?:teamData,
  type?:string, // new
  phase?:string,
}

export interface taskData {
  name: string,
  tags: string[],
  desc: string,
  problem?:string,
  interaction?:string,
  budget?:string,
  deadline?:string,
  author?:userData,
  tech?:string[],
  id?:string,
}

export interface teamData{
  members:userData[],
  name:string,
  projects?:projectData[],
  id?:string
}

export interface reportDate{
  title?:string,
  author:userData,
  content?:string,
  publishDate?:string,
  id?:string
}

