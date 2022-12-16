import {ReactElement, useEffect, useState} from 'react'
import { Flex, Skeleton, Spinner} from '@chakra-ui/react'
import AppBar from "./appbar";
import FooterBar from "./footer";
import { useLoadingProgress} from './LoadingProgressContext ';
import {Router} from "next/router";

type Props = {
    children: ReactElement | ReactElement[]
}

function Layout ({children, ...props}: Props)  {
    const {start, done} = useLoadingProgress()
    const [isOn, setOn] = useState(true)
    // const [loaded] = useRecoilState(myLoaderState);
    const onRouteChangeStart = () => {
        start()
    }

    const onRouteChangeComplete = () => {
        setTimeout(() => {
            done()
        }, 1)
    }


    useEffect(() => {
        setOn(false)
        Router.events.on('routeChangeStart', onRouteChangeStart)
        Router.events.on('routeChangeComplete', onRouteChangeComplete)
        Router.events.on('routeChangeError', onRouteChangeComplete)

        return () => {
            Router.events.off('routeChangeStart', onRouteChangeStart)
            Router.events.off('routeChangeComplete', onRouteChangeComplete)
            Router.events.off('routeChangeError', onRouteChangeComplete)
        }

    }, [])
    return (

        <Flex direction="column" maxW={{xl: '1700px'}} pt={0} pr={"3px"} pl={"3px"}  backgroundImage="url(assets/images/Path_1.svg)"   {...props}>
            <Skeleton startColor='brand.blueLight' endColor='brand.textBlue' isLoaded={!isOn}>
                <AppBar/>
               <main>{children}</main> 
                <FooterBar/>
            </Skeleton>

        </Flex>
    )
}

export default Layout