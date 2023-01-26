export interface AnswerList {
  status: string
  code: number
  data: Data
  message: any
}

export interface Data {
  count: number
  next: any
  previous: any
  results: Result[]
}

export interface Result {
  created: string
  points: number
  text: string
  id: number
}


  export interface AnswerItem {
    created: string
  points: number
  text: string
  id: number
  }