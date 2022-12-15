import {ReactElement, useEffect, useState} from 'react'
import { Flex, Skeleton, Spinner} from '@chakra-ui/react'
import AppBar from "../src/components/appbar";
import FooterBar from "../src/components/footer";
import { useLoadingProgress} from '../src/components/LoadingProgressContext ';
import {Router} from "next/router";

type Props = {
    children: ReactElement | ReactElement[]
}

const Layout = ({children, ...props}: Props) => {
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

        <Flex direction="column" maxW={{xl: '1700px'}} pt={0}  backgroundImage="url(assets/images/Path_1.svg)"   {...props}>
            <Skeleton startColor='brand.blueLight' endColor='brand.textBlue' isLoaded={!isOn}>
                <AppBar/>
                {children}
                <FooterBar/>
            </Skeleton>

        </Flex>
    )
}

export default Layout