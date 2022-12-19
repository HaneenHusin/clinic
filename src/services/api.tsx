
import axios from "axios";
import useSWR from "swr";
import { ToastErrorShow, ToastSuccessShow } from '../components/toast';
import { ArticleList } from '../types/article_list';
import { CertificateList } from "../types/certificate_list";
import { HomeList } from "../types/home_list";
import { InformationList } from "../types/information_list";
import { SlidersList } from "../types/slider_list";
import { photosList } from "../types/photos";


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

export function slidersList(page:number, pageSize:number){
    const { data, error } = useSWR<SlidersList, Error>(`/sliders/?page=${page}&pageSize=${pageSize}`, fetcher)
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
   axios.post(`${endpoint}`, Data , {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
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