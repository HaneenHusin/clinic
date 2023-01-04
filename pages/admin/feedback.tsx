import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	HStack,
	Text,
	Button,
	Image,
	Spacer,
	Stack,
	IconButton,
	useDisclosure,
	Input,
	Textarea,
  SimpleGrid,
  Tooltip,
  FormLabel,
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
import { DeleteRequest, feedbackList, PostRequest, UpdateRequest } from '../../src/services/api';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import { myDirectionState } from '../../Atoms/localAtoms';
import { useRecoilState } from 'recoil';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { mutate } from 'swr';

const FeedbackAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgsSrc, setImgsSrc] = useState([]);
    const [isEdit,setIsEdit ] = useState(false);
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const [pageNum, setPageNum] = useState(1);
	const feedbackResponse = feedbackList(pageNum,-1);
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

	const onBasicPageChange = (event:any) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		setPageNum(event.page + 1);
	};

	
	 function refresh(response:any)
	{
		onClose();
		mutate(`/admin/feedback/?page=${pageNum}&page_size=${-1}`)
	}
	function openModal() {
		onOpen();
		setIsEdit(true);
	}
	function openEditModal(indexValue:number,idValue:number) {
		onOpen();
		setIsEdit(false);
		setIndex(indexValue);
		setId(idValue)
	}
	function openDeleteModal(indexValue: number, idValue: number) {
		onDeleteOpen();
		setIndex(indexValue);
		setId(idValue);
	  }
	  const actionBodyTemplate = (rowData) => {
		return (
			<React.Fragment>
				<Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => console.log(rowData)} />
				<Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => console.log(rowData)} />
			</React.Fragment>
		);
	}
	return (
		<Stack p={'10px'} margin={"2%"}  dir={dirState}>
			{feedbackResponse.isLoading == true ? (
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
					<FormattedMessage id={'feedback'} defaultMessage='feedback' />
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
								<FormattedMessage id={'title'} defaultMessage='title' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'text'} defaultMessage='text' />
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{feedbackResponse.data?.data.results.map((item:any,index:number) => (
							<Tr key={item.title}>
								
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
								
								<Tooltip label={item.brief}>
									<Td
										fontSize={['sm', 'md', 'lg', 'xl']}
										maxWidth={'100px'}
										textOverflow={'ellipsis'}
										overflow={'hidden'}
										whiteSpace={'nowrap'}
									>
										{item.brief}
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
										<ModalContent dir={dirState}>
											<ModalHeader><FormattedMessage id={'delete_item'} defaultMessage='delete item' /></ModalHeader>
											<ModalCloseButton />
											<ModalBody>
											<FormattedMessage id={'delete_confirm'} defaultMessage='delete confirm' />
											</ModalBody>
											<ModalFooter>
												<Button variant='ghost' mr={3} onClick={onDeleteClose}>
												<FormattedMessage id={'cancel'} defaultMessage='cancel' />
												</Button>
												<Button
													colorScheme='red'
													onClick={() => {
														onDeleteClose();
														DeleteRequest(`/admin/feedback/${id}/`,refresh)
													}}
												>
													<FormattedMessage id={'delete'} defaultMessage='delete' />
												</Button>
											</ModalFooter>
										</ModalContent>
									</Modal>
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
							<FormattedMessage id={'add_feedback'} />
						</ModalHeader>
						<Formik 	initialValues={{  title: '',brief:'' }}
						validate={(values) => {
							const errors = {};
							if (!values.title) {
								errors.title = <FormattedMessage  id={'required'} defaultMessage='Required'  />;
							}
                           
							if (!values.brief) {
                                errors.brief =<FormattedMessage  id={'required'} defaultMessage='required' />;
                            }
							
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
                              
                            
                            const dataToRequestAPI = {
	                        title: values.title,
							brief: values.brief,

                                  }
								  PostRequest('/admin/feedback/',dataToRequestAPI,refresh)
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
										<FormattedMessage id={'text'} defaultMessage='text' />
									</FormLabel>
									<Textarea 	
									onChange={handleChange}
									name='brief'
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.brief} />
									 <Text color={"red"}>{errors.brief && touched.brief && errors.brief}</Text>	
									

									<div>
									<SimpleGrid
										spacing={5}
										columns={[2, 3]}
										templateColumns='repeat(3, 1fr)'
										w='full%'
									>
										{imgsSrc.map((link) => (<Image key={index} alt=""src={link} />))}
									</SimpleGrid>
								</div>
					
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
								id={'edit_feedback'}
								defaultMessage='Edit feedback'
							/>
						</ModalHeader>
						<Formik initialValues={{  title:  feedbackResponse.data?.data?.results[index]?.title,brief: feedbackResponse.data?.data?.results[index]?.brief }}
						
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
                            
                            const dataToRequestAPI = {
	                        title:values.title ,
							brief: values.brief 
							
                                  }
								  UpdateRequest(`/admin/feedback/${id}/`,dataToRequestAPI,refresh)
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
									value={values.title} />
									 <Text color={"red"}>{errors.title && touched.title && errors.title}</Text>	
									 
									
									<FormLabel>
										<FormattedMessage id={'text'} defaultMessage='text' />
									</FormLabel>
									<Textarea 	
									name='brief'
									onChange={handleChange}
									
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.brief} />
									 <Text color={"red"}>{errors.brief && touched.brief && errors.brief}</Text>	
									
								
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
			{/* <Paginator
			p-paginator-page
				first={basicFirst}
				rows={basicRows}
				totalRecords={feedbackResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator> */}

{/* <div className="card">
				<DataTable dir={dirState}   value={feedbackResponse.data?.data.results}  responsiveLayout="scroll" dataKey="id"  
				  paginator first={basicFirst} rows={10} totalRecords={feedbackResponse.data?.data.count} onPage={onBasicPageChange}
				  loading={feedbackResponse.isLoading}  >
					<Column field="title" align={"right"} alignHeader={'left'}  header={<FormattedMessage id={'title'} defaultMessage='title' />}/>
					<Column field="brief" align={"right"}  alignHeader={'left'}header={<FormattedMessage id={'text'} defaultMessage='text' />} />
					<Column body={actionBodyTemplate}    alignHeader={'left'}  exportable={false}  bodyStyle={{ textAlign: 'center', overflow: 'hidden' }} ></Column>
			
				</DataTable>
			</div> */}

		</Stack>
	);
}

FeedbackAdmin.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutAdmin>
            {page}
        </LayoutAdmin>
    )
}

export default  FeedbackAdmin;
