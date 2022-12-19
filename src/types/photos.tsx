export interface photosList {
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
    datafile: string
    width: number
    height: number
    name: string
    id: number
  }
  