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
	Accordion,
	AccordionPanel,
	AccordionIcon,
	AccordionItem,
	AccordionButton,
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
import React, { ReactElement, useMemo, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Galleria } from 'primereact/galleria';
import {
	articlesList,
	DeleteRequest,
	PostRequest,
	UpdateRequest,
} from '../../src/services/api';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import LayoutAdmin from '../../src/components/layout_admin';
import { NextPageWithLayout } from '../_app';
import { useRecoilState } from 'recoil';
import { myDirectionState } from '../../Atoms/localAtoms';
import { useRouter } from 'next/router';
import { Dialog } from 'primereact/dialog';
import Gridphotot from '../../src/components/grid_photo';
import { myImagesState } from '../../Atoms/imagesAtom';

const ArticleAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgsSrc, setImgsSrc] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [isImageModal, setIsImageModal] = useState(false);
	const [displayMaximizable, setDisplayMaximizable] = useState(false);
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(1);
	const [basicRows, setBasicRows] = useState(10);
	const articlesResponse = articlesList(basicFirst,basicRows);
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const [imageState, setimageState] = useRecoilState(myImagesState);
	const router = useRouter();
	const onBasicPageChange = (event) => {
		debugger
		setBasicFirst(event.page+1);
		setBasicRows(event.rows);

	};
	
	const onChange = (e) => {
		debugger;
		// for (const file of e.files) {
		// 	const reader = new FileReader();
		// 	reader.readAsDataURL(file);
		// 	reader.onload = () => {
		// 		setImgsSrc((imgs) => [...imgs, file.objectURL]);
		// 		console.log('imgsSrc ' + imgsSrc);
		// 	};
		// 	reader.onerror = () => {
		// 		console.log(reader.error);
		// 	};
		// }
		// get files from event on the input element as an array objectURL
		let files = [...e.files];

		if (files && files.length > 0) {
			const formData = new FormData();
			files?.forEach((file) => {
				formData.append('files', file.objectURL);
				setImgsSrc((imgs) => [...imgs, formData]);
			});
			console.log('files....' + files);
		}
	};
	async function refresh(response: any) {
		onClose();
		router.push('/admin/article', '/admin/article', { shallow: true });
	}
	const renderFooter = (name) => {
		return (
			<div>
				<Button
					label='No'
					icon='pi pi-times'
					onClick={() => onHide(name)}
					className='p-button-text'
				/>
				<Button
					label='Yes'
					icon='pi pi-check'
					onClick={() => onHide(name)}
					autoFocus
				/>
			</div>
		);
	};
	function openModal() {
		onOpen();
		setIsEdit(true);
		setIsImageModal(true);
		console.log('articlesResponse' + articlesResponse.data);
		console.log('index..' + index);
	}
	function openImageModal() {
		onOpen();
		setIsImageModal(true);
		console.log('articlesResponse' + articlesResponse.data);
		console.log('index..' + index);
	}
	function openEditModal(indexValue: number, idValue: number) {
		debugger;
		onOpen();
		setIsEdit(false);
		setIndex(indexValue);
		setId(idValue);
		setImgsSrc((imgs) => [...imgs, []]);
	}
	const dialogFuncMap = {
		displayMaximizable: setDisplayMaximizable,
	};

	const onClick = (name) => {
		dialogFuncMap[`${name}`](true);
	};

	const onHide = (name) => {
		dialogFuncMap[`${name}`](false);
	};
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
		<Stack p={'10px'} dir={dirState} margin={'2%'}>
			{articlesResponse.isLoading == true ? (
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
					<FormattedMessage id={'article'} defaultMessage='article' />
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
					borderColor={'brand.dark'}
					size={{ base: 'xs', md: 'md', lg: 'lg' }}
				>
					<TableCaption>ADHD CENTER</TableCaption>
					<Thead>
						<Tr>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'images'} defaultMessage='images' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'title'} defaultMessage='title' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'sluge'} defaultMessage='sluge' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'body'} defaultMessage='body' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}></Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}></Th>
						</Tr>
					</Thead>
					<Tbody>
						{articlesResponse.data?.data.results.map((item, index) => (
							<Tr key={item.title}>
								<Td w={'15%'} h={'15%'}>
									{' '}
									{/* <Image src={item.itemImageSrc} rounded={'lg'} /> */}
									<Galleria
										value={
											articlesResponse.data?.data.results[index].photos_list
										}
										responsiveOptions={responsiveOptions}
										numVisible={5}
										style={{ maxWidth: '100%' }}
										showThumbnails={false}
										showIndicators
										changeItemOnIndicatorHover
										item={itemGalleryTemplate}
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
								<Tooltip label={item.slug}>
									<Td
										fontSize={['sm', 'md', 'lg', 'xl']}
										maxWidth={'100px'}
										textOverflow={'ellipsis'}
										overflow={'hidden'}
										whiteSpace={'nowrap'}
									>
										{item.slug}
									</Td>
								</Tooltip>
								<Tooltip label={item.body}>
									<Td
										fontSize={['sm', 'md', 'lg', 'xl']}
										maxWidth={'100px'}
										textOverflow={'ellipsis'}
										overflow={'hidden'}
										whiteSpace={'nowrap'}
									>
										{item.body}
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
										aria-label={'edit'}
										onClick={() =>
											DeleteRequest(`/admin/articles/${item.id}/`, refresh)
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
						))}
					</Tbody>
				</Table>
			</TableContainer>

			{isEdit == true ? (
				<Modal isOpen={isOpen} onClose={onClose} size={'5xl'}>
					<ModalOverlay />
					<ModalContent dir={dirState}>
						<ModalHeader>
							{' '}
							<FormattedMessage id={'add_article'} />
						</ModalHeader>
						<Formik
							initialValues={{
								title: '',
								sluge: '',
								body: '',
								photos:  [...imageState],
								key_words: '',
							}}
							validate={(values) => {
								const errors = {};
								if (!values.title) {
									errors.title = (
										<FormattedMessage
											id={'required'}
											defaultMessage='Required'
										/>
									);
								}
								if (!values.sluge) {
									errors.sluge = (
										<FormattedMessage
											id={'required'}
											defaultMessage='required'
										/>
									);
								}
								if (!values.body) {
									errors.body = (
										<FormattedMessage
											id={'required'}
											defaultMessage='required'
										/>
									);
								}
								if (!values.key_words) {
									errors.key_words = (
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
debugger
values.photos=[...values.photos,imageState]
									const dataToRequestAPI = {
										title: values.title,
										slug: values.sluge,
										body: values.body,
										photos:values.photos,
										key_wards: values.key_words,
									};
									PostRequest('/admin/articles/', dataToRequestAPI, refresh);
									setimageState([]);
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
												<FormattedMessage id={'title'} defaultMessage='title' />
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
												<FormattedMessage id={'sluge'} defaultMessage='slug' />
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='sluge'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.sluge}
											/>
											<Text color={'red'}>
												{errors.sluge && touched.sluge && errors.sluge}
											</Text>

											<FormLabel>
												<FormattedMessage
													id={'Key_words'}
													defaultMessage='key words'
												/>
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='key_words'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.key_words}
											/>
											<Text color={'red'}>
												{errors.key_words &&
													touched.key_words &&
													errors.key_words}
											</Text>

											<FormLabel>
												<FormattedMessage id={'body'} defaultMessage='body' />
											</FormLabel>
											<Textarea
												onChange={handleChange}
												name='body'
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.body}
											/>
											<Text color={'red'}>
												{errors.body && touched.body && errors.body}
											</Text>

											{/* <Dialog header="Header" visible={displayMaximizable} Maximizable style={{ width: '50vw' }} footer={renderFooter('Maximizable')} onHide={() => onHide('Maximizable')}>
   <Gridphotot />
</Dialog> */}
											{isImageModal == true ? (
												<Accordion defaultIndex={[1]} allowMultiple>
													<AccordionItem>
														<h2>
															<AccordionButton  _expanded={{ bg: 'brand.blue', color: 'white' ,fontsize:"lg" }}>
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
															<Gridphotot />
														</AccordionPanel>
													</AccordionItem>
												</Accordion>
											) : (
												<></>
											)}

											{/* <div>
									<SimpleGrid
										spacing={5}
										columns={[2, 3]}
										templateColumns='repeat(3, 1fr)'
										w='full%'
									>
										{imgsSrc.map((link) => (
											<Image src={link} />
										))}
									</SimpleGrid>
								</div> */}
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
							{' '}
							<FormattedMessage
								id={'edit_article'}
								defaultMessage='Edit article'
							/>
						</ModalHeader>
						<Formik
							initialValues={{
								title: '',
								sluge: '',
								body: '',
								photos: [],
								key_words: '',
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2));

									const dataToRequestAPI = {
										title:
											values.title == ''
												? articlesResponse.data?.data.results[index].title
												: values.title,
										slug:
											values.sluge == ''
												? articlesResponse.data?.data.results[index].slug
												: values.sluge,
										body:
											values.body == ''
												? articlesResponse.data?.data.results[index].body
												: values.body,
										key_wards:
											values.key_words == ''
												? articlesResponse.data?.data.results[index].key_wards
												: values.key_words,
									};
									UpdateRequest(
										`/admin/articles/${id}/`,
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
												<FormattedMessage id={'title'} defaultMessage='title' />
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='title'
												placeholder={
													articlesResponse.data?.data.results[index].title
												}
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.title}
											/>
											<Text color={'red'}>
												{errors.title && touched.title && errors.title}
											</Text>

											<FormLabel>
												<FormattedMessage id={'sluge'} defaultMessage='sluge' />
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='sluge'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												placeholder={
													articlesResponse.data?.data.results[index].slug
												}
												value={values.sluge}
											/>
											<Text color={'red'}>
												{errors.sluge && touched.sluge && errors.sluge}
											</Text>

											<FormLabel>
												<FormattedMessage
													id={'Key_words'}
													defaultMessage='key words'
												/>
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='key_words'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												placeholder={
													articlesResponse.data?.data.results[index].key_wards
												}
												value={values.key_words}
											/>
											<Text color={'red'}>
												{errors.key_words &&
													touched.key_words &&
													errors.key_words}
											</Text>

											<FormLabel>
												<FormattedMessage id={'body'} defaultMessage='body' />
											</FormLabel>
											<Textarea
												onChange={handleChange}
												name='body'
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												placeholder={
													articlesResponse.data?.data.results[index].body
												}
												value={values.body}
											/>
											<Text color={'red'}>
												{errors.body && touched.body && errors.body}
											</Text>
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
				first={basicFirst}
				rows={basicRows}
				totalRecords={articlesResponse.data?.data.count}
				onPageChange={onBasicPageChange}
				
			></Paginator>
		</Stack>
	);
};
ArticleAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default ArticleAdmin;

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
					src={item.datafile}
					onError={(e) =>
						(e.target.src =
							'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
					}
					alt={item.name}
					style={{ width: '100%', display: 'block' }}
				/>
			</CardBody>
		</Card>
	);
};
