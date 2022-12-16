import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IntlProvider } from "react-intl";
import Head from "next/head";
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import {useRouter} from "next/router";
import {RecoilRoot} from "recoil";
import AppBar from "../src/components/appbar";
import {ChakraProvider} from '@chakra-ui/react';
import theme from "../theme";
import FooterBar from "../src/components/footer";
import CopyRightDiv from "../src/components/copy_right_part";
import '../styles/globals.css'
import Fonts from "../font";
import {getCookie} from "../src/services/cookies_file";
import {useEffect, useState} from "react";
import { LoadingProgressProvider } from '../src/components/LoadingProgressContext ';
import ar from '../public/lang/ar';
import en from '../public/lang/en';
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const messages = {
  ar,
  en,
};
function getDirection(locale:string) {
    if (locale === "ar") {
        return "rtl";
    }

    return "ltr";
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const [session, setSession] = useState("ar");
    useEffect(() => {
      debugger
      let temp=getCookie("language")
       setSession(temp);
        console.log("session... "+session)
    }, [session]);

  return (

      <RecoilRoot>
          <ChakraProvider theme={theme}>
              <Fonts />

          <IntlProvider  locale={session} messages={messages[session]}  >
            <Head>
              <link rel="icon" href="/favicon.ico" />
              <title>React App</title>
              <meta charSet="utf-8" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta name="description" content="Web site created using create-next-app" />
              <meta name="theme-color" content="#000000" />
            </Head>
              {/* <LoadingProgressProvider>
              <Layout> */}
              getLayout( <Component {...pageProps} dir={getDirection(session)} />)
           
              {/* </Layout>
              </LoadingProgressProvider> */}
          </IntlProvider>
          </ChakraProvider>
      </RecoilRoot>

  );
}

export default MyApp
