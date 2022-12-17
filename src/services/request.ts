import {useEffect, useRef, useState} from "react";
import axios from "axios";


export function signin(username:string, password:string, onSuccess:Function){

  const dataToBeFedToFootballersAPI = {
      username: username,
      password: password,
  }
  axios.post(`/signin/`, dataToBeFedToFootballersAPI)
      .then((response) => {
          console.log(response.data);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.access}`
          onSuccess(response.data.data)
          // toast("nice work")
      })
      .catch(error => {
          toast("try again man, it must be the weather")
          console.log(error)
      })
}


      export function AllRequest(
        endpoint: string,
        Data:any,
        onSuccess:Function
      ) {
       const controllerRef = useRef(new AbortController());
       axios.post(`${endpoint}`, Data)
       .then((response) => {
           console.log(response.data);
           axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.access}`
           onSuccess(response.data.data)
           // toast("nice work")
       })
       .catch(error => {
           toast("try again man, it must be the weather")
           console.log(error)
       })
      //  axios({
      //     method: method,
      //     url: endpoint,
      //     data: Data,
      //     signal: controllerRef.current.signal,
      //     headers: { 'Content-Type': 'multipart/form-data' },
      //   })
      //   .then((res) => {
      //     setLoaded(true)
      //     setData(res.data)
      //     setError({...error,isError:false})
      //     console.log(res);
      //     setLoaded(false)
      // })
      // .catch((err) => {
      //   setError({...error,message: err.message})
      //   setError({...error,isError:true})
      //     console.log(err);
      // });
      }