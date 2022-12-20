export interface HomeList {
    status: string
    code: number
    data: Data
    message: any
  }
  
  export interface Data {
    sliders: Slider[]
    articles: Article[]
    feedback: Feedback[]
  }
  
  export interface Slider {
    created: string
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
  
  export interface Article {
    created: string
    title: string
    keywords: any
    slug: string
    body: string
    photos: any[]
    photos_list: any[]
    active: boolean
    id: number
  }
  
  export interface Feedback {
    created: string
    title: string
    brief: string
    active: boolean
    id: number
  }
  