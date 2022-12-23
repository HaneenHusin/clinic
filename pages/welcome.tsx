import { useRecoilState } from 'recoil';
import {
	Box,
	Center,
	Flex,
	Text,
	VStack,
	Image,
} from '@chakra-ui/react';
import { galleriaService } from '../src/services/Photos';
import { FormattedMessage } from 'react-intl';
import Certificates from '../src/components/certificate';
import CustomCarousel from '../src/components/carousel';
import TestCard from '../src/components/test_card_part';
import VideoPart from '../src/components/video_part';
import React, { ReactElement, useState } from 'react';
import { getCookie } from '../src/services/cookies_file';
import { myDirectionState, myLocalState } from '../Atoms/localAtoms';
import Layout from '../src/components/layout';
import { NextPageWithLayout } from './_app';
import {  home, quizeClientList } from '../src/services/api';
import Feedback from '../src/components/feedback';
import Sliders from '../src/components/sliders';
import Information from '../src/components/information';
import { myQuizeState } from '../Atoms/quizAtom';


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
	const [localState, setLocalState] = useRecoilState(myLocalState);
	const [dirState, setDirState] = useRecoilState(myDirectionState);

	const homeResponse = home();

	useState(async () => {
		setLocalState(getCookie('language'));
		setDirState(getCookie("dirState"));
		console.log("welcome dirr " + dirState)
		console.log("welcome localState " + localState)
		console.log("homeResponse"+homeResponse.data?.data)
		
	});

	return (
		<Box dir={dirState} pt={"10px"}>
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
						width={{ base: '70%', md: '80%', lg: '100%' }}
						bg={'brand.blueLight'}
					>
						<Text
							fontSize={['sm', 'md', '2xl', '3xl']}
							align='center'
							fontWeight={'normal'}
							color={'brand.textGray'}
							p={'4%'}
						>
							<FormattedMessage id={'first_caption'} />
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
						width={{ base: '70%', md: '80%', lg: '100%' }}
						bg={'brand.blueLight'}
					>
						<Text
							align='center'
							fontSize={['sm', 'md', '2xl', '3xl']}
							fontWeight={'normal'}
							color={'brand.textGray'}
							p={'4%'}
						>
							<FormattedMessage id={'second_caption'} />
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
						w={{ base: '40%', md: '60%', lg: '40%' }}
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
							<FormattedMessage id={'Spend_minutes_caption'} />
						</Text>
					</Flex>
					<TestCard />
					<Box pt={'10%'} w={{ base: '50%', md: '60%', lg: '50%' }}>
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
						<Certificates certificateCount={galleriaService} />
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
								<FormattedMessage id={'related_news'} />
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

export default  Welcome;