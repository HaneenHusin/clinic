import {
	Text,
	Button,
	Image,
	Stack,
	IconButton,
	useDisclosure,
	Textarea,
	Tooltip,
	FormLabel,
	Center,
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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import LayoutAdmin from '../../src/components/layout_admin';
import {
	DeleteRequest,
	informationList,
	UpdateRequest,
} from '../../src/services/api';
import { Formik } from 'formik';
import router, { useRouter } from 'next/router';
import { mutate } from 'swr';
import { useTranslation } from 'next-i18next';
import { InformationItem } from '../../src/types/information';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const InformationAdmin: NextPageWithLayout = () => {
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	const infoResponse = informationList(pageNum, basicRows);
	const [rowData, setRowData] = useState<InformationItem>();
	const { t } = useTranslation("");
	const router = useRouter();
	const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
	const {isOpen: isDeleteOpen,onOpen: onDeleteOpen,onClose: onDeleteClose,} = useDisclosure();

	const onBasicPageChange = (event:any) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		
		setPageNum(event.page + 1);
	};

	 function refresh(response: any) {
		onDeleteClose();
		onEditClose();
		mutate(`/admin/information/?page=${pageNum}&page_size=${basicRows}`)
	
	}
	
	function openEditModal( rowData:InformationItem) {
		onEditOpen();
		setId(rowData.id);
		setRowData(rowData);
	}
	function openDeleteModal(rowData: InformationItem) {
		onDeleteOpen();
		setId(rowData.id);
	  }
	  const actionBodyTemplate = (rowData:InformationItem) => {
		return (
			<React.Fragment>
				<IconButton
					aria-label={'delete'}
					rounded={'full'}
					m={{ base: '1', md: '4' }}
					onClick={() => openDeleteModal(rowData)}
					icon={<i className='pi pi-trash' style={{ fontSize: '1em', color: 'red' }}	></i>}
				></IconButton>
				<IconButton
					aria-label={'edit'}
					rounded={'full'}
					onClick={() => openEditModal(rowData)}
					icon={
						<i className='pi pi-pencil'	style={{ fontSize: '1em', color: 'green' }}	></i>
					}
				></IconButton>
			</React.Fragment>
		);
	};

	const columns = [
		{ field: 'name', header: 'name', id: 'id' },
		{ field: 'value', header: 'value', id: 'id' },
	];

	const renderHeader = () => {
		return (
			<Center>
			<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
			{t( 'information')}
				</Text>
			</Center>
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
			{infoResponse.isLoading == true ? (
				<div id='globalLoader'>
					<Image
						src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
						alt=''
					/>
				</div>
			) : (
				<></>
			)}
									<Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
										<ModalOverlay />
										<ModalContent>
											<ModalHeader>{t('delete_item')} </ModalHeader>
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
														DeleteRequest(`/admin/information/${id}/`, refresh)
													}}
												>
												{t('delete')} 
												</Button>
											</ModalFooter>
										</ModalContent>
									</Modal>
								{/* </Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer> */}

		
				<Modal isOpen={isEditOpen} onClose={onEditClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
						{t('edit_information')}
						</ModalHeader>
						<Formik
							initialValues={{
								name: '',
								value: rowData?.value,
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {

									const dataToRequestAPI = {
										name: rowData?.name,
										value:
											values.value == ''
												? rowData?.value
												: values.value,
									};
									UpdateRequest(
										`/admin/information/${id}/`,
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
												{rowData?.name}
											</FormLabel>

											
											<Textarea
												onChange={handleChange}
												name='value'
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.value}
											/>
											<Text color={'red'}>
												{errors.value && touched.value && errors.value}
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
				<DataTable
				value={infoResponse.data?.data.results}
				header={renderHeader}
				paginator
				lazy={true}
				totalRecords={infoResponse.data?.data.count}
				first={basicFirst}
				onPage={onBasicPageChange}
				rows={10}
				responsiveLayout='scroll'
				rowHover={true}
				showGridlines={true}
				selectionMode="single" 
			>
				{dynamicColumns}
				<Column body={actionBodyTemplate} exportable={false} />
			</DataTable>
			
		</Stack>
	);
};

InformationAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export const getStaticProps = async ({ locale}:{ locale:string }) => ({
	props: {
	  ...(await serverSideTranslations(locale, ["common"])),
	}
  })
export default InformationAdmin;
