export interface CertificateList {
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
    text: string
    photo: number
    photo_model: PhotoModel
    active: boolean
    id: number
  }
  
  export interface PhotoModel {
    created: string
    datafile: string
    width: number
    height: number
    name: string
    id: number
  }
  