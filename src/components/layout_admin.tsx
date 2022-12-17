import {ReactElement, useEffect, useState} from 'react'
import { Flex, Skeleton, Spinner} from '@chakra-ui/react'
import { AppBarAdmin } from './appbar';
import { Router, useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { myDirectionState } from '../../Atoms/localAtoms';

type Props = {
    children: ReactElement | ReactElement[]
}

function LayoutAdmin ({children, ...props}: Props)  {
    const [dirState, setDirState] = useRecoilState(myDirectionState);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
      useEffect(() => {
          Router.events.on("routeChangeStart", (url)=>{
              setIsLoading(true)
            });
        
            Router.events.on("routeChangeComplete", (url)=>{
              setIsLoading(false)
            });
        
            Router.events.on("routeChangeError", (url) =>{
              setIsLoading(false)
              
            });
      },  [Router]);
    return (
        <Flex direction="column" dir={dirState} maxW={{xl: '1700px'}} backgroundImage="url(assets/images/Path_2.svg)"   {...props}>
            <Skeleton startColor='brand.blueLight' endColor='brand.textBlue' isLoaded={!isLoading}>
                <AppBarAdmin/>
               <main>{children}</main> 
            </Skeleton>
         

        </Flex>
    )
}

export default LayoutAdmin