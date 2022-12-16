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
} from '@chakra-ui/react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import React, { useMemo, useState } from 'react';
import { galleriaService } from '../../src/services/Photos';
import { FileUpload } from 'primereact/fileupload';
import { Galleria } from 'primereact/galleria';
import { articlesList,  PostRequest,  postrequest,  UpdateRequest } from '../api';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';

export default function ArticleAdmin() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgsSrc, setImgsSrc] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const articlesResponse = articlesList(1, 10);

	const onBasicPageChange = (event) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
	};

	const onChange = (e) => {
		debugger;
		for (const file of e.files) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				setImgsSrc((imgs) => [...imgs, reader.result]);
				console.log('imgsSrc ' + imgsSrc);
			};
			reader.onerror = () => {
				console.log(reader.error);
			};
		}
	};
	async function refresh(response:any)
	{
		console.log('articlesResponse' + response.data);
		onClose();
	window.location.reload()
	}
	function openModal() {
		onOpen();
		setIsEdit(true);
		console.log('articlesResponse' + articlesResponse.data);
	}
	function openEditModal(value:number) {
		onOpen();
		setIsEdit(false);
		setIndex(value)
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
		<Stack p={'10px'}>
			{articlesResponse.isLoading == true ? (
				<div id='globalLoader'>
					<img
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
				<Button variant='outline' colorScheme='brand' onClick={openModal}>
					<i
						className='pi pi-plus'
						style={{ fontSize: '1em', marginRight: '12px' }}
					></i>
					<FormattedMessage id={'import'} defaultMessage='import' />
				</Button>
			</HStack>
			<TableContainer w={'full'}>
				<Table
					variant='striped'
					border={'0px'}
					colorScheme={'brand.dark'}
					size={{ base: 'xs', md: 'md', lg: 'lg' }}
				>
					<TableCaption>ADHD CENTER</TableCaption>
					<Thead>
						<Tr>
							<Th fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'}>
								<FormattedMessage id={'images'} defaultMessage='images' />
							</Th>
							<Th fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'}>
								<FormattedMessage id={'title'} defaultMessage='title' />
							</Th>
							<Th fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'}>
								<FormattedMessage id={'sluge'} defaultMessage='sluge' />
							</Th>
							<Th fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'}>
								<FormattedMessage id={'body'} defaultMessage='body' />
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{articlesResponse.data?.data.results.map((item,index) => (
							<Tr key={item.title}>
								<Td w={'15%'} h={'15%'}>
									{' '}
									{/* <Image src={item.itemImageSrc} rounded={'lg'} /> */}
									<Galleria
										value={articlesResponse.data?.data.results[index].photos_list}
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
										onClick={()=>openEditModal(index)}
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
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							{' '}
							<FormattedMessage id={'add_article'} />
						</ModalHeader>
						<ModalCloseButton />
						<Formik 	initialValues={{  title: '',sluge:'',body:'',photos:'',key_wards:'' }}
						validate={(values) => {
							const errors = {};
							if (!values.title) {
								errors.title = <FormattedMessage  id={'required'} defaultMessage='Required'  />;
							}
                            if (!values.sluge) {
                                errors.sluge =<FormattedMessage  id={'required'} defaultMessage='required' />;
                            }
							if (!values.body) {
                                errors.body =<FormattedMessage  id={'required'} defaultMessage='required' />;
                            }
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
                              
                            
                            const dataToRequestAPI = {
	                        title: values.title,
	                        sluge: values.sluge,
							body: values.body,
							photos: imgsSrc,
							key_wards:""

                                  }
								  PostRequest('/admin/articles/',dataToRequestAPI,refresh)
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
									<Input variant='outline'
										type='text'
										name='title'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.title} />
									 <Text color={"red"}>{errors.title && touched.title && errors.title}</Text>	
									 
									<FormLabel>
										<FormattedMessage id={'sluge'} defaultMessage='sluge' />
									</FormLabel>
									<Input variant='outline' 	
									type='text'
									name='sluge'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.sluge}/>
									 <Text color={"red"}>{errors.sluge && touched.sluge && errors.sluge}</Text>	
									

									<FormLabel>
										<FormattedMessage id={'body'} defaultMessage='body' />
									</FormLabel>
									<Textarea 	
									onChange={handleChange}
									name='body'
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.body} />
									 <Text color={"red"}>{errors.body && touched.body && errors.body}</Text>	
									

									<FormLabel>
									<FormattedMessage
										id={'choose_file'}
										defaultMessage='choose file'
									/>
								</FormLabel>
								<FileUpload
									multiple
									mode='basic'
									name='choose_file'
									url='https://primefaces.org/primereact/showcase/upload.php'
									accept='image/*'
									customUpload
									uploadHandler={onChange}
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.photos}
									chooseLabel={
										<FormattedMessage
											id={'choose_files'}
											defaultMessage='choose file'
										/>
									}
								/>
									<div>
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
								</div>
					
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button variant='outline' mr={3} onClick={onClose}>
								{<FormattedMessage id={'close'} defaultMessage='close' />}
							</Button>
							<Button variant='primary'type='submit'
										disabled={isSubmitting}>
								{<FormattedMessage id={'upload'} defaultMessage='upload'  />}
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
							{' '}
							<FormattedMessage
								id={'edit_article'}
								defaultMessage='Edit article'
							/>
						</ModalHeader>
						<ModalCloseButton />
						<Formik initialValues={{  title: '',sluge:'',body:'',photos:'',key_wards:'' }}
						
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
                            
                            const dataToRequestAPI = {
	                        title:values.title =='' ? articlesResponse.data?.data.results[index].title:values.title,
	                        sluge: values.sluge =='' ? articlesResponse.data?.data.results[index].slug:values.sluge,
							body: values.body =='' ? articlesResponse.data?.data.results[index].body:values.body,
							photos: values.photos =='' ? articlesResponse.data?.data.results[index].photos:values.photos,
							key_wards:""

                                  }
							console.log("values.body...."+ values.body)
								  UpdateRequest(`/admin/articles/${index}/`,dataToRequestAPI,refresh)
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
										placeholder={articlesResponse.data?.data.results[index].title}
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.title} />
									 <Text color={"red"}>{errors.title && touched.title && errors.title}</Text>	
									 
									<FormLabel>
										<FormattedMessage id={'sluge'} defaultMessage='sluge' />
									</FormLabel>
									<Input variant='outline' 	
									type='text'
									name='sluge'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									placeholder={articlesResponse.data?.data.results[index].slug}
									value={values.sluge}/>
									 <Text color={"red"}>{errors.sluge && touched.sluge && errors.sluge}</Text>	
									

									<FormLabel>
										<FormattedMessage id={'body'} defaultMessage='body' />
									</FormLabel>
									<Textarea 	
									onChange={handleChange}
									name='body'
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									placeholder={articlesResponse.data?.data.results[index].body}
									value={values.body} />
									 <Text color={"red"}>{errors.body && touched.body && errors.body}</Text>	
									

								
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button variant='outline' mr={3} onClick={onClose}>
								{<FormattedMessage id={'close'} defaultMessage='close' />}
							</Button>
							<Button variant='primary'type='submit'
										disabled={isSubmitting}>
								{<FormattedMessage id={'upload'} defaultMessage='upload'  />}
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
				totalRecords={articlesResponse.data?.data.results.length}
				rowsPerPageOptions={[10, 20, 30]}
				onPageChange={onBasicPageChange}
			></Paginator>
		</Stack>
	);
}
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
