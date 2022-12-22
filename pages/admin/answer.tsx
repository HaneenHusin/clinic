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
import { answerList, DeleteRequest, PostRequest, UpdateRequest } from '../../src/services/api';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import { myDirectionState } from '../../Atoms/localAtoms';
import { useRecoilState } from 'recoil';
import router, { useRouter } from 'next/router';
import { mutate } from 'swr';

const AnswerAdmin: NextPageWithLayout = (props:any) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
    const [isEdit,setIsEdit ] = useState(false);
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [idQuize, setIdQuize] = useState(0);
	const [idQuestion, setIdQuuestion] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const [pageNum, setPageNum] = useState(1);
	const router = useRouter();
	
	const userData = JSON.parse(router.query.item);
	const quizId = JSON.parse(router.query.quizId);
	let answerResponse = answerList(pageNum, basicRows,quizId, userData.id);
	console.log("answer"+userData.id +quizId)
	const onBasicPageChange = (event) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		setPageNum(event.page + 1);
	};

	
	async function refresh(response:any)
	{
		onClose();
		 mutate(
			`/admin/quize/${idQuize}/questions/${idQuestion}/answers/?page=${pageNum}&pageSize=${basicRows}`
		);
	}
	function openModal() {
		onOpen();
		setIsEdit(true);
		console.log('answerResponse' + answerResponse.data);
	}
	function openEditModal(indexValue:number,idValue:number) {
		console.log("index...."+indexValue);
		onOpen();
		setIsEdit(false);
		setIndex(indexValue);
		setId(idValue)
	}
	
	return (
		<Stack p={'10px'} margin={"2%"}  dir={dirState}>
			{answerResponse.isLoading == true ? (
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
					<FormattedMessage id={'answer'} defaultMessage='answer' />
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
						{answerResponse.data?.data?.results?.map((item:any,index:number) => (
							<Tr key={item.title}>
								
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
								
								<Tooltip label={item.points}>
									<Td
										fontSize={['sm', 'md', 'lg', 'xl']}
										maxWidth={'100px'}
										textOverflow={'ellipsis'}
										overflow={'hidden'}
										whiteSpace={'nowrap'}
									>
										{item.points}
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
										onClick={()=> DeleteRequest(`/admin/quize/${quizId}/questions/${userData.id}/answers/${item.id}/`,refresh)}
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
							<FormattedMessage id={'add_answer'} />
						</ModalHeader>
						<Formik 	initialValues={{  text: '',points:'' }}
						validate={(values) => {
							const errors = {};
							if (!values.text) {
								errors.text = <FormattedMessage  id={'required'} defaultMessage='Required'  />;
							}
                           
							if (!values.points) {
                                errors.points =<FormattedMessage  id={'required'} defaultMessage='required' />;
                            }
							
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
                              
                            
                            const dataToRequestAPI = {
	                        text: values.text,
							points: values.points,

                                  }
								  PostRequest(`/admin/quize/${quizId}/questions/${userData.id}/answers/`,dataToRequestAPI,refresh)
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
										<FormattedMessage id={'text'} defaultMessage='text' />
									</FormLabel>
									<Input variant='outline'
										type='text'
										name='text'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.text} />
									 <Text color={"red"}>{errors.text && touched.text && errors.text}</Text>	
									
									<FormLabel>
										<FormattedMessage id={'points'} defaultMessage='points' />
									</FormLabel>
									<Input 	
									onChange={handleChange}
									name='points'
									type="number"
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.points} />
									 <Text color={"red"}>{errors.points && touched.points && errors.points}</Text>	
									

								
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
								id={'edit_answer'}
								defaultMessage='Edit answer'
							/>
						</ModalHeader>
						<Formik initialValues={{  text: answerResponse.data?.data.results[index]?.text ,points: answerResponse.data?.data.results[index]?.points }}
						
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
                            
                            const dataToRequestAPI = {
	                        text:values.text ,
							points: values.points 
							
                                  }
								  UpdateRequest(`/admin/quize/${quizId}/questions/${userData.id}/answers/${answerResponse.data?.data.results[index]?.id}/`,dataToRequestAPI,refresh)
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
										<FormattedMessage id={'text'} defaultMessage='text' />
									</FormLabel>
									<Input
									 variant='outline'
										type='text'
										name='text'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.text} />
									 
									
									<FormLabel>
										<FormattedMessage id={'points'} defaultMessage='points' />
									</FormLabel>
									<Input 	
									name='points'
									onChange={handleChange}
									type="number"
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.points} />
									
								
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
				totalRecords={answerResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator>
		</Stack>
	);
}

AnswerAdmin.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutAdmin>
            {page}
        </LayoutAdmin>
    )
}

export default  AnswerAdmin;
