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
import React, { ReactElement, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../../_app';
import LayoutAdmin from '../../../src/components/layout_admin';
import {
	DeleteRequest,
	feedbackList,
	PostRequest,
	quizeList,
	UpdateRequest,
} from '../../../src/services/api';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import router from 'next/router';
import Link from 'next/link';
import { mutate } from 'swr';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const QuizesAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgsSrc, setImgsSrc] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [pageNum, setPageNum] = useState(1);
	let quizeResponse = quizeList(pageNum, -1);
	const { t } = useTranslation("")
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
		mutate(`/admin/quize/?page=${pageNum}&pageSize=${-1}`);
		
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
							{t('title')} 
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{quizeResponse.data?.data.results.map(
							(item: any, index: number) => (
								<Tr key={item.title}>
									<Tooltip label={item.title}>
										<Td
											fontSize={['sm', 'md', 'lg', 'xl']}
											maxWidth={'100px'}
											textOverflow={'ellipsis'}
											overflow={'hidden'}
											whiteSpace={'nowrap'}
										>
											{item.title}
										</Td>
									</Tooltip>

									<Td>
										<Link
											shallow={true}
											href={`/admin/quizes/${item.id}/questions/`}
										>
											<Text
												textDecoration={'underline'}
												fontSize={['sm', 'md', 'lg', 'xl']}
											>
												{t('questions')}
											</Text>
										</Link>
									</Td>
									<Td>
										<Link
											shallow={true}
											href={`/admin/quizes/${item.id}/result`}
										>
											<Text
												textDecoration={'underline'}
												fontSize={['sm', 'md', 'lg', 'xl']}
											>
											{t('results')}
											</Text>
										</Link>
									</Td>
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
																`/admin/quize/${id}/`,
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
						{t('add_quize')} 
						</ModalHeader>
						<Formik
							initialValues={{ title: '', brief: '' }}
							validate={(values) => {
								const errors = {};
								if (!values.title) {
									errors.title = (
										t('required')
									);
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
											<FormLabel>
											{t('title')} 
											</FormLabel>
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
										<Button variant='outline' mr={3} ml={3} onClick={onClose}>
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
			) : (
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent >
						<ModalHeader>
						{t('edit_quize')}
						</ModalHeader>
						<Formik
							initialValues={{
								title: quizeResponse.data?.data?.results[index]?.title,
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {

									const dataToRequestAPI = {
										title: values.title,
									};
									UpdateRequest(
										`/admin/quize/${quizeResponse.data?.data?.results[index]?.id ?? 0}/`,
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
											{t('title')} 
											</FormLabel>
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
				totalRecords={quizeResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator> */}
		</Stack>
	);
};

QuizesAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export const getStaticProps = async ({ locale}:{ locale:string }) => ({
	props: {
	  ...(await serverSideTranslations(locale, ["common"])),
	}
  })
export default QuizesAdmin;
