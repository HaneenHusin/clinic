export interface QuestionList {
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
    text: string
    answers_list: any[]
    active: boolean
    id: number
  }
  export interface QuestionItem {
    created: string
    text: string
    answers_list: any[]
    active: boolean
    id: number
  }