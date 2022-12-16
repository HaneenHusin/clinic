import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import exp from "constants";
import useSWR from "swr";
import { Alert, AlertDescription, AlertIcon, AlertTitle, createStandaloneToast, useToast } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { myDataState } from '../Atoms/responseAtom';
import { useEffect, useRef } from 'react';
import { myLoaderState } from '../Atoms/loadingAtom';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { ToastErrorShow, ToastSuccessShow } from './toast';
import { ArticleList } from '../src/types/article_list';


axios.defaults.baseURL = "https://adhd.nasayimhalab.net/api";
axios.defaults.withCredentials = true;

const fetcher = (url:string) => axios.get(url).then(res => res.data)





export function home(){
    const { data, error } = useSWR(`/home/`, fetcher)
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

export function cities(){
    const { data, error } = useSWR(`/cities/`, fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function services(){
    const { data, error } = useSWR(`/services/`, fetcher)
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