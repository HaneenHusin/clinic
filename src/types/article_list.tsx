export interface ArticleList {
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
    key_wards: string
    slug: string
    body: string
    photos: number[]
    photos_list: PhotosList[]
    active: boolean
    id: number
  }
  
  export interface PhotosList {
    created: string
    datafile: string
    width: number
    height: number
    name: string
    id: number
  }
  