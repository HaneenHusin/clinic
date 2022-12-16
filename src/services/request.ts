import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useRecoilState} from "recoil";
import {myDataState} from "../../Atoms/responseAtom";
import {myLoaderState} from "../../Atoms/loadingAtom";
import {myErrorState} from "../../Atoms/errorAtom";
import ErrorResponse from "../components/error";

// export const useAxios = (url:string, method:string, payload:any) => {
//     const [data, setData] = useRecoilState(myDataState);
//     const [error, setError] = useRecoilState(myErrorState);
//     const [loaded,setLoaded] = useRecoilState(myLoaderState);
//     const controllerRef = useRef(new AbortController());
//     const cancel = () => {
//         controllerRef.current.abort();
//     };

//     useEffect(() => {
//         (async () => {
//             try {
//                 const response = await axios.request({
//                     data: payload,
//                     signal: controllerRef.current.signal,
//                     method,
//                     url,
//                 });

//                 setData(response.data);
//             } catch (error) {
//               setError(error.message);
//             } finally {
//               setLoaded(true);
//             }
//           })();
//         }, []);
      
//         return { cancel, data, error, loaded };
//       };

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
       const [data, setData] = useRecoilState(myDataState); 
       const [loaded,setLoaded] = useRecoilState(myLoaderState);
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