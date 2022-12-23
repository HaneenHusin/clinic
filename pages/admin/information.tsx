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
import { FormattedMessage } from 'react-intl';
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
import { myDirectionState } from '../../Atoms/localAtoms';
import { useRecoilState } from 'recoil';
import router from 'next/router';
import { mutate } from 'swr';

const InformationAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [index, setIndex] = useState(0);
	const [id, setId] = useState(0);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const [pageNum, setPageNum] = useState(1);
	const infoResponse = informationList(pageNum, basicRows);
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
		mutate(`/admin/information/?page=${pageNum}&page_size=${basicRows}`)
		onDeleteClose();
	}
	
	function openEditModal(indexValue: number, idValue: number) {
		console.log('index....' + indexValue);
		onOpen();
		setIndex(indexValue);
		setId(idValue);
	}

	return (
		<Stack p={'10px'} margin={'2%'} dir={dirState}>
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
					<FormattedMessage id={'information'} defaultMessage='information' />
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
								<FormattedMessage id={'name'} defaultMessage='name' />
							</Th>
							<Th fontSize={['sm', 'md', 'xl', '2xl']} fontWeight={'bold'}>
								<FormattedMessage id={'value'} defaultMessage='value' />
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
										aria-label={'edit'}
										onClick= { onDeleteOpen }
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
											<ModalHeader><FormattedMessage id={'delete_item'} defaultMessage='delete item' /></ModalHeader>
											<ModalCloseButton />
											<ModalBody>
											<FormattedMessage id={'delete_confirm'} defaultMessage='delete confirm' />
											</ModalBody>
											<ModalFooter>
												<Button variant='ghost' mr={3} onClick={onDeleteClose}>
												<FormattedMessage id={'cancel'} defaultMessage='cancel' />
												</Button>
												<Button
													colorScheme='red'
													onClick={() => {
														DeleteRequest(`/admin/information/${item.id}/`, refresh)
													}}
												>
													<FormattedMessage id={'delete'} defaultMessage='delete' />
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
					<ModalContent dir={dirState}>
						<ModalHeader>
							<FormattedMessage
								id={'edit_certificate'}
								defaultMessage='Edit certificate'
							/>
						</ModalHeader>
						<Formik
							initialValues={{
								name: '',
								value: infoResponse.data?.data.results[index].value,
							}}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									alert(JSON.stringify(values, null, 2));

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
			
			<Paginator
				p-paginator-page
				first={basicFirst}
				rows={basicRows}
				totalRecords={infoResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator>
		</Stack>
	);
};

InformationAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default InformationAdmin;
