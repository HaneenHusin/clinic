export interface FeedbackList {
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
    brief: string
    active: boolean
    id: number
  }