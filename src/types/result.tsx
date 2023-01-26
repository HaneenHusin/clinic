export interface ResultsListAdmin {
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
    min_point: number
    max_point: number
    id: number
  }
  
  export interface ResultItem {
    created: string
    text: string
    min_point: number
    max_point: number
    id: number
  }