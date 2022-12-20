export interface QuizeList {
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
    title: string
    questions_list: QuestionsList[]
    results_list: ResultsList[]
    id: number
  }
  
  export interface QuestionsList {
    created: string
    text: string
    answers_list: any[]
    active: boolean
    id: number
  }
  
  export interface ResultsList {
    created: string
    text: string
    min_point: number
    max_point: number
    id: number
  }
  