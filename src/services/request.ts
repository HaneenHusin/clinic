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


      export function RequestForm(
        endpoint: string,
        FormData:FormData,
        method:string
      ) {
      
        axios({
          method: method,
          url: endpoint,
          data: FormData,
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          console.log(res);
      })
      .catch((err) => {
          console.log(err);
      });
      }