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
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import React, { ReactElement, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Galleria } from 'primereact/galleria';
import { NextPageWithLayout } from '../_app';
import LayoutAdmin from '../../src/components/layout_admin';
import { certificateList, DeleteRequest, informationList, PostRequest, UpdateRequest } from '../../src/services/api';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import { myDirectionState } from '../../Atoms/localAtoms';
import { useRecoilState } from 'recoil';
import router from 'next/router';

const InformationAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgsSrc, setImgsSrc] = useState([]);
    const [isEdit,setIsEdit ] = useState(false);
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const infoResponse = informationList(1, 10);
	
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
		onClose();
		router.push('/admin/information_admin', '/admin/information_admin', { shallow: true })
	}
	function openModal() {
		onOpen();
		setIsEdit(true);
		console.log('articlesResponse' + infoResponse.data);
	}
	function openEditModal(indexValue:number,idValue:number) {
		console.log("index...."+indexValue);
		onOpen();
		setIsEdit(false);
		setIndex(indexValue);
		setId(idValue)
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
		<Stack p={'10px'} margin={"2%"}  dir={dirState}>
			{infoResponse.isLoading == true ? (
				<div id='globalLoader'>
					<Image src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
						alt=''
					/>
				</div>
			) : (
				<></>
			)}
			<HStack justify={'space-between'} m={'10px'}>
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
					<FormattedMessage id={'information'} defaultMessage='information' />
				</Text>
				<Button variant='outline' colorScheme='brand' onClick={openModal} fontSize={['sm', 'md', 'lg', 'xl']} >
					<i
						className='pi pi-plus'
						style={{ fontSize: '1em', marginRight: '12px',marginLeft: '12px' }}
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
								<FormattedMessage id={'name'} defaultMessage='name' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'value'} defaultMessage='value' />
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{infoResponse.data?.data.results.map((item:any,index:number) => (
							<Tr key={item.id}>
							
								<Tooltip label={item.name}>
									<Td
										fontSize={['sm', 'md', 'lg', 'xl']}
										maxWidth={'100px'}
										textOverflow={'ellipsis'}
										overflow={'hidden'}
										whiteSpace={'nowrap'}
									>
										{item.name}
									</Td>
								</Tooltip>
								
								<Tooltip label={item.value}>
									<Td
										fontSize={['sm', 'md', 'lg', 'xl']}
										maxWidth={'100px'}
										textOverflow={'ellipsis'}
										overflow={'hidden'}
										whiteSpace={'nowrap'}
									>
										{item.value}
									</Td>
								</Tooltip>
								<Td>
									
									<IconButton
										aria-label={'edit'}
										onClick={()=>openEditModal(index,item.id)}
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
										onClick={()=> DeleteRequest(`/admin/information/${item.id}/`,refresh)}
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
					<ModalContent  dir={dirState}>
						<ModalHeader>
							<FormattedMessage id={'add_information'} />
						</ModalHeader>
						<Formik 	initialValues={{  name: '',value:'' }}
						validate={(values) => {
							const errors = {};
							if (!values.name) {
								errors.name = <FormattedMessage  id={'required'} defaultMessage='Required'  />;
							}
                           
							if (!values.value) {
                                errors.value =<FormattedMessage  id={'required'} defaultMessage='required' />;
                            }
							
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
                              
                            
                            const dataToRequestAPI = {
	                        name: values.name,
							value: values.value,
						
                                  }
								  PostRequest('/admin/information/',dataToRequestAPI,refresh)
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
										<FormattedMessage id={'name'} defaultMessage='name' />
									</FormLabel>
									<Input variant='outline'
										type='text'
										name='name'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.name} />
									 <Text color={"red"}>{errors.name && touched.name && errors.name}</Text>	
									
									<FormLabel>
										<FormattedMessage id={'value'} defaultMessage='value' />
									</FormLabel>
									<Textarea 	
									onChange={handleChange}
									type='text'
									name='text'
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.value} />
									 <Text color={"red"}>{errors.value && touched.value && errors.value}</Text>	
									
					
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button variant='outline' mr={3} ml={3} onClick={onClose}>
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
					<ModalContent  dir={dirState}>
						<ModalHeader>
							<FormattedMessage
								id={'edit_certificate'}
								defaultMessage='Edit certificate'
							/>
						</ModalHeader>
						<Formik initialValues={{  name: '',value:''}}
						
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
                            
                            const dataToRequestAPI = {
	                        name:values.name =='' ? infoResponse.data?.data.results[index].name:values.name,
							value: values.value =='' ? infoResponse.data?.data.results[index].value:values.value,
							
                                  }
								  UpdateRequest(`/admin/information/${id}/`,dataToRequestAPI,refresh)
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
										<FormattedMessage id={'name'} defaultMessage='name' />
									</FormLabel>
									<Input
									 variant='outline'
										type='text'
										name='name'
										placeholder={infoResponse.data?.data.results[index].name}
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.name} />
									 <Text color={"red"}>{errors.name && touched.name && errors.name}</Text>	
									 
									
									<FormLabel>
										<FormattedMessage id={'value'} defaultMessage='value' />
									</FormLabel>
									<Textarea 	
									onChange={handleChange}
									name='text'
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									placeholder={infoResponse.data?.data.results[index].value}
									value={values.value} />
									 <Text color={"red"}>{errors.value && touched.value && errors.value}</Text>	
									

								
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button variant='outline' mr={3} ml={3} onClick={onClose}>
								{<FormattedMessage id={'close'} defaultMessage='close' />}
							</Button>
							<Button variant='primary'type='submit'
										disabled={isSubmitting}>
								{<FormattedMessage id={'edit'} defaultMessage='edit'  />}
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
				totalRecords={infoResponse.data?.data.results.length}
				rowsPerPageOptions={[10, 20, 30]}
				onPageChange={onBasicPageChange}
			></Paginator>
		</Stack>
	);
}

InformationAdmin.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutAdmin>
            {page}
        </LayoutAdmin>
    )
}

export default  InformationAdmin;
