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
} from '@chakra-ui/react';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';
import { FormattedMessage } from 'react-intl';
import React, { useMemo, useState } from 'react';
import { galleriaService } from '../../src/services/Photos';
import { FileUpload } from 'primereact/fileupload';
import { Galleria } from 'primereact/galleria';
import { useAxios } from '../../src/services/request';
import { ARTICLE_lIST_API_URL } from '../../src/http-endpoint';
import { ArticleList } from '../../src/types/article_list';

export default function CertificatesAdmin() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [imgsSrc, setImgsSrc] = useState([]);
  const [isEdit,setIsEdit ] = useState(false);

	const onChange = (e) => {
		debugger;
		for (const file of e.files) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				setImgsSrc((imgs) => [...imgs, reader.result]);
				console.log('imgsSrc ' + imgsSrc);
			};
			reader.onerror = () => {
				console.log(reader.error);
			};
		}
	};
function  openModal(){
  onOpen();
  setIsEdit(true)
}
function  openEditModal(){
  onOpen();
  setIsEdit(false)
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
		<Stack p={'10px'} >
			<HStack justify={'space-between'} m={'10px'}>
				<Text fontSize={['lg', 'xl', '2xl', '3xl']} fontWeight={'bold'}>
					<FormattedMessage id={'certificate'}   defaultMessage="certificate" />
				</Text>
				<Button
					variant='outline'
					colorScheme='brand'
					onClick={openModal}
				>
					<i
						className='pi pi-plus'
						style={{ fontSize: '1em', marginRight: '12px' }}
					></i>
					<FormattedMessage id={'import'}  defaultMessage="import" />
				</Button>
			</HStack>
			<TableContainer w={'full'}> 
				<Table variant='striped' border={'0px'} colorScheme={'brand.dark'}  size={{base:'xs',md:'md',lg:'lg'}}>
					<TableCaption>ADHD CENTER</TableCaption>
					<Thead>
						<Tr>
							<Th
								fontSize={['sm', 'md', 'lg', 'xl']}
								fontWeight={'bold'}
							>
								<FormattedMessage id={'images'}  defaultMessage="images"/> 
							</Th>
							<Th
								fontSize={['sm', 'md', 'lg', 'xl']}
								fontWeight={'bold'}
							>
								<FormattedMessage id={'title'}  defaultMessage="title" />
							</Th>
							<Th
								fontSize={['sm', 'md', 'lg', 'xl']}
								fontWeight={'bold'}
							>
									<FormattedMessage id={'sluge'} defaultMessage="sluge"/>
							</Th>
              <Th
								fontSize={['sm', 'md', 'lg', 'xl']}
								fontWeight={'bold'}
							>
									<FormattedMessage id={'body'} defaultMessage="body" />
							</Th>
						</Tr>
					</Thead>
					<Tbody>
						{galleriaService.map((item) => (
							<Tr key={item.title}>
								<Td w={'15%'} h={'15%'}>
									{' '}
									{/* <Image src={item.itemImageSrc} rounded={'lg'} /> */}
                  <Galleria value={galleriaService} responsiveOptions={responsiveOptions} numVisible={5}
                  style={{maxWidth: '100%'}}
                  showThumbnails={false} showIndicators changeItemOnIndicatorHover 
                  item={itemGalleryTemplate}/>
								</Td>
                <Tooltip label=	{item.thumbnailImageSrc}>
								<Td fontSize={['sm', 'md', 'lg', 'xl']} maxWidth={"100px"}  textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"}>
									{item.thumbnailImageSrc}
								</Td>
                </Tooltip>
                <Tooltip label=	{item.thumbnailImageSrc}>
								<Td fontSize={['sm', 'md', 'lg', 'xl']}maxWidth={"100px"}  textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"}>{item.title}</Td>
                </Tooltip>
                <Tooltip label=	{item.thumbnailImageSrc}>
                <Td fontSize={['sm', 'md', 'lg', 'xl']}maxWidth={"100px"}  textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"}>{item.title}</Td>
								</Tooltip>
                <Td>
									{' '}
									<IconButton
										aria-label={'edit'}
                    onClick={openEditModal}
										icon={
											<i
												className='pi pi-pencil'
												style={{ fontSize: '1em', color: 'green' }}
											></i>
										}
									></IconButton>{' '}
								</Td>
								<Td>
									{' '}
									<IconButton
										aria-label={'edit'}
										icon={
											<i
												className='pi pi-trash'
												style={{ fontSize: '1em', color: 'red' }}
											></i>
										}
									></IconButton>{' '}
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>

		{isEdit==true ? 
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>	<FormattedMessage id={'add_article'} /></ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack spacing={3}>
        <Box>
        <label ><FormattedMessage id={'title'} defaultMessage="title"/></label>
          <Input variant='outline'/>
          </Box>
          <Box>
          <label ><FormattedMessage id={'sluge'} defaultMessage="sluge"/></label>
          <Input variant='outline' />
          </Box>
          <Box>
          <label ><FormattedMessage id={'body'} defaultMessage="body"/></label>
          <Textarea  />
          </Box>
         
          <label ><FormattedMessage id={'choose_file'} defaultMessage="choose file"/></label>
          <FileUpload
            multiple
            mode='basic'
            name='choose_file'
            url='https://primefaces.org/primereact/showcase/upload.php'
            accept='image/*'
            customUpload
            uploadHandler={onChange}
            chooseLabel={<FormattedMessage id={'choose_files'} defaultMessage="choose file"/>}
          />
          <div>
            {/* <Input onChange={onChange} type="file" name="file" multiple  variant='outline'/> */}
            <SimpleGrid spacing={5} columns={[2, 3]} templateColumns='repeat(3, 1fr)' w='full%'>
                {imgsSrc.map((link) => (
               <Image  src={link} />
            
            ))}</SimpleGrid>
          
          </div>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button variant='outline' mr={3} onClick={onClose}>
        {<FormattedMessage id={'close'} defaultMessage="close"/>}
        </Button>
        <Button variant='primary'>{<FormattedMessage id={'upload'} defaultMessage="upload"/>}</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
    :
    <Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>	<FormattedMessage id={'edit_article'} defaultMessage="Edit article" /></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={3}>
            <Box>
            <label ><FormattedMessage id={'title'}defaultMessage="title"/></label>
							<Input variant='outline'/>
              </Box>
              <Box>
              <label ><FormattedMessage id={'sluge'}defaultMessage="sluge"/></label>
							<Input variant='outline' />
              </Box>
              <Box>
              <label ><FormattedMessage id={'body'} defaultMessage="body"/></label>
							<Textarea  />
              </Box>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button variant='outline' mr={3} onClick={onClose}>
						{<FormattedMessage id={'close'} defaultMessage="close"/>}
						</Button>
						<Button variant='primary'>{<FormattedMessage id={'upload'} defaultMessage="upload"/>}</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
    }	
		</Stack>
	);
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
      border={"2px"}
      borderColor={'brand.blue'}
		>
			<CardBody>
				<Image
					src={item.itemImageSrc}
					onError={(e) =>
						(e.target.src =
							'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
					}
					alt={item.alt}
					style={{ width: '100%', display: 'block' }}
				/>
			</CardBody>
		</Card>
	);
};
