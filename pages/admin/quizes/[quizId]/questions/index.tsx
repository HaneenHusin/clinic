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
import React, { ReactElement, useState } from 'react';
import { NextPageWithLayout } from '../../../../_app';
import {
	DeleteRequest,
	PostRequest,
	questionsList,
	UpdateRequest,
} from '../../../../../src/services/api';
import { Paginator } from 'primereact/paginator';
import { Formik } from 'formik';
import { myDirectionState } from '../../../../../Atoms/localAtoms';
import { useRecoilState } from 'recoil';
import router, { useRouter } from 'next/router';
import { mutate } from 'swr';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import LayoutAdmin from '../../../../../src/components/layout_admin';

const QuestionAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgsSrc, setImgsSrc] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const [idQuestion, setIdQuuestion] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const [pageNum, setPageNum] = useState(1);
	const router = useRouter();
	const { quizId } = router.query;

	let questionResponse = questionsList(pageNum, basicRows, quizId);

	const onBasicPageChange = (event) => {
		debugger;
		setBasicFirst(event.first);
		setBasicRows(event.rows);
		setPageNum(event.page + 1);
	};

	function refresh(response: any) {
		onClose();
		mutate(
			`/admin/quizes/${quizId}/questions/?page=${pageNum}&pageSize=${basicRows}`
		);
	}
	function openModal() {
		onOpen();
		setIsEdit(true);
	}
	function openEditModal(indexValue: number, idQuestion: number) {
		console.log('index....' + indexValue);
		onOpen();
		setIsEdit(false);
		setIndex(indexValue);
		setIdQuuestion(idQuestion);
	}

	return (
		<Stack p={'10px'} margin={'2%'} dir={dirState}>
		
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
			<HStack justify={'space-between'} m={'10px'}>
			<Breadcrumb fontWeight='medium' fontSize='sm'>
				<BreadcrumbItem>
					<Link href="/admin/quizes" shallow={true} ><Text  fontSize={['sm', 'sm', 'md', 'lg']} fontWeight={'bold'} textDecoration={"underline"}><FormattedMessage id={'quizes'} defaultMessage='quizes' ></FormattedMessage></Text> </Link>
				</BreadcrumbItem>

				<BreadcrumbItem>
					<BreadcrumbLink href='#'><Text fontSize={['sm', 'sm', 'md', 'lg']} fontWeight={'bold'}><FormattedMessage id={'questions'} defaultMessage='questions' /></Text></BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
					<FormattedMessage id={'questions'} defaultMessage='questions' />
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
								<FormattedMessage id={'text'} defaultMessage='text' />
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{questionResponse.data?.data.results?.map(
							(item: any, index: number) => (
								<Tr key={item.title}>
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
										<Link
											shallow={true}
											href={`/admin/quizes/${quizId}/questions/${item.id}`}
										>
											<Text
												textDecoration={'underline'}
												fontSize={['sm', 'md', 'lg', 'xl']}
											>
												<FormattedMessage
													id={'answer'}
													defaultMessage='answer'
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
												DeleteRequest(
													`/admin/quize/${quizId}/questions/${item.id}/`,
													refresh
												)
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
							<FormattedMessage id={'add_question'} />
						</ModalHeader>
						<Formik
							initialValues={{ text: '' }}
							validate={(values) => {
								const errors = {};
								if (!values.text) {
									errors.text = (
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
												<FormattedMessage id={'text'} defaultMessage='text' />
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
							<FormattedMessage
								id={'edit_question'}
								defaultMessage='Edit question'
							/>
						</ModalHeader>
						<Formik
							initialValues={{
								text: questionResponse.data?.data?.results[index]?.text,
							}}
							validate={(values) => {
								const errors = {};
								if (!values.text) {
									errors.text = (
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
												<FormattedMessage id={'text'} defaultMessage='text' />
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
				totalRecords={questionResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator>
		</Stack>
	);
};

QuestionAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default QuestionAdmin;
