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
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
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
import React, { ReactElement, useState } from 'react';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import router, { useRouter } from 'next/router';
import { mutate } from 'swr';
import { NextPageWithLayout } from '../../../../_app';
import {
	answerList,
	DeleteRequest,
	PostRequest,
	UpdateRequest,
} from '../../../../../src/services/api';
import LayoutAdmin from '../../../../../src/components/layout_admin';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AnswerAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isEdit, setIsEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	const router = useRouter();
	const { qId } = router.query;
	const { quizId } = router.query;
	const { t } = useTranslation("")

	let answerResponse = answerList(pageNum, -1, quizId, qId);

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
		mutate(
			`/admin/quize/${quizId}/questions/${qId}/answers?page=${pageNum}&pageSize=${-1}`
		);
	}
	function openModal() {
		onOpen();
		setIsEdit(true);
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
	return (
		<Stack p={'10px'} margin={'2%'} >
			{answerResponse.isLoading == true ? (
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
				<Breadcrumb fontWeight='medium' fontSize='sm'>
					<BreadcrumbItem>
						<Link href='/admin/quizes' shallow={true}>
							<Text
								fontSize={['sm', 'sm', 'md', 'lg']}
								fontWeight={'bold'}
								textDecoration={'underline'}
							>
								{t('quizes')}
							</Text>
						</Link>
					</BreadcrumbItem>
					<BreadcrumbItem>
						<Link href={`/admin/quizes/${quizId}/questions`}>
							<Text
								fontSize={['sm', 'sm', 'md', 'lg']}
								fontWeight={'bold'}
								textDecoration={'underline'}
							>
							{t('questions')}
							</Text>
						</Link>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink href='#'>
							<Text fontSize={['sm', 'sm', 'md', 'lg']} fontWeight={'bold'}>
							{t('answers')} 
							</Text>
						</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
				{t('answers')}
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
					size={{ base: 'xs', md: 'md', lg: 'lg' }}
				>
					<TableCaption>ADHD CENTER</TableCaption>
					<Thead>
						<Tr>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
							{t('text')}
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
							{t('points')}
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{answerResponse.data?.data?.results?.map(
							(item: any, index: number) => (
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
											onClick={() => openDeleteModal(index, item.id)}
											icon={
												<i
													className='pi pi-trash'
													style={{ fontSize: '1em', color: 'red' }}
												></i>
											}
										></IconButton>

										<Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
											<ModalOverlay />
											<ModalContent>
												<ModalHeader>
												{t('delete_item')}
												</ModalHeader>
												<ModalCloseButton />
												<ModalBody>
												{t('delete_confirm')}
												</ModalBody>
												<ModalFooter>
													<Button
														variant='ghost'
														mr={3}
														onClick={onDeleteClose}
													>
														{t('cancel')}
													</Button>
													<Button
														colorScheme='red'
														onClick={() => {
															onDeleteClose();
															DeleteRequest(
																`/admin/quize/${quizId}/questions/${qId}/answers/${id}/`,
																refresh
															);
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
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent >
						<ModalHeader>
						{t('add_answer')}
						</ModalHeader>
						<Formik
							initialValues={{ text: '', points: '' }}
							validate={(values) => {
								const errors = {};
								if (!values.text) {
									errors.text = (
										t('required')
									);
								}

								if (!values.points) {
									errors.points = (
										t('required')
									);
								}

								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {

									const dataToRequestAPI = {
										text: values.text,
										points: values.points,
									};
									PostRequest(
										`/admin/quize/${quizId}/questions/${qId}/answers/`,
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
											{t('text')}
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='text'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.text}
											/>
											<Text color={'red'}>
												{errors.text && touched.text && errors.text}
											</Text>

											<FormLabel>
											{t('points')}
											</FormLabel>
											<Input
												onChange={handleChange}
												name='points'
												type='number'
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.points}
											/>
											<Text color={'red'}>
												{errors.points && touched.points && errors.points}
											</Text>
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
											{
												{t('upload')}
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
					<ModalContent >
						<ModalHeader>
						{t('edit_answer')}
						</ModalHeader>
						<Formik
							initialValues={{
								text: answerResponse.data?.data.results[index]?.text,
								points: answerResponse.data?.data.results[index]?.points,
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {

									const dataToRequestAPI = {
										text: values.text,
										points: values.points,
									};
									UpdateRequest(
										`/admin/quize/${quizId}/questions/${qId}/answers/${id}/`,
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
											{t('text')}
											</FormLabel>
											<Input
												variant='outline'
												type='text'
												name='text'
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.text}
											/>

											<FormLabel>
											{t('points')}
											</FormLabel>
											<Input
												name='points'
												onChange={handleChange}
												type='number'
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.points}
											/>
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
				totalRecords={answerResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator> */}
		</Stack>
	);
};

AnswerAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};


export default AnswerAdmin;
