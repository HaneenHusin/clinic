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
	Button,
	Image,
	Stack,
	IconButton,
	useDisclosure,
	Textarea,
	Card,
	CardBody,
	SimpleGrid,
	Tooltip,
	FormLabel,
	Accordion,
	AccordionItem,
	AccordionIcon,
	AccordionButton,
	AccordionPanel,
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
	DeleteRequest,
	PostRequest,
	slidersList,
	UpdateRequest,
} from '../../src/services/api';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import { myDirectionState } from '../../Atoms/localAtoms';
import { useRecoilState } from 'recoil';
import router from 'next/router';
import Gridphotot from '../../src/components/grid_photo';
import { myImagesState } from '../../Atoms/imagesAtom';
import { mutate } from 'swr';

const SlidersAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgsSrc, setImgsSrc] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [imageState, setimageState] = useRecoilState(myImagesState);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const [pageNum, setPageNum] = useState(1);
	const slidersResponse = slidersList(pageNum, basicRows);

	const onBasicPageChange = (event) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		setPageNum(event.page + 1);
	};

	async function refresh(response: any) {
		onClose();
		mutate(`/admin/sliders/?page=${pageNum}&pageSize=${basicRows}`)
	}
	function openModal() {
		onOpen();
		setIsEdit(true);
		console.log('articlesResponse' + slidersResponse.data);
	}
	function openEditModal(indexValue: number, idValue: number) {
		console.log('index....' + indexValue);
		onOpen();
		setIsEdit(false);
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
		<Stack p={'10px'} margin={'2%'} dir={dirState}>
			{slidersResponse.isLoading == true ? (
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
					<FormattedMessage id={'slider'} defaultMessage='slider' />
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
					<FormattedMessage id={'import'} defaultMessage='import' />
				</Button>
			</HStack>
			<TableContainer w={'full'}>
				<Table
					variant='striped'
					border={'1px'}
					colorScheme={'gray'}
					size={{ base: 'xs', md: 'md', lg: 'lg' }}
				>
					<TableCaption>ADHD CENTER</TableCaption>
					<Thead>
						<Tr>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'images'} defaultMessage='images' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'text'} defaultMessage='text' />
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{slidersResponse.data?.data.results.map(
							(item: any, index: number) => (
								<Tr key={item.title}>
									<Td w={'15%'} h={'15%'}>
										<Image
											src={item.photo_model.datafile}
											onError={(e) =>
												(e.target.src =
													'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
											}
											alt={item.alt}
											style={{ width: '100%', display: 'block' }}
										/>
									</Td>

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
											onClick={() =>
												DeleteRequest(`/admin/sliders/${item.id}/`, refresh)
											}
											icon={
												<i
													className='pi pi-trash'
													style={{ fontSize: '1em', color: 'red' }}
												></i>
											}
										></IconButton>
									</Td>
								</Tr>
							)
						)}
					</Tbody>
				</Table>
			</TableContainer>

			{isEdit == true ? (
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent dir={dirState}>
						<ModalHeader>
							<FormattedMessage id={'add_slider'} />
						</ModalHeader>
						<Formik
							initialValues={{ text: '', photo: '' }}
							validate={(values) => {
								const errors = {};
								if (!values.text) {
									errors.text = (
										<FormattedMessage
											id={'required'}
											defaultMessage='required'
										/>
									);
								}

								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2));

									const dataToRequestAPI = {
										text: values.text,
										photo: imageState,
									};
									PostRequest('/admin/sliders/', dataToRequestAPI, refresh);
									setSubmitting(false);
									setimageState('');
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
												<FormattedMessage id={'text'} defaultMessage='text' />
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
																	<FormattedMessage
																		id={'choose_file'}
																		defaultMessage='choose file'
																	/>
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
										</Stack>
									</ModalBody>

									<ModalFooter>
										<Button variant='outline' mr={3} ml={3} onClick={onClose}>
											{<FormattedMessage id={'close'} defaultMessage='close' />}
										</Button>
										<Button
											variant='primary'
											type='submit'
											disabled={isSubmitting}
										>
											{
												<FormattedMessage
													id={'upload'}
													defaultMessage='upload'
												/>
											}
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
					<ModalContent dir={dirState}>
						<ModalHeader>
							<FormattedMessage
								id={'edit_slider'}
								defaultMessage='Edit slider'
							/>
						</ModalHeader>
						<Formik
							initialValues={{ text: slidersResponse.data?.data?.results[index]?.text, photo: '' }}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2));

									const dataToRequestAPI = {
										photo:imageState==''? slidersResponse.data?.data?.results[index]?.photo:imageState,
										text:values.text 
									};
									UpdateRequest(
										`/admin/sliders/${id}/`,
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
											<SimpleGrid
												spacing={5}
												columns={[2, 3]}
												templateColumns='repeat(3, 1fr)'
												w='full%'
											>
												{imgsSrc.map((link) => (
													<Image key={index} src={link} />
												))}
											</SimpleGrid>

											<FormLabel>
												<FormattedMessage id={'text'} defaultMessage='text' />
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



											<Accordion defaultIndex={[0]} allowMultiple>
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
																		<FormattedMessage
																			id={'choose_file'}
																			defaultMessage='choose file'
																		/>
																	</FormLabel>
																</Box>
																<AccordionIcon />
															</AccordionButton>
														</h2>
														<AccordionPanel pb={4}>
															<Gridphotot isMulti={false} ></Gridphotot>
														</AccordionPanel>
													</AccordionItem>
												</Accordion>

										</Stack>
									</ModalBody>

									<ModalFooter>
										<Button variant='outline' mr={3} ml={3} onClick={onClose}>
											{<FormattedMessage id={'close'} defaultMessage='close' />}
										</Button>
										<Button
											variant='primary'
											type='submit'
											disabled={isSubmitting}
										>
											{<FormattedMessage id={'edit'} defaultMessage='edit' />}
										</Button>
									</ModalFooter>
								</form>
							)}
						</Formik>
					</ModalContent>
				</Modal>
			)}
			<Paginator
				p-paginator-page
				first={basicFirst}
				rows={basicRows}
				totalRecords={slidersResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator>
		</Stack>
	);
};

SlidersAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default SlidersAdmin;
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
			<CardBody></CardBody>
		</Card>
	);
};
