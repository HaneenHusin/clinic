export interface HomeList {
  status: string
  code: number
  data: Data
  message: any
}

export interface Data {
  information: Information[]
  quiz: Quiz[]
  sliders: Slider[]
  articles: Article[]
  feedback: Feedback[]
}

export interface Information {
  created: string
  name: string
  value: string
  active: boolean
  id: number
}

export interface Quiz {
  created: string
  title: string
  questions_list: QuestionsList[]
  results_list: any[]
  id: number
}

export interface QuestionsList {
  created: string
  text: string
  answers_list: AnswersList[]
  active: boolean
  id: number
}

export interface AnswersList {
  created: string
  points: number
  text: string
  id: number
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

export interface Feedback {
  created: string
  title: string
  brief: string
  active: boolean
  id: number
}
