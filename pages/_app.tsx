import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Router, { useRouter } from 'next/router';
import { RecoilRoot, useRecoilState } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/globals.css';
import Fonts from '../font';
import { getCookie, setCookie } from '../src/services/cookies_file';
import { useEffect, useRef, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { ProgressBar } from 'primereact/progressbar';
import { appWithTranslation } from 'next-i18next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page:  ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
Component: NextPageWithLayout};


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page)
	const [session, setSession] = useState('ar');
	const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
	useEffect(() => {
		// let temp = getCookie('language');
		// if(temp!=undefined){
		// 	router.locale=temp;
			
		// };
		
		Router.events.on("routeChangeStart", (url)=>{
			setIsLoading(true)
		  });
	  
		  Router.events.on("routeChangeComplete", (url)=>{
			setIsLoading(false)
		  });
	  
		  Router.events.on("routeChangeError", (url) =>{
			setIsLoading(false)
			
		  });
	});


	return (
		<RecoilRoot>
			<ChakraProvider theme={theme}>
				<Fonts />
				
					<Head>
						<link rel='icon' href='/favicon.ico' />
						<title>ADHD</title>
						<meta charSet='utf-8' />
						<meta
							name='viewport'
							content='initial-scale=1.0, width=device-width'
						/>
						<meta
							name='description'
							content='Web site created using create-next-app'
						/>
						<meta name='theme-color' content='#000000' />
					</Head>
					{isLoading &&<ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>}
					{getLayout (  <Component {...pageProps}  />
					
					)}
				
				
			</ChakraProvider>
		</RecoilRoot>
	);
}

export default appWithTranslation(MyApp) 