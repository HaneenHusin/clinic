import {ReactElement, useEffect, useState} from 'react'
import { Flex, Skeleton} from '@chakra-ui/react'
import FooterBar from "./footer";
import { Router } from 'next/router';
import { myDirectionState } from '../../Atoms/localAtoms';
import { useRecoilState } from 'recoil';
import { AppBar } from './appbar';

type Props = {
    children: ReactElement | ReactElement[]
}
function Layout ({children, ...props}: Props)  {
    
    const [dirState, setDirState] = useRecoilState(myDirectionState);
    const [isLoading, setIsLoading] = useState(false);
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
        <Flex direction="column" dir={dirState} maxW={{xl: '1700px'}}   backgroundImage="url(/assets/images/Path_1.svg)"   {...props}>
            <Skeleton startColor='brand.blueLight' endColor='brand.textBlue' isLoaded={!isLoading}>
                <AppBar/>
               <main>{children}</main> 
                <FooterBar/>
            </Skeleton>
        </Flex>
    )
}

export default Layout