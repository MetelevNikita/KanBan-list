

export type CommentCardTypes = {
  id: string | number,
  text: string
  date: string
}


export type CardType = {
    id: string
    title: string
    name: string
    phone: string
    tgid: string
    typeproduct: string
    otherproduct: string
    promotion: string
    typework: string
    target: string
    viewer: string
    effect: string
    description: string
    voiceover: string
    timing: string
    place: string
    technicalspecification: string
    deadline: string
    prioryty: string | any,
    status: string
    dateCreated: string
    comment: any

}


export type BoardType = {
  title: string,
  label: string,
  color: string
}


export type UsersType = {
  id: number,
  username: string,
  name: string,
  lastname: string,
  email: string
  password: string
  dateCreated: Date
  company: string
  colorBoard: string
  role: string



}