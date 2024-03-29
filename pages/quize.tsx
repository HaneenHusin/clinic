/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef, ReactElement } from 'react';
import { Image } from 'primereact/image';
import { useRecoilState } from 'recoil';
import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Button,
	CardBody,
	Center,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	Stack,
	Text,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { myProgressState } from '../Atoms/progressAtom';
import { Card } from '@chakra-ui/card';
import { ProgressBar } from 'primereact/progressbar';
import { NextPageWithLayout } from './_app';
import LayoutWithoutBar from '../src/components/layout_without_bar';
import { quizeclient } from '../src/services/api';
import { myStepsResultState } from '../Atoms/stepsResultAtom';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import router from 'next/router';
import { useTranslation } from 'next-i18next';

const quize: NextPageWithLayout = () => {
	const quizeResponse = quizeclient(1, 10);
	const toast = useRef(null);
	const [textResult, setTextResult] = useState('');
	const [indexState, setindexState] = useState(0);
	const [disableButton, setDisableButton] = useState(false);
	const [resultState, setResultState] = useRecoilState(myStepsResultState);
	const [progressState, setProgressState] = useRecoilState(myProgressState);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { t } = useTranslation('common')
	let result;
	async function refresh() {
		onClose();
		setProgressState(0);
		await router.push( '/quize','/quize',  { shallow: true } );
		
	}
	function activeSteps(val: number, point: number) {
		setindexState(indexState + 1);
		setResultState(resultState + point);
		setProgressState(progressState + val);
		if (progressState == 90) {
			setDisableButton(true);
			{
				result = quizeResponse.data?.data?.results[0]?.results_list.find(
					(obj: any) => {
						return obj.min_point <= resultState && obj.max_point >= resultState;
					}
				);
			}
			setTextResult(result?.text || '');
			
		}
	}
	return (
		<Stack
			backgroundImage="url(/assets/images/Path_1.svg)"  
		>
			{quizeResponse.isLoading ? (
				<div id='globalLoader'>
					<Image
						src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
						alt=''
					/>
				</div>
			) : (
				<Box>
					<Box
						width={'full'}
						px={'6'}
						h={'14%'}
						bg={'brand.white'}
						boxShadow={'xl'}
						border={'1px'}
						borderColor={'brand.dark'}
					>
						<HStack display={'flex'} justify={'space-between'}>
							<Image
								src={'/assets/images/LOGO.svg'}
								alt=''
								height={{ base: '10px', md: '60px' }}
							/>
							<Text color='brand.blue'>ADHD Center</Text>
							<Breadcrumb fontWeight='medium' fontSize='sm'>
								<BreadcrumbItem>
									<BreadcrumbLink href='#'>
										<Text
											fontSize={['sm', 'sm', 'md', 'lg']}
											fontWeight={'bold'}
											color={'brand.textGray'}
										>
											{t('quizes')} 
										</Text>
									</BreadcrumbLink>
								</BreadcrumbItem>

								<BreadcrumbItem>
									<Link href='./' shallow={true}>
										<Text
											fontSize={['sm', 'sm', 'md', 'lg']}
											fontWeight={'bold'}
											textDecoration={'underline'}
											color={'brand.textGray'}
										>
										{t('home')}
												
										</Text>
									</Link>
								</BreadcrumbItem>
							</Breadcrumb>
						</HStack>
					</Box>
					<VStack>
						<Image src={'/assets/images/quize.png'}  alt=''></Image>

						<Card
							w={{ base: 'full', md: '70%' }}
							bg={'brand.white'}
							border={'2px'}
							borderColor={'brand.gray'}
							rounded={'xl'}
							boxShadow={'xl'}
							
						>
							<CardBody>
								<Text
									fontSize={['sm', 'md', 'lg', 'xl']}
									fontWeight={'normal'}
									color={'brand.blue'}
								>
									{quizeResponse.data?.data?.results[0]?.title}
								</Text>
								<Center>
								{!disableButton ?<Card
										w={['50%', '90%', '70%']}
										p={'4%'}
										bg={'brand.white'}
										rounded={'full'}
										border={'2px'}
										borderColor={'brand.gray'}
										align='center'
										justify='center'
									>
										<Text
											width={'full'}
											fontSize={['sm', 'md', 'lg', 'xl']}
											fontWeight={'normal'}
											color={'brand.blue'}
										>
											{
												quizeResponse.data?.data?.results[0]?.questions_list[
													indexState
												]?.text
											}
										</Text>
									</Card>
									:<></>}
								</Center>

								<Stack mt='6' spacing='3'>
									<HStack
										width={'full'}
										spacing={2}
										align='center'
										justify='center'
									>
										<SimpleGrid columns={2} spacingX='40px' spacingY='20px'>
										{quizeResponse.data?.data?.results[0]?.questions_list[
											indexState
										]?.answers_list.map((item: any, index: number) => (
											
											<Card
												key={item.id}
												p={'3'}
												h="70"
												rounded={'xl'}
												border={'2px'}
												borderColor={'brand.blue'}
												cursor={'pointer'}
												align='center'
												justify='center'
												onClick={() =>
													activeSteps(
														100 /
															(quizeResponse.data?.data?.results[0]
																?.questions_list.length ?? 1),
														item.points
													)
												}
											>
												
												<Text
													fontSize={['xs', 'md', 'lg', 'xl']}
													fontWeight={'normal'}
													color={'brand.blue'}
													flexWrap='wrap'
												> 
													{item.text}
												</Text>
											</Card>
											
										))}
										</SimpleGrid>
									</HStack>
									<Center>
										<Button
											variant='outline'
											disabled={!disableButton}
											width={'50%'}
											onClick={onOpen}
										>
											<Text
												fontSize={['sm', 'md', 'lg', 'xl']}
												fontWeight={'normal'}
											>
												{t('show_result')} 
											</Text>
										</Button>
									</Center>
								</Stack>
							</CardBody>
						</Card>
					</VStack>
					<ProgressBar
						showValue={false}
						value={progressState}
						colorScheme='brand.blue'
					/>
					<Modal isOpen={isOpen} onClose={()=>refresh()} size={'full'} >
						<ModalOverlay />
						<ModalContent 	bg={'brand.blueLight'} >
							<ModalCloseButton />
							<ModalBody>
								<Box textAlign='center' py={10} px={6}>
									<CheckCircleIcon boxSize={'50px'} color={'green.500'} />
									<Heading as='h2' size='xl' mt={6} mb={2}>
									{t('ended_result')}
									</Heading>
									<Center mt={'8'}>
										<Card
											w={['100px', '400px', '600px']}
											bg={'brand.white'}
											rounded={'2xl'}
											border={'2px'}
											borderColor={'brand.gray'}
											h="100"
											justifyContent={"center"}
											align={"center"}
										>
											<Text
											fontSize={['xs', 'sm', 'lg', 'xl']}
												textColor={'brand.blue'}
												fontWeight={"bold"}
											>
												{textResult}
											</Text>
										</Card>
									</Center>

									<Text mt={'8'} color={'gray.500'}>
									{t('please_contact')}
									</Text>
								</Box>
							</ModalBody>
						</ModalContent>
					</Modal>
				</Box>
			)}
		</Stack>
	);
};

quize.getLayout = function getLayout(page: ReactElement) {
	return <LayoutWithoutBar>{page}</LayoutWithoutBar>;
};

export const getStaticProps = async ({ locale}:{ locale:string }) => ({
	props: {
	  ...(await serverSideTranslations(locale, ["common"])),
	}
  })
export default quize;
