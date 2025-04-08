export type CardType = {
  id: number,
  status: string,
  author: string,
  title: string,
  description: string,
  deadline: string,
  prioryty?: string,
  dateCreated: string,
  dateUpdated: string
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
  dateCreated: string
  company?: string
  colorBoard: string
  role: string



}