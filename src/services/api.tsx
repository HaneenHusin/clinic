
import axios from "axios";
import useSWR from "swr";
import { ToastErrorShow, ToastSuccessShow } from '../components/toast';
import { ArticleList } from '../types/article_list';
import { CertificateList } from "../types/certificate_list";
import { HomeList } from "../types/home_list";
import { SlidersList } from "../types/slider_list";


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
    const { data, error } = useSWR<ArticleList, Error>(`/articles/?page=${page}&pageSize=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function certificateList(page:number, pageSize:number){
    const { data, error } = useSWR<CertificateList, Error>(`/certificates/?page=${page}&pageSize=${pageSize}`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function sliders(){
    const { data, error } = useSWR<SlidersList, Error>(`/sliders/`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function clinics(){
    const { data, error } = useSWR(`/clinics/`, fetcher)
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
       console.log(response.data);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.access}`
       onSuccess(response.data.data)
       ToastSuccessShow("Success !")
   })
   .catch(error => {
    ToastErrorShow("Please try agin ,Faild process")
       console.log(error)
   })

  }
  export function PostRequest(
    endpoint: string,
    Data:any,
    onSuccess:Function,
  ) {
   axios.post(`${endpoint}`, Data)
   .then((response) => {
       console.log(response.data);
       onSuccess(response.data.data)
       ToastSuccessShow("Success !")
   })
   .catch(error => {
    ToastErrorShow("Please try agin ,Faild process")
       console.log(error)
   })

  }
  export function UpdateRequest(
    endpoint: string,
    Data:any,
    onSuccess:Function,
  ) {
   axios.put(`${endpoint}`, Data)
   .then((response) => {
       console.log(response.data);
       onSuccess(response.data.data)
       ToastSuccessShow("Success !")
   })
   .catch(error => {
    ToastErrorShow("Please try agin ,Faild process")
       console.log(error)
   })

  }

  export function DeleteRequest(
    endpoint: string,
    onSuccess:Function,
  ) {
   axios.delete(`${endpoint}`)
   .then((response) => {
       console.log(response.data);
       onSuccess(response.data.data)
       ToastSuccessShow("Success !")
   })
   .catch(error => {
    ToastErrorShow("Please try agin ,Faild process")
       console.log(error)
   })

  }