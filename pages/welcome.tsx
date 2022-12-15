import { useRecoilState } from 'recoil';
import { Card, CardBody, CardHeader } from '@chakra-ui/card';
import {
	Box,
	Center,
	Flex,
	Heading,
	HStack,
	Stack,
	Text,
	VStack,
	Image,
	Skeleton,
	chakra,
	Spinner,
	SkeletonText,
} from '@chakra-ui/react';
import { galleriaService } from '../src/services/Photos';
import { FormattedMessage } from 'react-intl';
import CardWithDivider_part from '../src/components/card-with-divider_part';
import Certificates from '../src/components/certificate_part';
import CommentPart from '../src/components/comment_part';
import CustomCarousel from '../src/components/carousel';
import CustomGalleria from '../src/components/galleria';
import TestCard from '../src/components/test_card_part';
import VideoPart from '../src/components/video_part';
import React, { useState } from 'react';
import { myAdminAppBarState, myLayoutState } from '../Atoms/layout';
import { getCookie } from '../src/services/lang_cookies';
import { myDirectionState, myLocalState } from '../Atoms/localAtoms';
import { useAxios } from '../src/services/request';
import { LoginRequest, LoginResponse } from '../src/types/login_Model';
import { storeResponse } from '../src/types/test_responsr';
import { myLoaderState } from '../Atoms/loadingAtom';

export default function Welcome() {
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
	const [headerFooterState, setHeaderFooterState] =
		useRecoilState(myLayoutState);
	const [localState, setLocalState] = useRecoilState(myLocalState);
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const [adminAppBarState, setAdminAppBarState] =
		useRecoilState(myAdminAppBarState);
	// const { data, error, loaded } = useAxios(
	//     SERVICE_API_URL,
	//     "Get",

	//     ""

	// );

	useState(async () => {
		setHeaderFooterState({
			...headerFooterState,
			footer: 'block',
			appBar: 'block',
		});
		setAdminAppBarState(false);
		setLocalState(getCookie('language'));
		setDirState(localState == 'ar' ? 'rtl' : 'ltr');
		console.log("welcome dirr " + dirState)
		console.log("welcome localState " + localState)
	});

	return (
		// <Skeleton  fadeDuration={3} isLoaded={loaded}>
		<div dir={dirState}>
			<CustomGalleria />
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
							src={'assets/images/test1.png'}
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
							src={'assets/images/test2.png'}
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
						<CardWithDivider_part />
					</Box>
					<Box pt={'10%'} w={{ base: '50%', md: '60%', lg: '50%' }}>
						<VideoPart />
					</Box>
					<Flex pt={'10%'} align='center' justify='center' w={'80%'}>
						<Certificates certificateCount={galleriaService} />
					</Flex>
					<Flex pt={'5%'} align='center' justify='center' w={'100%'}>
						<chakra.path
							d='M96.086 48.095h2.812l.399-11.824h-3.61l.399 11.824zM98.863 50.45c-.344-.335-.8-.503-1.371-.503-.563 0-1.02.171-1.371.515-.344.336-.516.762-.516 1.278 0 .515.172.941.516 1.277.352.336.809.504 1.371.504.57 0 1.027-.168 1.371-.504.352-.336.527-.762.527-1.277 0-.524-.175-.954-.527-1.29z'
							fill='#00075102'
						/>
						<CommentPart />
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
							<CustomCarousel template='relatedNews' />
						</VStack>
					</Flex>
				</VStack>
			</Center>
		</div>
		// </Skeleton>
	);
}
