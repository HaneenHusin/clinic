
import {
	Box,
	Center,
	Flex,
	Text,
	VStack,
	Image,
} from '@chakra-ui/react';
import Certificates from '../src/components/certificate';
import CustomCarousel from '../src/components/carousel';
import TestCard from '../src/components/test_card_part';
import React, { ReactElement, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../src/components/layout';
import { NextPageWithLayout } from './_app';
import {  home } from '../src/services/api';
import Feedback from '../src/components/feedback';
import Sliders from '../src/components/sliders';
import Information from '../src/components/information';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getCookie } from '../src/services/cookies_file';


const Welcome: NextPageWithLayout = () => {
	const responsiveOptions = [
		{
			breakpoint: '1024px',
			numVisible: 5,
		},
		{
			breakpoint: '768px',
			numVisible: 3,
		},
		{
			breakpoint: '560px',
			numVisible: 1,
		},
	];


	const homeResponse = home();
	const { t } = useTranslation("")
	const router = useRouter()
	useEffect(() => {
		debugger
		// let temp = getCookie('language');
		// if(temp!=undefined){
		// 	router.locale=temp;
			
		// };
		
	  let dir = router.locale == "ar" ? "rtl" : "ltr";
	  let lang = router.locale == "ar" ? "ar" : "en";
	  document.querySelector("html")?.setAttribute("dir", dir);
	  document.querySelector("html")?.setAttribute("lang", lang);
	}, [router.locale]);
  

	return (
		<Box  pt={"10px"}>
			{homeResponse.isLoading == true ? (
				<div id='globalLoader'>
					<Image src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'alt=''
					/>
				</div>
			) : (
				<></>
			)}
				
			<Sliders galleriaService={homeResponse.data?.data.sliders}></Sliders>
			<Center>
				<VStack>
					<VStack
						width={'full' }
						bg={'brand.blueLight'}
					>
						<Text
							fontSize={['sm', 'md', '2xl', '3xl']}
							align='center'
							fontWeight={'normal'}
							color={'brand.textGray'}
							p={'4%'}
						>
							{t("first_caption")}  
						</Text>
						<Image
							src={'/assets/images/test1.png'}
							rounded={'lg'}
							onError={(e) =>
								(e.target.src =
									'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
							}
							alt={'no Image'}
							style={{ width: '100%', display: 'block', height: '25%' }}
						/>
					</VStack>
					<VStack
						width={'full' }
						bg={'brand.blueLight'}
					>
						<Text
							align='center'
							fontSize={['sm', 'md', '2xl', '3xl']}
							fontWeight={'normal'}
							color={'brand.textGray'}
							p={'4%'}
						>
							{t('second_caption')} 
						</Text>
						<Image
							src={'/assets/images/test2.png'}
							rounded={'lg'}
							onError={(e) =>
								(e.target.src =
									'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
							}
							alt={'no Image'}
							style={{ width: '100%', display: 'block' }}
						/>
					</VStack>
					<Flex
						w={{ base: '60%', md: '60%', lg: '40%' }}
						bg={'brand.white'}
						boxShadow={'2xl'}
						rounded={'full'}
						align='center'
						justify='center'
					>
						<Text
							align='center'
							fontSize={['lg', 'xl', '2xl']}
							fontWeight={'normal'}
							color={'brand.blue'}
							p={'3%'}
						>
							{t('Spend_minutes_caption')} 
						</Text>
					</Flex>
					<TestCard />
					<Box pt={'10%'} w={{ base: '70%', md: '60%', lg: '50%' }}>
					{homeResponse.isLoading == true ? (
				<div id='globalLoader'>
					<Image src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'alt=''
					/>
				</div>
			) : (
						<Information info={homeResponse.data?.data?.information}/>
						)}
					</Box>
					
					<Flex pt={'10%'} align='center' justify='center' w={'80%'}>
						<Certificates />
					</Flex>
					<Flex pt={'5%'} align='center' justify='center' w={'100%'}>
						
								{homeResponse.isLoading == true ? (
				<div id='globalLoader'>
					<Image src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'alt=''
					/>
				</div>
			) : (
				<Feedback galleriaService={homeResponse.data?.data?.feedback}></Feedback>
			)}
						
					</Flex>
					<Flex pt={'3%'} pb={'5%'} align='center' justify='center'>
						<VStack>
							<Text
								align='center'
								fontSize={['lg', 'xl', '2xl']}
								fontWeight={'semibold'}
								color={'brand.blue'}
								p={'0.5%'}
							>
								{t('related_news')} 
							</Text>
							{homeResponse.isLoading == true ? (
				<div id='globalLoader'>
					<Image src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'alt=''
					/>
				</div>
			) : (
				<CustomCarousel  template='relatedNews' galleriaService={homeResponse.data?.data.articles} ></CustomCarousel>
					
			)}
				
							</VStack>
					</Flex>
				</VStack>
			</Center>
		</Box>
	);
}
Welcome.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export const getStaticProps = async ({ locale}:{ locale:string }) => ({
	props: {
	  ...(await serverSideTranslations(locale, ["common"])),
	}
  })
export default  Welcome;