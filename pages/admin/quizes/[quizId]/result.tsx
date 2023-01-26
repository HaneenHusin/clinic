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
import { NextPageWithLayout } from '../../../_app';
import LayoutAdmin from '../../../../src/components/layout_admin';
import {
	DeleteRequest,
	feedbackList,
	PostRequest,
	resultList,
	UpdateRequest,
} from '../../../../src/services/api';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import router, { useRouter } from 'next/router';
import { mutate } from 'swr';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ResultItem } from '../../../../src/types/result';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ResultsAdmin: NextPageWithLayout = () => {
	const [idResult, setIdResult] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	const router = useRouter();
	const { t } = useTranslation('');
	const { quizId } = router.query;
	const [rowData, setRowData] = useState<ResultItem>();
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

	let resultResponse = resultList(pageNum, basicRows, quizId);
	const onBasicPageChange = (event: any) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		setPageNum(event.page + 1);
	};

	function refresh(response: any) {
		onEditClose();
		onDeleteClose();
		onAddClose();
		mutate(
			`/admin/quize/${quizId}/results/?page=${pageNum}&page_size=${basicRows}`
		);
	}
	function openModal() {
		onAddOpen();
	}
	function openEditModal(rowData: ResultItem) {
		onEditOpen();
		setIdResult(rowData.id);
		setRowData(rowData);
	}
	function openDeleteModal(rowData: ResultItem) {
		onDeleteOpen();
		setIdResult(rowData.id);
	}
	const actionBodyTemplate = (rowData: ResultItem) => {
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
		{ field: 'text', header: 'title', id: 'id' },
		{ field: 'min_point', header: 'min_point', id: 'id' },
		{ field: 'max_point', header: 'max_point', id: 'id' },
	];

	const renderHeader = () => {
		return (
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
							</Text>{' '}
						</Link>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink href='#'>
							<Text fontSize={['sm', 'sm', 'md', 'lg']} fontWeight={'bold'}>
								{t('results')}
							</Text>
						</BreadcrumbLink>
					</BreadcrumbItem>
				</Breadcrumb>
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
					{t('results')}
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
		<Stack p={'10px'} margin={'1%'}>
			{resultResponse.isLoading == true ? (
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
				value={resultResponse.data?.data.results}
				header={renderHeader}
				paginator
				lazy={true}
				totalRecords={resultResponse.data?.data.count}
				first={basicFirst}
				onPage={onBasicPageChange}
				rows={10}
				responsiveLayout='scroll'
				rowHover={true}
				showGridlines={true}
				selectionMode='single'
			>
				{dynamicColumns}
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
								DeleteRequest(
									`/admin/quize/${quizId}/results/${idResult}/`,
									refresh
								);
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
					<ModalHeader>{t('add_result')}</ModalHeader>
					<Formik
						initialValues={{ text: '', min_point: 0, max_point: 0 }}
						validate={(values) => {
							const errors = {};
							if (!values.text) {
								errors.text = t('required');
							}

							if (!values.min_point) {
								errors.min_point = t('required');
							}
							if (!values.max_point) {
								errors.max_point = t('required');
							}

							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								const dataToRequestAPI = {
									text: values.text,
									min_point: values.min_point,
									max_point: values.max_point,
								};
								PostRequest(
									`/admin/quize/${quizId}/results/`,
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
										<FormLabel>{t('text')}</FormLabel>
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

										<FormLabel>{t('min_point')}</FormLabel>
										<Input
											onChange={handleChange}
											name='min_point'
											type={'number'}
											onBlur={handleBlur}
											borderColor={'brand.blue'}
											value={values.min_point}
										/>
										<Text color={'red'}>
											{errors.min_point &&
												touched.min_point &&
												errors.min_point}
										</Text>

										<FormLabel>{t('max_point')}</FormLabel>
										<Input
											onChange={handleChange}
											name='max_point'
											type={'number'}
											onBlur={handleBlur}
											borderColor={'brand.blue'}
											value={values.max_point}
										/>
										<Text color={'red'}>
											{errors.max_point &&
												touched.max_point &&
												errors.max_point}
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
					<ModalHeader>{t('edit_result')}</ModalHeader>
					<Formik
						initialValues={{
							text: rowData?.text,
							max_point: rowData?.max_point,
							min_point: rowData?.min_point,
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								const dataToRequestAPI = {
									text: values.text,
									max_point: values.max_point,
									min_point: values.min_point,
								};
								UpdateRequest(
									`/admin/quize/${quizId}/results/${idResult}/`,
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
										<FormLabel>{t('text')}</FormLabel>
										<Input
											variant='outline'
											type='text'
											name='text'
											onChange={handleChange}
											onBlur={handleBlur}
											borderColor={'brand.blue'}
											value={values.text}
										/>
										<FormLabel>{t('min_point')}</FormLabel>
										<Input
											onChange={handleChange}
											name='min_point'
											type={'number'}
											onBlur={handleBlur}
											borderColor={'brand.blue'}
											value={values.min_point}
										/>
										<FormLabel>{t('max_point')}</FormLabel>
										<Input
											onChange={handleChange}
											name='max_point'
											type={'number'}
											onBlur={handleBlur}
											borderColor={'brand.blue'}
											value={values.max_point}
										/>
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

ResultsAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};
export const getServerSideProps = async ({ locale }: { locale: string }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});
export default ResultsAdmin;
