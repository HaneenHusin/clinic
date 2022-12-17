export interface Root {
    status: string
    code: number
    data: Data
    message: any
  }
  
  export interface Data {
    refresh: string
    access: string
    role: string
  }