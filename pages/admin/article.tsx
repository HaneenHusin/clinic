import {
	HStack,
	Text,
	Box,
	Button,
	Image,
	Stack,
	IconButton,
	useDisclosure,
	Input,
	Tooltip,
	FormLabel,
	Accordion,
	AccordionPanel,
	AccordionIcon,
	AccordionItem,
	AccordionButton,
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
import React, { ReactElement, useMemo, useRef, useState } from 'react';
import { Galleria } from 'primereact/galleria';
import {
	articlesList,
	DeleteRequest,
	PostRequest,
	UpdateRequest,
} from '../../src/services/api';
import { Formik } from 'formik';
import LayoutAdmin from '../../src/components/layout_admin';
import { NextPageWithLayout } from '../_app';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import Gridphotot from '../../src/components/grid_photo';
import { myListImagesState } from '../../Atoms/imagesAtom';
import { Editor } from 'primereact/editor';
import parse from 'html-react-parser';
import { mutate } from 'swr';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DataTable } from 'primereact/datatable';
import { ArticleItem, PhotosList } from '../../src/types/article';
import { Column } from 'primereact/column';

const ArticleAdmin: NextPageWithLayout = () => {
	const [isImageModal, setIsImageModal] = useState(false);
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(1);
	const [basicRows, setBasicRows] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	const articlesResponse = articlesList(pageNum, basicRows);
	const [imageState, setimageState] = useRecoilState(myListImagesState);
	const [text1, setText1] = useState<string>('');
	const [rowData, setRowData] = useState<ArticleItem>();
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

	async function refresh(response: any) {
		onEditClose();
		onAddClose();
		onDeleteClose();
		mutate(`/admin/articles/?page=${pageNum}&page_size=${basicRows}`);
	}

	function openModal() {
		onAddOpen();
		setIsImageModal(true);
		setText1('');
	}

	function openEditModal(rowData: ArticleItem) {
		onEditOpen();
		setId(rowData.id);
		setText1('');
		setRowData(rowData);
	}
	
	function openDeleteModal(rowData: ArticleItem) {
		onDeleteOpen();
		setId(rowData.id);
		setText1('');
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
	const actionBodyTemplate = (rowData: ArticleItem) => {
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
		{ field: 'slug', header: 'slug', id: 'id' },
	];

	const renderHeader = () => {
		return (
			<HStack justify={'space-between'} m={'10px'}>
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
					{t('article')}
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
				style={{ width: '8%' }}
				alignHeader={router.locale == 'ar' ? 'left' : 'right'}
				align={router.locale == 'ar' ? 'right' : 'left'}
			/>
		);
	});
	const imageBodyTemplate = (rowData: ArticleItem) => {
		return (
			<Galleria
				value={rowData.photos_list}
				responsiveOptions={responsiveOptions}
				numVisible={5}
				showThumbnails={false}
				showIndicators
				changeItemOnIndicatorHover
				item={itemGalleryTemplate}
			/>
		);
	};
	const BodyTemplate = (rowData: ArticleItem) => {
		return (
			<Tooltip label={parse(`${rowData.body}`)}>
				<div className='white-space-nowrap overflow-hidden text-overflow-ellipsis'>
					{parse(`${rowData.body}`)}
				</div>
				
			</Tooltip>
		);
	};
	return (
		<Stack p={'10px'} margin={'1%'}>
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
			<DataTable
				value={articlesResponse.data?.data.results}
				header={renderHeader}
				paginator
				lazy={true}
				totalRecords={articlesResponse.data?.data.count}
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
				<Column
					header={t('body')}
					style={{ maxWidth: 220 }}
					body={BodyTemplate}
					align={router.locale == 'ar' ? 'right' : 'left'}
					alignHeader={router.locale == 'ar' ? 'left' : 'right'}
				></Column>
				{dynamicColumns}

				<Column
					body={actionBodyTemplate}
					style={{ width: '10%' }}
					exportable={false}
				/>
			</DataTable>
			);
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
							onClick={(e) => {
								onDeleteClose();
								DeleteRequest(`/admin/articles/${id}/`, refresh);
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
					<ModalHeader>{t('add_article')}</ModalHeader>
					<Formik
						initialValues={{
							title: '',
							sluge: '',
							body: '',
							photos: [...imageState],
							keywords: '',
						}}
						validate={(values) => {
							const errors = {};
							if (!values.title) {
								errors.title = t('required');
							}
							if (!values.sluge) {
								errors.sluge = t('required');
							}
							if (!values.keywords) {
								errors.keywords = t('required');
							}
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								const dataToRequestAPI = {
									title: values.title,
									slug: values.sluge,
									body: text1,
									photos: imageState,
									keywords: values.keywords,
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

										<FormLabel>{t('sluge')}</FormLabel>
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

										<FormLabel>{t('Key_words')}</FormLabel>
										<Input
											variant='outline'
											type='text'
											name='keywords'
											onChange={handleChange}
											onBlur={handleBlur}
											borderColor={'brand.blue'}
											value={values.keywords}
										/>
										<Text color={'red'}>
											{errors.keywords && touched.keywords && errors.keywords}
										</Text>

										<FormLabel>{t('body')}</FormLabel>
										<Editor
											style={{ height: '220px' }}
											value={values.body}
											name='body'
											onChange={handleChange}
											onTextChange={(e) => setText1(e.htmlValue || '')}
										/>
										<Text color={'red'}>
											{errors.body && touched.body && errors.body}
										</Text>

										{isImageModal == true ? (
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
														<Gridphotot isMulti={true}></Gridphotot>
													</AccordionPanel>
												</AccordionItem>
											</Accordion>
										) : (
											<></>
										)}
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
					<ModalHeader>{t('edit_article')}</ModalHeader>
					<Formik
						initialValues={{
							title: rowData?.title,
							sluge: rowData?.slug,
							body: rowData?.body,
							photos: [],
							keywords: rowData?.keywords,
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								const dataToRequestAPI = {
									title: values.title,
									slug: values.sluge,
									body: text1 == '' ? values.body : text1,
									keywords: values.keywords,
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

										<FormLabel>{t('sluge')}</FormLabel>
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

										<FormLabel>{t('Key_words')}</FormLabel>
										<Input
											variant='outline'
											type='text'
											name='keywords'
											onChange={handleChange}
											onBlur={handleBlur}
											borderColor={'brand.blue'}
											value={values.keywords}
										/>
										<Text color={'red'}>
											{errors.keywords && touched.keywords && errors.keywords}
										</Text>

										<FormLabel>{t('body')}</FormLabel>
										<Editor
											style={{ height: '220px' }}
											value={values.body}
											name='body'
											onChange={handleChange}
											onTextChange={(e) => setText1(e.htmlValue || '')}
										/>

										<Text color={'red'}>
											{errors.body && touched.body && errors.body}
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
ArticleAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default ArticleAdmin;

export const getStaticProps = async ({ locale }: { locale: string }) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});
const itemGalleryTemplate = (item: PhotosList) => {
	return (
		<Image
			src={item.datafile}
			onError={(e) =>
				(e.target.src =
					'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
			}
			alt={item.name}
			style={{ width: '100%', height: '100%', display: 'block' }}
		/>
	);
};
