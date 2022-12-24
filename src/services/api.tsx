
import axios from "axios";
import useSWR from "swr";
import { ToastErrorShow, ToastSuccessShow } from '../components/toast';
import { ArticleList } from '../types/article';
import { CertificateList } from "../types/certificate";
import { HomeList } from "../types/home";
import { InformationList } from "../types/information";
import { SlidersList } from "../types/slider";
import { photosList } from "../types/photos";
import { FeedbackList } from "../types/feedback";
import { QuizeList } from "../types/quize";
import { QuestionList } from "../types/question";
import { AnswerList } from "../types/answer";
import { ResultsListAdmin } from "../types/result";


axios.defaults.baseURL = "https://adhd.nasayimhalab.net/api";
axios.defaults.withCredentials = true;

const fetcher = (url:string) => axios.get(url).then(res => res.data)





export function home(){
    const { data, error } = useSWR<HomeList, Error>(`/home/`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
export function articlesList(page:number, pageSize:number){
    const { data, error } = useSWR<ArticleList, Error>(`/admin/articles/?page=${page}&page_size=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
export function articlesclient(page:number, pageSize:number){
    const { data, error } = useSWR<ArticleList, Error>(`/articles/?page=${page}&page_size=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function certificateList(page:number, pageSize:number){
    const { data, error } = useSWR<CertificateList, Error>(`/admin/certificates/?page=${page}&pageSize=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
export function certificateclient(page:number, pageSize:number){
    const { data, error } = useSWR<CertificateList, Error>(`/certificates/?page=${page}&pageSize=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function slidersList(page:number, pageSize:number){
    const { data, error } = useSWR<SlidersList, Error>(`/admin/sliders/?page=${page}&pageSize=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function informationList(page:number, pageSize:number){
    const { data, error } = useSWR<InformationList, Error>(`/admin/information/?page=${page}&pageSize=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
export function photosList(page:number, pageSize:number){
    const { data, error } = useSWR<photosList, Error>(`/admin/photos/?page=${page}&pageSize=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
export function feedbackList(page:number, pageSize:number){
    const { data, error } = useSWR<FeedbackList, Error>(`/admin/feedback/?page=${page}&pageSize=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
export function quizeList(page:number, pageSize:number){
    const { data, error } = useSWR<QuizeList, Error>(`/admin/quize/?page=${page}&pageSize=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
export function quizeclient(page:number, pageSize:number){
    const { data, error } = useSWR<QuizeList, Error>(`/quiz/?page=${page}&page_size=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
export function questionsList(page:number, pageSize:number,idQuize:number){
    const { data, error } = useSWR<QuestionList, Error>(`/admin/quize/${idQuize}/questions/?page=${page}&pageSize=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
export function answerList(page:number, pageSize:number,idQuize:number,idQuestion:Number){
    const { data, error } = useSWR<AnswerList, Error>(`/admin/quize/${idQuize}/questions/${idQuestion}/answers/?page=${page}&pageSize=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
export function resultList(page:number, pageSize:number,idQuize:number){
    const { data, error } = useSWR<ResultsListAdmin, Error>(`/admin/quize/${idQuize}/results/?page=${page}&pageSize=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}
export function SignRequest(
    endpoint: string,
    Data:any,
    onSuccess:Function
  ) {
   axios.post(`${endpoint}`, Data)
   .then((response) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.access}`
       onSuccess(response.data.data)
       ToastSuccessShow("نجحت العملية ")
   })
   .catch(error => {
    ToastErrorShow("فشلت العملية , الرجاء المحاولة مجدداً")
   })

  }


 
  export function PostRequest(
    endpoint: string,
    Data:any,
    onSuccess:Function,
  ) {
   axios.post(`${endpoint}`, Data )
   .then((response) => {
       onSuccess(response.data.data)
       ToastSuccessShow("نجحت العملية")
   })
   .catch(error => {
    ToastErrorShow("فشلت العملية , الرجاء المحاولة مجدداً")
   })

  }
  export function UpdateRequest(
    endpoint: string,
    Data:any,
    onSuccess:Function,
  ) {
   axios.put(`${endpoint}`, Data)
   .then((response) => {
       onSuccess(response.data.data)
       ToastSuccessShow("نجحت العملية")
   })
   .catch(error => {
    ToastErrorShow("فشلت العملية , الرجاء المحاولة مجدداً")
   })

  }

  export function DeleteRequest(
    endpoint: string,
    onSuccess:Function,
  ) {
   axios.delete(`${endpoint}`)
   .then((response) => {
    onSuccess(response.data.data)
       ToastSuccessShow("نجحت العملية")
   })
   .catch(error => {
    ToastErrorShow("فشلت العملية , الرجاء المحاولة مجدداً")
   })

  }