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
    keywords: string
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
  
  export interface ArticleItem {
    created: string
    title: string
    keywords: string
    slug: string
    body: string
    photos: number[]
    photos_list: PhotosList[]
    active: boolean
    id: number
  }