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
	Button,
	Image,
	Stack,
	IconButton,
	useDisclosure,
	Textarea,
	Card,
	CardBody,
	SimpleGrid,
	Tooltip,
	FormLabel,
	Accordion,
	AccordionItem,
	AccordionIcon,
	AccordionButton,
	AccordionPanel,
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
	DeleteRequest,
	PostRequest,
	slidersList,
	UpdateRequest,
} from '../../src/services/api';
import { Formik } from 'formik';
import { useRecoilState } from 'recoil';
import Gridphotot from '../../src/components/grid_photo';
import { myImagesState } from '../../Atoms/imagesAtom';
import { mutate } from 'swr';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { SlidersItem } from '../../src/types/slider';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SlidersAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgsSrc, setImgsSrc] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [imageState, setimageState] = useRecoilState(myImagesState);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	const slidersResponse = slidersList(pageNum, basicRows);
	const [rowData, setRowData] = useState<SlidersItem>();
	const { t } = useTranslation("")
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
	

	const onBasicPageChange = (event:any) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		setPageNum(event.page + 1);
	};

	 function refresh(response: any) {
		onAddClose();
		onDeleteClose();
		onEditClose();
		mutate(`/admin/sliders/?page=${pageNum}&page_size=${basicRows}`);
		
	}
	function openModal() {
		onAddOpen();
		setIsEdit(true);
	}
	function openEditModal( rowData: SlidersItem) {
		onEditOpen();
		setIsEdit(false);
		setId(rowData.id);
		setRowData(rowData);
		setimageState("");
	}
	function openDeleteModal(rowData: SlidersItem) {
		onDeleteOpen();
		setId(rowData.id);
	  }
	  const actionBodyTemplate = (rowData: SlidersItem) => {
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
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
					{t('slider')}
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
	const imageBodyTemplate = (rowData: SlidersItem) => {
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
		<Stack p={'10px'} margin={'2%'}>
		{slidersResponse.isLoading == true ? (
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
				value={slidersResponse.data?.data.results}
				header={renderHeader}
				paginator
				lazy={true}
				totalRecords={slidersResponse.data?.data.count}
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
			
			{/* <TableContainer w={'full'}>
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
							{t('images')}
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
							{t('text')} 
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{slidersResponse.data?.data.results.map(
							(item: any, index: number) => (
								<Tr key={item.title}>
									<Td w={'15%'} h={'15%'}>
										<Image
											src={item.photo_model.datafile}
											onError={(e) =>
												(e.target.src =
													'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
											}
											alt={item.alt}
											style={{ width: '100%', display: 'block' }}
										/>
									</Td>

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
											onClick={onDeleteOpen}
											icon={
												<i
													className='pi pi-trash'
													style={{ fontSize: '1em', color: 'red' }}
												></i>
											}
										></IconButton> */}

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
														onClick={() => onDeleteClose()}
													>
														{t('cancel')}
													</Button>
													<Button
														colorScheme='red'
														onClick={() => {
															onDeleteClose();
															DeleteRequest(
																`/admin/sliders/${id}/`,
																refresh
															);
														}}
													>
														{t('delete')}
													</Button>
												</ModalFooter>
											</ModalContent>
										</Modal>
									{/* </Td>
								</Tr>
							)
						)}
					</Tbody>
				</Table>
			</TableContainer> */}

			
				<Modal isOpen={isAddOpen} onClose={onAddClose}>
					<ModalOverlay />
					<ModalContent >
						<ModalHeader>
						{t('add_slider')} 
						</ModalHeader>
						<Formik
							initialValues={{ text: '', photo: '' }}
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
										photo: imageState,
									};
									PostRequest('/admin/sliders/', dataToRequestAPI, refresh);
									setSubmitting(false);
									setimageState('');
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
																<FormLabel>
																{t('choose_file')}
																</FormLabel>
															</Box>
															<AccordionIcon />
														</AccordionButton>
													</h2>
													<AccordionPanel pb={4}>
														<Gridphotot isMulti={false}></Gridphotot>
													</AccordionPanel>
												</AccordionItem>
											</Accordion>
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
											{
											t('upload')
											}
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
						<ModalHeader>
						{t('edit_slider')}
						</ModalHeader>
						<Formik
							initialValues={{
								text: rowData?.text,
								photo: '',
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {

									const dataToRequestAPI = {
										photo:
											imageState == ''
												? rowData?.photo
												: imageState,
										text: values.text,
									};
									UpdateRequest(
										`/admin/sliders/${id}/`,
										dataToRequestAPI,
										refresh
									);
									setimageState("");
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
											<SimpleGrid
												spacing={5}
												columns={[2, 3]}
												templateColumns='repeat(3, 1fr)'
												w='full%'
											>
												{imgsSrc.map((link) => (
													<Image key={index} alt="" src={link} />
												))}
											</SimpleGrid>

											<FormLabel>
											{t('text')}
											</FormLabel>
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

											<Accordion defaultIndex={[0]} allowMultiple>
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
																<FormLabel>
																{t('choose_file')}
																</FormLabel>
															</Box>
															<AccordionIcon />
														</AccordionButton>
													</h2>
													<AccordionPanel pb={4}>
														<Gridphotot isMulti={false}></Gridphotot>
													</AccordionPanel>
												</AccordionItem>
											</Accordion>
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

SlidersAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export const getStaticProps = async ({ locale}:{ locale:string }) => ({
	props: {
	  ...(await serverSideTranslations(locale, ["common"])),
	}
  })
export default SlidersAdmin;
