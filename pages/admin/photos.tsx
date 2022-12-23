import {
	Table,
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
	Card,
	CardBody,
	SimpleGrid,
	CardFooter,
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
import React, { ReactElement, useMemo, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { DeleteRequest, photosList, PostRequest } from '../../src/services/api';
import LayoutAdmin from '../../src/components/layout_admin';
import { NextPageWithLayout } from '../_app';
import { useRecoilState } from 'recoil';
import { myDirectionState } from '../../Atoms/localAtoms';
import router, { useRouter } from 'next/router';
import { Paginator } from 'primereact/paginator';
import { mutate } from 'swr';

const PhotosAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [pageNum, setPageNum] = useState(1);
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const router = useRouter();
	const photosResponse = photosList(pageNum,basicRows);
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

	const onChange = (event: any) => {
		var formData = new FormData();
		formData.append('datafile', event.files[0]);
		PostRequest('/admin/photos/', formData, refresh);
	};

	 function refresh(response: any) {
		onClose();
		mutate(`/admin/photos/?page=${pageNum}&page_size=${basicRows}`)
	}
	function openModal() {
		onOpen();}



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
	const chooseOptions = {icon: 'pi pi-fw pi-plus p-8 m-8',className:'p-8 m-8'};
	const uploadOptions = {icon: 'pi pi-upload p-8 m-8', className: 'p-button-success p-8 m-8'};
	const cancelOptions = { icon: 'pi pi-times p-8 m-8', className: 'p-button-danger p-8 m-8'};
	return (
		<Stack p={'10px'} dir={dirState} margin={'2%'}>
			{photosResponse.isLoading == true ? (
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
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'} >
					<FormattedMessage id={'photos'} defaultMessage='photos' />
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
					borderColor={'brand.dark'}
					size={{ base: 'xs', md: 'md', lg: 'lg' }}
				>
					<TableCaption>ADHD CENTER</TableCaption>

					<Tbody>
						<Tr>
							<Td w={'15%'} h={'15%'}>
								{/* <Galleria
									value={photosResponse.data?.data.results}
									responsiveOptions={responsiveOptions}
									numVisible={5}
									style={{ maxWidth: '100%' }}
									showThumbnails={false}
									showIndicators
									changeItemOnIndicatorHover
									item={itemGalleryTemplate}
								/> */}
								<div>
									<SimpleGrid
										spacing={5}
										columns={[2, 3]}
										templateColumns='repeat(3, 1fr)'
										w='full%'
									>
										{photosResponse.data?.data.results.map((link) => (
											<Box key={link.id}>
											
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
														DeleteRequest(`/admin/photos/${link.id}/`, refresh)
													}}
												>
													<FormattedMessage id={'delete'} defaultMessage='delete' />
												</Button>
											</ModalFooter>
										</ModalContent>
									</Modal>
												<Image src={link.datafile} alt={''} />
											</Box>
										))}
									</SimpleGrid>
								</div>
							</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>

			<Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
				<ModalOverlay />
				<ModalContent dir={dirState}>
					<ModalHeader>
						<FormattedMessage id={'photos_add'} />
					</ModalHeader>

					<ModalBody>
						<FileUpload
							name='files'
							url='#'
							customUpload
							uploadHandler={onChange}
							accept='image/*'
							maxFileSize={1000000}
							chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}
							emptyTemplate={
								<p className='m-0'><FormattedMessage id={'drag_file'} /></p>
							}
							chooseLabel={
								<FormattedMessage
									id={'choose_files'}
									defaultMessage='choose file'
								/>
							}
							uploadLabel={
								<FormattedMessage
									id={'upload'}
									defaultMessage='upload file'
								/>
							}
							cancelLabel={
								<FormattedMessage
									id={'close'}
									defaultMessage='close '
								/>
							}
							
						/>
					</ModalBody>

					<ModalFooter>
						<Button variant='outline' mr={3} ml={3} onClick={onClose}>
							{<FormattedMessage id={'close'} defaultMessage='close' />}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Paginator
				first={basicFirst}
				rows={basicRows}
				totalRecords={photosResponse.data?.data.count}
				rowsPerPageOptions={[10, 20, 30]}
				onPageChange={onBasicPageChange}
			></Paginator>
		</Stack>
	);
};
PhotosAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};

export default PhotosAdmin;
async function refresh(response: any) {
	router.push('/admin/photos', '/admin/photos', {
		shallow: true,
	});
}
const itemGalleryTemplate = (item) => {
	return (
		<Card
			bg={'brand.white'}
			w={'full'}
			align='center'
			justify='center'
			m={'3px'}
			boxShadow={'l'}
			rounded={'xl'}
			border={'2px'}
			borderColor={'brand.blue'}
		>
			<CardBody>
				<Image
					src={item.datafile}
					onError={(e) =>
						(e.target.src =
							'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
					}
					alt={item.name}
					roundedTop={'full'}
					width={item.width}
					height={item.height}
					border={'1px'}
					borderColor={'brand.blue'}
				/>
			</CardBody>
			<CardFooter>
				<IconButton
					aria-label={'edit'}
					size={'lg'}
					onClick={() => DeleteRequest(`/admin/photos/${item.id}/`, refresh)}
					icon={
						<i
							className='pi pi-trash'
							style={{ fontSize: '1em', color: 'red' }}
						></i>
					}
				></IconButton>
			</CardFooter>
		</Card>
	);
};
