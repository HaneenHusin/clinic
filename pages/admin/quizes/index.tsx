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
} from '@chakra-ui/react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
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
import { myDirectionState } from '../../../Atoms/localAtoms';
import { useRecoilState } from 'recoil';
import router from 'next/router';
import Link from 'next/link';
import { mutate } from 'swr';

const QuizesAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgsSrc, setImgsSrc] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const [pageNum, setPageNum] = useState(1);
	let quizeResponse = quizeList(pageNum, basicRows);

	const onBasicPageChange = (event) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		setPageNum(event.page + 1);
	};

	async function refresh(response: any) {
		onClose();
		mutate(`/admin/quizes/?page=${pageNum}&pageSize=${basicRows}`);
	}
	function openModal() {
		onOpen();
		setIsEdit(true);
	}
	function openEditModal(indexValue: number, idValue: number) {
		console.log('index....' + indexValue);
		onOpen();
		setIsEdit(false);
		setIndex(indexValue);
		setId(idValue);
	}

	return (
		<Stack p={'10px'} margin={'2%'} dir={dirState}>
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
					<FormattedMessage id={'quizes'} defaultMessage='quizes' />
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
					<FormattedMessage id={'import'} defaultMessage='import' />
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
								<FormattedMessage id={'title'} defaultMessage='title' />
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
											href={`/admin/quizes/${item.id}/questions/`}>
											<Text
												textDecoration={'underline'}
												fontSize={['sm', 'md', 'lg', 'xl']}
											>
												<FormattedMessage
													id={'questions'}
													defaultMessage='questions'
												/>
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
												<FormattedMessage
													id={'results'}
													defaultMessage='results'
												/>
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
											onClick={() =>
												DeleteRequest(`/admin/quize/${item.id}/`, refresh)
											}
											icon={
												<i
													className='pi pi-trash'
													style={{ fontSize: '1em', color: 'red' }}
												></i>
											}
										></IconButton>
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
					<ModalContent dir={dirState}>
						<ModalHeader>
							<FormattedMessage id={'add_quize'} />
						</ModalHeader>
						<Formik
							initialValues={{ title: '', brief: '' }}
							validate={(values) => {
								const errors = {};
								if (!values.title) {
									errors.title = (
										<FormattedMessage
											id={'required'}
											defaultMessage='Required'
										/>
									);
								}

								return errors;
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2));

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
												<FormattedMessage id={'title'} defaultMessage='title' />
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
											{<FormattedMessage id={'close'} defaultMessage='close' />}
										</Button>
										<Button
											variant='primary'
											type='submit'
											disabled={isSubmitting}
										>
											{
												<FormattedMessage
													id={'upload'}
													defaultMessage='upload'
												/>
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
					<ModalContent dir={dirState}>
						<ModalHeader>
							<FormattedMessage id={'edit_quize'} defaultMessage='Edit quize' />
						</ModalHeader>
						<Formik
							initialValues={{
								title: quizeResponse.data?.data?.results[index]?.title,
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2));

									const dataToRequestAPI = {
										title: values.title,
									};
									UpdateRequest(
										`/admin/quize/${id}/`,
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
												<FormattedMessage id={'title'} defaultMessage='title' />
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
											{<FormattedMessage id={'close'} defaultMessage='close' />}
										</Button>
										<Button
											variant='primary'
											type='submit'
											disabled={isSubmitting}
										>
											{<FormattedMessage id={'edit'} defaultMessage='edit' />}
										</Button>
									</ModalFooter>
								</form>
							)}
						</Formik>
					</ModalContent>
				</Modal>
			)}
			<Paginator
				p-paginator-page
				first={basicFirst}
				rows={basicRows}
				totalRecords={quizeResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator>
		</Stack>
	);
};

QuizesAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default QuizesAdmin;
