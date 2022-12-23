import React, { useState, useRef, ReactElement } from 'react';
import { Image } from 'primereact/image';
import { useRecoilState } from 'recoil';
import {
	Box,
	Button,
	CardBody,
	Center,
	Flex,
	Heading,
	HStack,
	Stack,
	Text,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { Carousel } from 'primereact/carousel';
import { galleriaService } from '../src/services/Photos';
import { myProgressState } from '../Atoms/progressAtom';
import { Card } from '@chakra-ui/card';
import { FormattedMessage } from 'react-intl';
import { ProgressBar } from 'primereact/progressbar';
import StepsEnd from './result';
import { NextPageWithLayout } from './_app';
import LayoutWithoutBar from '../src/components/layout_without_bar';
import router, { useRouter } from 'next/router';
import { quizeclient } from '../src/services/api';
import { Steps } from 'primereact/steps';
import { myDirectionState } from '../Atoms/localAtoms';
import { myStepsResultState } from '../Atoms/stepsResultAtom';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import StepsResult from './result';
import { CheckCircleIcon } from '@chakra-ui/icons';

const quize: NextPageWithLayout = () => {
	const quizeResponse = quizeclient(1, 10);
	const toast = useRef(null);
	const [activeIndex, setActiveIndex] = useState(1);
	const [indexState, setindexState] = useState(0);
	const [resultState, setResultState] = useRecoilState(myStepsResultState);
	const [dirState] = useRecoilState(myDirectionState);
	const [progressState, setProgressState] = useRecoilState(myProgressState);
	const { isOpen, onOpen, onClose } = useDisclosure();

	function activeSteps(val: number, point: number) {
		setindexState(indexState + 1);
		setResultState(resultState + point);
		console.log('point...........' + resultState);
		console.log('progressState...........' + progressState);
		setProgressState(progressState + val);
		if (progressState == 90) {
			console.log('StepsEnd  ' + resultState);
		}
	}
	return (
		<Stack
			dir={dirState}
			w={'full'}
			h={'full'}
			bg={'brand.white'}
			backgroundSize={'cover'}
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
					<VStack>
						<Image src={'/assets/images/Clinic.svg'} alt=''></Image>

						<Card
							w={['50%', '78%', '90%', '70%']}
							bg={'brand.white'}
							border={'2px'}
							borderColor={'brand.gray'}
							rounded={'xl'}
							boxShadow={'xl'}
							dir={dirState}
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
									<Card
										w={['50%', '90%', '70%']}
										p={['2%', '5%', '4%', '2%']}
										bg={'brand.white'}
										rounded={'full'}
										border={'2px'}
										borderColor={'brand.gray'}
									>
										<Text
											width={'full'}
											fontSize={['sm', 'md', 'lg', 'xl']}
											fontWeight={'normal'}
											color={'brand.blue'}
										>
											{
												quizeResponse.data?.data?.results[0]?.questions_list[indexState]?.text
											}
										</Text>
									</Card>
								</Center>

								<Stack mt='6' spacing='3'>
									<HStack
										width={'full'}
										spacing={2}
										align='center'
										justify='center'
									>
										{quizeResponse.data?.data?.results[0]?.questions_list[
											indexState
										]?.answers_list.map((item: any, index: number) => (
											<Button
												key={item.id}
												variant='primary'
												p={'2'}
												h={'50%'}
												onClick={() => activeSteps(10, item.points)}
											>
												<Text
													fontSize={['sm', 'md', 'lg', 'xl']}
													fontWeight={'normal'}
												>
													{item.text}
												</Text>
											</Button>
										))}
									</HStack>
									<Button variant='primary' onClick={onOpen}>
										<Text
											fontSize={['sm', 'md', 'lg', 'xl']}
											fontWeight={'normal'}
										>
											<FormattedMessage id={'sometimes'} />
										</Text>
									</Button>
								</Stack>
							</CardBody>
						</Card>
					</VStack>
					<ProgressBar
						showValue={false}
						value={progressState}
						colorScheme='brand.blue'
					/>
					<Modal isOpen={isOpen} onClose={onClose} size={'full'}>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>
								<FormattedMessage id={'results'}></FormattedMessage>
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Box textAlign='center' py={10} px={6}>
									<CheckCircleIcon boxSize={'50px'} color={'green.500'} />
									<Heading as='h2' size='xl' mt={6} mb={2}>
										<FormattedMessage id={'ended_result'}></FormattedMessage>
									</Heading>
									<Center mt={"8"}>
										<Card
											w={['100px', '400px', '600px']}
											bg={'brand.white'}
											rounded={'2xl'}
											border={'2px'}
											borderColor={'brand.gray'}
										>
											<Text
                                            p={"20"}
												fontSize={'l'}
												textColor={'brand.blue'}
												fontWeight={600}
											>
												<FormattedMessage id={'enter_your_phone'} />
											</Text>
										</Card>
									</Center>

									<Text mt={"8"} color={'gray.500'}>
										<FormattedMessage id={'please_contact'}></FormattedMessage>
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

export default quize;
