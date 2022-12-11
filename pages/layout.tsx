import {ReactElement, useEffect, useState} from 'react'
import {Flex, Skeleton} from '@chakra-ui/react'
import AppBar from "../src/components/appbar";
import FooterBar from "../src/components/footer";
import {LoadingProgressProvider, useLoadingProgress} from '../src/components/LoadingProgressContext ';
import {Router} from "next/router";
import {useRecoilState} from "recoil";
import {myLoaderState} from "../Atoms/loadingAtom";

type Props = {
    children: ReactElement | ReactElement[]
}

const Layout = ({children, ...props}: Props) => {
    const { start, done } = useLoadingProgress()
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

        <Flex direction="column" maxW={{xl: '1700px'}} m="0 auto" pl={1} pr={1} pt={1} {...props}>
            <Skeleton   isLoaded={!isOn}>
            <AppBar/>
            {children}
            <FooterBar/>
            </Skeleton>
        </Flex>
    )
}

export default Layout