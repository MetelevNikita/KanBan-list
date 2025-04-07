export type CardType = {
  [x: string]: any
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