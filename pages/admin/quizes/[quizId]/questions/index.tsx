import {
	HStack,
	Text,
	Button,
	Image,
	Stack,
	IconButton,
	useDisclosure,
	Input,
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
import { NextPageWithLayout } from '../../../../_app';
import {
	DeleteRequest,
	PostRequest,
	questionsList,
	UpdateRequest,
} from '../../../../../src/services/api';
import { Formik } from 'formik';
import router, { useRouter } from 'next/router';
import { mutate } from 'swr';
import Link from 'next/link';
import LayoutAdmin from '../../../../../src/components/layout_admin';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { QuestionItem } from '../../../../../src/types/question';

const QuestionAdmin: NextPageWithLayout = () => {
	const [idQuestion, setIdQuuestion] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	const router = useRouter();
	const { quizId } = router.query;
	const { t } = useTranslation("")
	let questionResponse = questionsList(pageNum, basicRows, quizId);
	const [rowData, setRowData] = useState<QuestionItem>();
	const {
		isOpen: isEditOpen,
		onOpen: onEditOpen,
		onClose: onEditClose,
	} = useDisclosure();
	const {
		isOpen: isAddOpen,
		onOpen: onAddOpen,
		onClose: onAddClose,
	} = useDisclosure();
	const {
		isOpen: isDeleteOpen,
		onOpen: onDeleteOpen,
		onClose: onDeleteClose,
	} = useDisclosure();

	const onBasicPageChange = (event: any) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		setPageNum(event.page + 1);
	};
	


	function refresh(response: any) {
		onDeleteClose();
		onAddClose();
		onEditClose();
		mutate(
			`/admin/quize/${quizId}/questions/?page=${pageNum}&page_size=${basicRows}`
		)
	}
	function openModal() {
		onAddOpen();
	}
	function openEditModal(rowData: QuestionItem) {
		onEditOpen();
		setRowData(rowData);
		setIdQuuestion(rowData.id)
	}
	function openDeleteModal(rowData: QuestionItem) {
		onDeleteOpen();
		setIdQuuestion(rowData.id)
	}
	const actionBodyTemplate = (rowData: QuestionItem) => {
		return (
			<React.Fragment>
				<IconButton
					aria-label={'delete'}
					rounded={'full'}
					m={{ base: '1', md: '4' }}
					onClick={() => openDeleteModal(rowData)}
					icon={
						<i
							className='pi pi-trash'
							style={{ fontSize: '1em', color: 'red' }}
						></i>
					}
				></IconButton>
				<IconButton
					aria-label={'edit'}
					rounded={'full'}
					onClick={() => openEditModal(rowData)}
					icon={
						<i
							className='pi pi-pencil'
							style={{ fontSize: '1em', color: 'green' }}
						></i>
					}
				></IconButton>
			</React.Fragment>
		);
	};

	const columns = [
		{ field: 'text', header: 'text', id: 'id' },
	];

	const renderHeader = () => {
		return (
			<HStack justify={'space-between'} m={'10px'}>
				<Breadcrumb fontWeight='medium' fontSize='sm'>
				<BreadcrumbItem>
					<Link href="/admin/quizes" shallow={true} ><Text  fontSize={['sm', 'sm', 'md', 'lg']} fontWeight={'bold'} textDecoration={"underline"}>{t('quizes')}</Text> </Link>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink href='#'><Text fontSize={['sm', 'sm', 'md', 'lg']} fontWeight={'bold'}>{t('questions')}</Text></BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
					{t('questions')}
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
		);
	};

	const dynamicColumns = columns.map((col, i) => {
		return (
			<Column
				key={col.id}
				field={col.field}
				header={t(col.header)}
				alignHeader={router.locale == 'ar' ? 'left' : 'right'}
				align={router.locale == 'ar' ? 'right' : 'left'}
			/>
		);
	});
	const answerTemplate = (rowData: QuestionItem) => {
		return (
			<React.Fragment key={rowData.id}>
				<Link shallow={true} href={`/admin/quizes/${quizId}/questions/${rowData.id}`}>
					<Text
						textDecoration={'underline'}
						fontSize={['sm', 'md', 'lg', 'xl']}
					>
						{t(`answer`)}
					</Text>
				</Link>
			</React.Fragment>
		);
	};
	return (
		<Stack p={'10px'} margin={'2%'} >
		
			{questionResponse.isLoading == true ? (
				<div id='globalLoader'>
					<Image
						src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
						alt=''
					/>
				</div>
			) : (
				<></>
			)}
			<DataTable
				value={questionResponse.data?.data.results}
				header={renderHeader}
				paginator
				lazy={true}
				totalRecords={questionResponse.data?.data.count}
				first={basicFirst}
				onPage={onBasicPageChange}
				rows={10}
				responsiveLayout='scroll'
				rowHover={true}
				showGridlines={true}
				selectionMode='single'
			>
				{dynamicColumns}
				<Column align={router.locale == 'ar' ? 'right' : 'left'} body={answerTemplate} exportable={false} />
				<Column align={router.locale == 'ar' ? 'right' : 'left'} body={actionBodyTemplate} exportable={false} />
			</DataTable>
	
		

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
															`/admin/quize/${quizId}/questions/${idQuestion}/`,
															refresh
														)
													}}
												>
													{t('delete')}
												</Button>
											</ModalFooter>
										</ModalContent>
									</Modal>
									
					
			
				<Modal isOpen={isAddOpen} onClose={onAddClose}>
					<ModalOverlay />
					<ModalContent >
						<ModalHeader>
						{t('add_question')}
						</ModalHeader>
						<Formik
							initialValues={{ text: '' }}
							validate={(values) => {
								const errors = {};
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
										text: values.text,
									};
									PostRequest(
										`/admin/quize/${quizId}/questions/`,
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
										</Stack>
									</ModalBody>

									<ModalFooter>
										<Button variant='outline' mr={3} ml={3} onClick={onAddClose}>
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
		
				<Modal isOpen={isEditOpen} onClose={onEditClose}>
					<ModalOverlay />
					<ModalContent >
						<ModalHeader>
						{t('edit_question')}
						</ModalHeader>
						<Formik
							initialValues={{
								text: rowData?.text,
							}}
							validate={(values) => {
								const errors = {};
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
										text: values.text,
									};
									UpdateRequest(
										`/admin/quize/${quizId}/questions/${idQuestion}/`,
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
										</Stack>
									</ModalBody>

									<ModalFooter>
										<Button variant='outline' mr={3} ml={3} onClick={onEditClose}>
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
			
		</Stack>
	);
};

QuestionAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export const getServerSideProps = async ({ locale}:{ locale:string }) => ({
	props: {
	  ...(await serverSideTranslations(locale, ["common"])),
	}
  })
export default QuestionAdmin;
