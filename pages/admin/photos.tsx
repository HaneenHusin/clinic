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
import React, { ReactElement, useMemo, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { DeleteRequest, photosList, PostRequest } from '../../src/services/api';
import LayoutAdmin from '../../src/components/layout_admin';
import { NextPageWithLayout } from '../_app';
import router, { useRouter } from 'next/router';
import { mutate } from 'swr';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const PhotosAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [pageNum, setPageNum] = useState(1);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const [id, setId] = useState(0);
	const router = useRouter();
	const photosResponse = photosList(pageNum,-1);
	const { t } = useTranslation('');
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
		mutate(`/admin/photos/?page=${pageNum}&page_size=${-1}`)
	
	}
	function openModal() {
		onOpen();}

		function openDeleteModal( idValue: number) {
			onDeleteOpen();
			setId(idValue);
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
	const chooseOptions = {icon: 'pi pi-fw pi-plus p-1 m-1',className:'p-1 m-1'};
	const uploadOptions = {icon: 'pi pi-upload p-1 m-1', className: 'p-button-success p-1 m-1'};
	const cancelOptions = { icon: 'pi pi-times p-1 m-1', className: 'p-button-danger p-1 m-1'};
	return (
		<Stack p={'10px'}  margin={'2%'}>
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
				{t('photos')} 
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
										aria-label={'delete'}
										onClick= { () => openDeleteModal(link.id) }
										icon={
											<i
												className='pi pi-trash'
												style={{ fontSize: '1em', color: 'red' }}
											></i>
										}
									></IconButton>

									<Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
										<ModalOverlay />
										<ModalContent >
											<ModalHeader>{t('delete_item')}</ModalHeader>
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
														DeleteRequest(`/admin/photos/${id}/`, refresh)
													}}
												>
													{t('delete')}
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
				<ModalContent>
					<ModalHeader>
					{t('photos_add')}
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
								<p className='m-0'>{t('drag_file')}</p>
							}
							chooseLabel={
								t('choose_files')
							}
							uploadLabel={
								t('upload')	
								}
							cancelLabel={
								t('close')
							}
							
						/>
					</ModalBody>

					<ModalFooter>
						<Button variant='outline' mr={3} ml={3} onClick={onClose}>
						{t('close')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			{/* <Paginator
				first={basicFirst}
				rows={basicRows}
				totalRecords={photosResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator> */}
		</Stack>
	);
};
PhotosAdmin.getLayout = function getLayout(page: ReactElement) {
	return <LayoutAdmin>{page}</LayoutAdmin>;
};
export const getStaticProps = async ({ locale}:{ locale:string }) => ({
	props: {
	  ...(await serverSideTranslations(locale, ["common"])),
	}
  })
export default PhotosAdmin;