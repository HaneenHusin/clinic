import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Flex,
	HStack,
	Text,
	Box,
	VStack,
	Button,
	Image,
	Spacer,
	Stack,
	IconButton,
	useDisclosure,
	Input,
	Textarea,
	Card,
	CardBody,
	SimpleGrid,
	Tooltip,
	FormLabel,
	AccordionIcon,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	Accordion,
	ModalCloseButton,
} from '@chakra-ui/react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import React, { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import LayoutAdmin from '../../src/components/layout_admin';
import {
	certificateList,
	DeleteRequest,
	PostRequest,
	UpdateRequest,
} from '../../src/services/api';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import { useRecoilState } from 'recoil';
import router from 'next/router';
import { myImagesState } from '../../Atoms/imagesAtom';
import Gridphotot from '../../src/components/grid_photo';
import { mutate } from 'swr';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CertificatesAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isEdit, setIsEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	const certificateResponse = certificateList(pageNum, -1);
	const [imageState, setimageState] = useRecoilState(myImagesState);
	const [isImageModal, setIsImageModal] = useState(false);
	const { t } = useTranslation('common');
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

	const onBasicPageChange = (event) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		setPageNum(event.page + 1);
	};

	 function refresh(response: any) {
		onClose();
		mutate(`/admin/certificates/?page=${pageNum}&pageSize=${-1}`)
		onDeleteClose();
	}
	function openModal() {
		onOpen();
		setIsEdit(true);
		setIsImageModal(true);
	}
	function openEditModal(indexValue: number, idValue: number) {
		onOpen();
		setIsEdit(false);
		setIndex(indexValue);
		setId(idValue);
	}
	function openDeleteModal(indexValue: number, idValue: number) {
		onDeleteOpen();
		setIndex(indexValue);
		setId(idValue);
	  }
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
	return (
		<Stack p={'10px'} margin={'2%'}>
			{certificateResponse.isLoading == true ? (
				<div id='globalLoader'>
					<Image
						src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
						alt=''
					/>
				</div>
			) : (
				<></>
			)}
			<HStack justify={'space-between'} m={'10px'}>
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
				{t('certificate')} 
				</Text>
				<Button
					variant='outline'
					colorScheme='brand'
					onClick={openModal}
					fontSize={['sm', 'md', 'lg', 'xl']}
				>
					<i
						className='pi pi-plus'
						style={{ fontSize: '1em', marginRight: '12px', marginLeft: '12px' }}
					></i>
					{t('import')}
				</Button>
			</HStack>
			<TableContainer w={'full'}>
				<Table
					variant='striped'
					border={'1px'}
					colorScheme={'gray'}
					borderColor={'brand.dark'}
					size={{ base: 'xs', md: 'md', lg: 'lg' }}
				>
					<TableCaption>ADHD CENTER</TableCaption>
					<Thead>
						<Tr>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
							{t('images')} 
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
							{t('title')} 
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								{t('text')} 
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{certificateResponse.data?.data.results.map(
							(item: any, index: number) => (
								<Tr key={item.title}>
									<Td w={'15%'} h={'15%'}>
										<Image
											src={item.photo_model.datafile}
											onError={(e) =>
												(e.target.src =
													'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
											}
											alt={''}
											width={item.photo_model.width}
											height={'20%'}
											style={{ display: 'block' }}
										/>
									</Td>
									<Tooltip label={item.title}>
										<Td
											fontSize={['sm', 'md', 'lg', 'xl']}
											maxWidth={'100px'}
											textOverflow={'ellipsis'}
											overflow={'hidden'}
											whiteSpace={'nowrap'}
										>
											{item.title}
										</Td>
									</Tooltip>

									<Tooltip label={item.text}>
										<Td
											fontSize={['sm', 'md', 'lg', 'xl']}
											maxWidth={'100px'}
											textOverflow={'ellipsis'}
											overflow={'hidden'}
											whiteSpace={'nowrap'}
										>
											{item.text}
										</Td>
									</Tooltip>
									<Td>
										<IconButton
											aria-label={'edit'}
											onClick={() => openEditModal(index, item.id)}
											icon={
												<i
													className='pi pi-pencil'
													style={{ fontSize: '1em', color: 'green' }}
												></i>
											}
										></IconButton>
									</Td>
									<Td>
									<IconButton
										aria-label={'delete'}
										onClick= { () => openDeleteModal(index, item.id) }
										icon={
											<i
												className='pi pi-trash'
												style={{ fontSize: '1em', color: 'red' }}
											></i>
										}
									></IconButton>

									<Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
										<ModalOverlay />
										<ModalContent >
										<ModalHeader>{t('delete_item')}</ModalHeader>
											<ModalCloseButton />
											<ModalBody>
											{t('delete_confirm')} 
											
											</ModalBody>
											<ModalFooter>
												<Button variant='ghost' mr={3} onClick={onDeleteClose}>
												{t('cancel')} 
												</Button>
												<Button
													colorScheme='red'
													onClick={() => {
														onDeleteClose();
														DeleteRequest(
															`/admin/certificates/${id}/`,
															refresh
														)
													}}
												>
												{t('delete')} 
												</Button>
											</ModalFooter>
										</ModalContent>
									</Modal>
										
									</Td>
								</Tr>
							)
						)}
					</Tbody>
				</Table>
			</TableContainer>

			{isEdit == true ? (
				<Modal isOpen={isOpen} onClose={onClose} size={'5xl'}>
					<ModalOverlay />
					<ModalContent >
						<ModalHeader>
						{t('add_certificate')} 
						</ModalHeader>
						<Formik
							initialValues={{ title: '', text: '', photo: '' }}
							validate={(values) => {
								const errors = {};
								if (!values.title) {
									errors.title = (
										t('required')
											
									);
								}

								if (!values.text) {
									errors.text = (
										t('required')
											
									);
								}

								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {

									const dataToRequestAPI = {
										title: values.title,
										text: values.text,
										photo: imageState,
									};
									PostRequest(
										'/admin/certificates/',
										dataToRequestAPI,
										refresh
									);
									setimageState('');
									setSubmitting(false);
								}, 400);
							}}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
							}) => (
								<form onSubmit={handleSubmit}>
									<ModalBody>
										<Stack spacing={3}>
											<FormLabel>
											{t('title')} 
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='title'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.title}
											/>
											<Text color={'red'}>
												{errors.title && touched.title && errors.title}
											</Text>
											<FormLabel>
											{t('text')} 
											</FormLabel>
											<Textarea
												onChange={handleChange}
												name='text'
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.text}
											/>
											<Text color={'red'}>
												{errors.text && touched.text && errors.text}
											</Text>
											<Accordion defaultIndex={[1]} allowMultiple>
												<AccordionItem>
													<h2>
														<AccordionButton
															_expanded={{
																bg: 'brand.blue',
																color: 'white',
																fontsize: 'lg',
															}}
														>
															<Box as='span' flex='1' textAlign='left'>
																<FormLabel>
																{t('choose_file')}
																</FormLabel>
															</Box>
															<AccordionIcon />
														</AccordionButton>
													</h2>
													<AccordionPanel pb={4}>
														<Gridphotot isMulti={false}></Gridphotot>
													</AccordionPanel>
												</AccordionItem>
											</Accordion>
											)
										</Stack>
									</ModalBody>

									<ModalFooter>
										<Button variant='outline' mr={3} ml={3} onClick={onClose}>
										{t('close')} 
										</Button>
										<Button
											variant='primary'
											type='submit'
											disabled={isSubmitting}
										>
											
											{t('upload')}
											
										</Button>
									</ModalFooter>
								</form>
							)}
						</Formik>
					</ModalContent>
				</Modal>
			) : (
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
						{t('edit_certificate')}
						</ModalHeader>
						<Formik
							initialValues={{
								title: certificateResponse.data?.data?.results[index]?.title,
								text: certificateResponse.data?.data?.results[index]?.text,
								photo:  '',
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									const dataToRequestAPI = {
										title: values.title,
										text: values.text,
										photo: imageState==''?certificateResponse.data?.data?.results[index]?.photo:imageState,
									};
									UpdateRequest(
										`/admin/certificates/${id}/`,
										dataToRequestAPI,
										refresh
									);
									
									setSubmitting(false);
								}, 400);
							}}
						>
							{({
								values,
								errors,
								touched,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
							}) => (
								<form onSubmit={handleSubmit}>
									<ModalBody>
										<Stack spacing={3}>
											<FormLabel>
											{t('title')}
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='title'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.title}
											/>
											<Text color={'red'}>
												{errors.title && touched.title && errors.title}
											</Text>
											<FormLabel>
											{t('text')} 
											</FormLabel>
											<Textarea
												onChange={handleChange}
												name='text'
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.text}
											/>
											<Text color={'red'}>
												{errors.text && touched.text && errors.text}
											</Text>
											<Accordion defaultIndex={[1]} allowMultiple>
												<AccordionItem>
													<h2>
														<AccordionButton
															_expanded={{
																bg: 'brand.blue',
																color: 'white',
																fontsize: 'lg',
															}}
														>
															<Box as='span' flex='1' textAlign='left'>
																<FormLabel>
																{t('choose_file')}
																</FormLabel>
															</Box>
															<AccordionIcon />
														</AccordionButton>
													</h2>
													<AccordionPanel pb={4}>
														<Gridphotot isMulti={false}></Gridphotot>
													</AccordionPanel>
												</AccordionItem>
											</Accordion>
											)
										</Stack>
									</ModalBody>

									<ModalFooter>
										<Button variant='outline' mr={3} ml={3} onClick={onClose}>
										{t('close')} 
										</Button>
										<Button
											variant='primary'
											type='submit'
											disabled={isSubmitting}
										>
										{t('edit')}
										</Button>
									</ModalFooter>
								</form>
							)}
						</Formik>
					</ModalContent>
				</Modal>
			)}
			{/* <Paginator
				p-paginator-page
				first={basicFirst}
				rows={basicRows}
				totalRecords={certificateResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator> */}
		</Stack>
	);
};

CertificatesAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export const getStaticProps = async ({ locale}:{ locale:string }) => ({
	props: {
	  ...(await serverSideTranslations(locale, ["common"])),
	}
  })
export default CertificatesAdmin;
const itemGalleryTemplate = (item) => {
	return (
		<Card
			bg={'brand.white'}
			w={'full'}
			align='center'
			justify='center'
			m={'3px'}
			boxShadow={'l'}
			rounded={'xl'}
			border={'2px'}
			borderColor={'brand.blue'}
		>
			<CardBody>
				<Image
					src={item.photo_model.datafile}
					onError={(e) =>
						(e.target.src =
							'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
					}
					alt={''}
					width={item.photo_model.width}
					style={{ display: 'block' }}
				/>
			</CardBody>
		</Card>
	);
};
