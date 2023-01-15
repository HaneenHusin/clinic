import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
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
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import router from 'next/router';
import { mutate } from 'swr';
import { useTranslation } from 'next-i18next';

const InformationAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	const infoResponse = informationList(pageNum, -1);
	const { t } = useTranslation("");

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
		mutate(`/admin/information/?page=${pageNum}&pageSize=${-1}`)
	
	}
	
	function openEditModal(indexValue: number, idValue: number) {
		onOpen();
		setIndex(indexValue);
		setId(idValue);
	}
	function openDeleteModal(indexValue: number, idValue: number) {
		onDeleteOpen();
		setIndex(indexValue);
		setId(idValue);
	  }
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
			
			<Center>
			<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
			{t( 'information')}
				</Text>
			</Center>
				
				
			
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
							{t('name')} 
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
							{t('value')}
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{infoResponse.data?.data.results.map((item: any, index: number) => (
							<Tr key={item.id}>
								<Tooltip label={item.name}>
									<Td
										fontSize={['sm', 'md', 'lg', 'xl']}
										maxWidth={'100px'}
										textOverflow={'ellipsis'}
										overflow={'hidden'}
										whiteSpace={'nowrap'}
									>
										{item.name}
									</Td>
								</Tooltip>

								<Tooltip label={item.value}>
									<Td
										fontSize={['sm', 'md', 'lg', 'xl']}
										maxWidth={'100px'}
										textOverflow={'ellipsis'}
										overflow={'hidden'}
										whiteSpace={'nowrap'}
									>
										{item.value}
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
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>

		
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
						{t('edit_information')}
						</ModalHeader>
						<Formik
							initialValues={{
								name: '',
								value: infoResponse.data?.data.results[index].value,
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {

									const dataToRequestAPI = {
										name: infoResponse.data?.data.results[index].name,
										value:
											values.value == ''
												? infoResponse.data?.data.results[index].value
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
												{infoResponse.data?.data.results[index].name}
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
			
			{/* <Paginator
				p-paginator-page
				first={basicFirst}
				rows={basicRows}
				totalRecords={infoResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator> */}
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
