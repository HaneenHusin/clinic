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
import { NextPageWithLayout } from '../../_app';
import LayoutAdmin from '../../../src/components/layout_admin';
import {
	DeleteRequest,
	PostRequest,
	quizeList,
	UpdateRequest,
} from '../../../src/services/api';
import { Formik } from 'formik';
import router, { useRouter } from 'next/router';
import Link from 'next/link';
import { mutate } from 'swr';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { QuizeItem } from '../../../src/types/quize';

const QuizesAdmin: NextPageWithLayout = () => {
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	let quizeResponse = quizeList(pageNum, basicRows);
	const { t } = useTranslation('');
	const [rowData, setRowData] = useState<QuizeItem>();
	const router = useRouter();
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
		mutate(`/admin/quize/?page=${pageNum}&page_size=${basicRows}`);
	}
	function openModal() {
		onAddOpen();
	}
	function openEditModal(rowData: QuizeItem) {
		onEditOpen();
		setId(rowData.id);
		setRowData(rowData);
	}
	function openDeleteModal(rowData: QuizeItem) {
		onDeleteOpen();
		setId(rowData.id);
	}
	const actionBodyTemplate = (rowData: QuizeItem) => {
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

	const questionsTemplate = (rowData: QuizeItem) => {
		return (
			<React.Fragment key={rowData.id}>
				<Link shallow={true} href={`/admin/quizes/${rowData.id}/questions/`}>
					<Text
						textDecoration={'underline'}
						fontSize={['sm', 'md', 'lg', 'xl']}
					>
						{t(`questions`)}
					</Text>
				</Link>
			</React.Fragment>
		);
	};
	const answersTemplate = (rowData: QuizeItem) => {
		return (
			<React.Fragment key={rowData.id}>
				<Link shallow={true} href={`/admin/quizes/${rowData.id}/result`}>
					<Text
						textDecoration={'underline'}
						fontSize={['sm', 'md', 'lg', 'xl']}
					>
						{t(`results`)}
					</Text>
				</Link>
			</React.Fragment>
		);
	};

	const columns = [{ field: 'title', header: 'title', id: 'id' }];

	const renderHeader = () => {
		return (
			<HStack justify={'space-between'} m={'10px'}>
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
					{t('quizes')}
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
	return (
		<Stack p={'10px'} margin={'2%'}>
			{quizeResponse.isLoading == true ? (
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
				value={quizeResponse.data?.data.results}
				header={renderHeader}
				paginator
				lazy={true}
				totalRecords={quizeResponse.data?.data.count}
				first={basicFirst}
				onPage={onBasicPageChange}
				rows={10}
				responsiveLayout='scroll'
				rowHover={true}
				showGridlines={true}
				selectionMode='single'
			>
				{dynamicColumns}
				<Column align={router.locale == 'ar' ? 'right' : 'left'} body={questionsTemplate} exportable={false} />
				<Column align={router.locale == 'ar' ? 'right' : 'left'} body={answersTemplate} exportable={false} />
				<Column body={actionBodyTemplate} exportable={false} />
			</DataTable>
			<Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('delete_item')}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>{t('delete_confirm')}</ModalBody>
					<ModalFooter>
						<Button variant='ghost' mr={3} onClick={onDeleteClose}>
							{t('cancel')}
						</Button>
						<Button
							colorScheme='red'
							onClick={() => {
								onDeleteClose();
								DeleteRequest(`/admin/quize/${id}/`, refresh);
							}}
						>
							{t('delete')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Modal isOpen={isAddOpen} onClose={onAddClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('add_quize')}</ModalHeader>
					<Formik
						initialValues={{ title: '', brief: '' }}
						validate={(values) => {
							const errors = {};
							if (!values.title) {
								errors.title = t('required');
							}

							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								const dataToRequestAPI = {
									title: values.title,
									brief: values.brief,
								};
								PostRequest('/admin/quize/', dataToRequestAPI, refresh);
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
										<FormLabel>{t('title')}</FormLabel>
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
				<ModalContent>
					<ModalHeader>{t('edit_quize')}</ModalHeader>
					<Formik
						initialValues={{
							title: rowData?.title,
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								const dataToRequestAPI = {
									title: values.title,
								};
								UpdateRequest(
									`/admin/quize/${rowData?.id ?? 0}/`,
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
										<FormLabel>{t('title')}</FormLabel>
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

QuizesAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});
export default QuizesAdmin;
