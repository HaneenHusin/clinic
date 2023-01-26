import{
	HStack,
	Text,
	Box,
	Button,
	Image,
	Stack,
	IconButton,
	useDisclosure,
	Input,
	Textarea,
	FormLabel,
	AccordionIcon,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	Accordion,
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
import { NextPageWithLayout } from '../_app';
import LayoutAdmin from '../../src/components/layout_admin';
import {
	certificateList,
	DeleteRequest,
	PostRequest,
	UpdateRequest,
} from '../../src/services/api';
import { Formik } from 'formik';
import { useRecoilState } from 'recoil';
import router, { useRouter } from 'next/router';
import { myImagesState } from '../../Atoms/imagesAtom';
import Gridphotot from '../../src/components/grid_photo';
import { mutate } from 'swr';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CertificateItem } from '../../src/types/certificate';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const CertificatesAdmin: NextPageWithLayout = () => {
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	const certificateResponse = certificateList(pageNum, basicRows);
	const [imageState, setimageState] = useRecoilState(myImagesState);
	const [isImageModal, setIsImageModal] = useState(false);
	const [rowData, setRowData] = useState<CertificateItem>();
	const { t } = useTranslation('common');
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
	const router = useRouter();

	const onBasicPageChange = (event: any) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		setPageNum(event.page + 1);
	};

	function refresh(response: any) {
		onEditClose();
		onAddClose();
		mutate(`/admin/certificates/?page=${pageNum}&page_size=${basicRows}`);
		onDeleteClose();
	}
	function openModal() {
		onAddOpen();
		setIsImageModal(true);
	}
	function openEditModal(rowData: CertificateItem) {
		onEditOpen();
		setId(rowData.id);
		setRowData(rowData);
		setimageState('');
	}
	function openDeleteModal(rowData: CertificateItem) {
		onDeleteOpen();
		setId(rowData.id);
	}

	const actionBodyTemplate = (rowData: CertificateItem) => {
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
		{ field: 'title', header: 'title', id: 'id' },
		{ field: 'text', header: 'text', id: 'id' },
	];

	const renderHeader = () => {
		return (
			<HStack justify={'space-between'} m={'10px'}>
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
					{t('certificate')}
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
	const imageBodyTemplate = (rowData: CertificateItem) => {
		return (
			<Image
				src={rowData.photo_model.datafile}
				onError={(e) =>
					(e.target.src =
						'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
				}
				alt={''}
				width={rowData.photo_model.width}
				height={'20%'}
				style={{ display: 'block' }}
			/>
		);
	};
	return (
		<Stack p={'10px'} margin={'1%'}>
			{certificateResponse.isLoading == true ? (
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
				value={certificateResponse.data?.data.results}
				header={renderHeader}
				paginator
				lazy={true}
				totalRecords={certificateResponse.data?.data.count}
				first={basicFirst}
				onPage={onBasicPageChange}
				rows={10}
				responsiveLayout='scroll'
				rowHover={true}
				showGridlines={true}
				selectionMode='single'
			>
				<Column
					header={t('images')}
					style={{ width: '20%' }}
					body={imageBodyTemplate}
				></Column>

				{dynamicColumns}

				<Column
					body={actionBodyTemplate}
					style={{ width: '10%' }}
					exportable={false}
				/>
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
								DeleteRequest(`/admin/certificates/${id}/`, refresh);
							}}
						>
							{t('delete')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			<Modal isOpen={isAddOpen} onClose={onAddClose} size={'5xl'}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{t('add_certificate')}</ModalHeader>
					<Formik
						initialValues={{ title: '', text: '', photo: '' }}
						validate={(values) => {
							const errors = {};
							if (!values.title) {
								errors.title = t('required');
							}

							if (!values.text) {
								errors.text = t('required');
							}

							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								const dataToRequestAPI = {
									title: values.title,
									text: values.text,
									photo: imageState,
								};
								PostRequest('/admin/certificates/', dataToRequestAPI, refresh);
								setimageState('');
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
										<FormLabel>{t('text')}</FormLabel>
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
															<FormLabel>{t('choose_file')}</FormLabel>
														</Box>
														<AccordionIcon />
													</AccordionButton>
												</h2>
												<AccordionPanel pb={4}>
													<Gridphotot isMulti={false}></Gridphotot>
												</AccordionPanel>
											</AccordionItem>
										</Accordion>
										)
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
					<ModalHeader>{t('edit_certificate')}</ModalHeader>
					<Formik
						initialValues={{
							title:rowData?.title,
							text: rowData?.text,
							photo: '',
						}}
						onSubmit={(values, { setSubmitting }) => {
							debugger
							setTimeout(() => {
								const dataToRequestAPI = {
									title: values.title,
									text: values.text,
									photo:
										imageState == ''
											? rowData?.photo
											: imageState,
								};
								UpdateRequest(
									`/admin/certificates/${id}/`,
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
										<FormLabel>{t('text')}</FormLabel>
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
															<FormLabel>{t('choose_file')}</FormLabel>
														</Box>
														<AccordionIcon />
													</AccordionButton>
												</h2>
												<AccordionPanel pb={4}>
													<Gridphotot isMulti={false}></Gridphotot>
												</AccordionPanel>
											</AccordionItem>
										</Accordion>
										)
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

CertificatesAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});
export default CertificatesAdmin;