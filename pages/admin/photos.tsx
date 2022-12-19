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
	VStack,
	Button,
	Image,
	Spacer,
	Stack,
	IconButton,
	useDisclosure,
	Input,
	Textarea,
	Card,
	CardBody,
	SimpleGrid,
	Tooltip,
	FormLabel,
    CardHeader,
    CardFooter,
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
import { Galleria } from 'primereact/galleria';
import {
    DeleteRequest,
	photosList,
	PostRequest,
} from '../../src/services/api';
import { Formik } from 'formik';
import LayoutAdmin from '../../src/components/layout_admin';
import { NextPageWithLayout } from '../_app';
import { useRecoilState } from 'recoil';
import { myDirectionState } from '../../Atoms/localAtoms';
import router, { useRouter } from 'next/router';

const PhotosAdmin: NextPageWithLayout = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgsSrc, setImgsSrc] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const photosResponse = photosList(1, 10);
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const router = useRouter();


	const onChange = (e) => {
		debugger;
		// for (const file of e.files) {
		// 	const reader = new FileReader();
		// 	reader.readAsDataURL(file);
		// 	reader.onload = () => {
		// 		setImgsSrc((imgs) => [...imgs, file.objectURL]);
		// 		console.log('imgsSrc ' + imgsSrc);
		// 	};
		// 	reader.onerror = () => {
		// 		console.log(reader.error);
		// 	};
		// }
		// get files from event on the input element as an array objectURL
		let files = [...e.files];

		if (files && files.length > 0) {
			const formData = new FormData();
			files?.forEach((file) => {
				formData.append('files', file.objectURL);
				setImgsSrc((imgs) => [...imgs, formData]);
			});
			console.log('files....' + files);
		}
	};
	async function refresh(response: any) {
		onClose();
		router.push('/admin/photos', '/admin/photos', {
			shallow: true,
		});
	}
	function openModal() {
		onOpen();
		setIsEdit(true);
		console.log('photos' + photosResponse.data);
		console.log('index..' + index);
	}
	function openEditModal(indexValue: number, idValue: number) {
		debugger;
		onOpen();
		setIsEdit(false);
		setIndex(indexValue);
		setId(idValue);
		setImgsSrc((imgs) => [...imgs, []]);
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
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
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
							<Tr >
								<Td w={'15%'} h={'15%'}>
									<Galleria
										value={photosResponse.data?.data.results}
										responsiveOptions={responsiveOptions}
										numVisible={5}
										style={{ maxWidth: '100%' }}
										showThumbnails={false}
										showIndicators
										changeItemOnIndicatorHover
										item={itemGalleryTemplate}
									/>
								</Td>
							</Tr>
						
					</Tbody>
				</Table>
			</TableContainer>

				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent dir={dirState}>
						<ModalHeader>
							<FormattedMessage id={'add_article'} />
						</ModalHeader>
						<Formik
							initialValues={{
								title: '',
								photos: '',
							}}
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
										photos: imgsSrc,
									};
									PostRequest('/admin/photos/', dataToRequestAPI, refresh);
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

										

											<FormLabel>
												<FormattedMessage
													id={'choose_file'}
													defaultMessage='choose file'
												/>
											</FormLabel>
											<FileUpload
												multiple
												mode='basic'
												name='choose_file'
												url='https://primefaces.org/primereact/showcase/upload.php'
												accept='image/*'
												customUpload
												uploadHandler={onChange}
												onChange={handleChange}
												onBlur={handleBlur}
												borderColor={'brand.blue'}
												value={values.photos}
												chooseLabel={
													<FormattedMessage
														id={'choose_files'}
														defaultMessage='choose file'
													/>
												}
											/>
											<div>
												<SimpleGrid
													spacing={5}
													columns={[2, 3]}
													templateColumns='repeat(3, 1fr)'
													w='full%'
												>
													{imgsSrc.map((link) => (
														<Image src={link} />
													))}
												</SimpleGrid>
											</div>
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
                    roundedLeft={"md"}
					style={{ width: '100%', display: 'block' }}
				/>
			</CardBody>
            <CardFooter>
            <IconButton
					aria-label={'edit'}
                    size={"lg"}
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
