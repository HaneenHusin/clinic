import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
	HStack,
	Text,
	Divider,
	Link,
} from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
export function DrawerAdmin() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	const router = useRouter();
	const { t } = useTranslation("")
	return (
		<>
			<Button
				variant='primary'
				ref={btnRef}
				colorScheme='teal'
				onClick={onOpen}
				m={'5px'}
			>
				<i className='pi pi-bars' style={{ fontSize: '1em' }}></i>
			</Button>
			<Drawer
				isOpen={isOpen}
				placement={router.locale=="ar"?"left":"right"}
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
					{t('mange_your_clinic')}
					</DrawerHeader>

					<DrawerBody >
					
						<HStack
							justify={'space-between'}
							p={'8px'}
							cursor={"pointer"}
							_hover={{transform: "scale(1.05,1.05)"}}
							onClick={ ()=> router.push('/admin/article', '/admin/article', { shallow: true })}>
							<Text fontSize={['sm', 'md', 'lg', 'xl']}>
							{t('article')}
							</Text>
							<i className='pi pi-book' style={{ fontSize: '2em' ,color: 'lightblue' }}></i>
						</HStack>
						
						<Divider />
					
							<HStack
								justify={'space-between'}
								p={'8px'}
								mt={'10px'}
								cursor={"pointer"}
								_hover={{transform: "scale(1.05,1.05)"}}
								onClick={ ()=> router.push('/admin/certificates', '/admin/certificates', { shallow: true })}>
							
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>
								{t('certificate')}
								</Text>
								<i className='pi pi-bookmark' style={{ fontSize: '2em',color: 'lightblue'  }}></i>
							</HStack>
							<Divider />
							<HStack
								justify={'space-between'}
								p={'8px'}
								mt={'10px'}
								cursor={"pointer"}
								_hover={{transform: "scale(1.05,1.05)"}}
								onClick={ ()=> router.push('/admin/sliders', '/admin/sliders', {shallow: true })}>
							
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>
								{t('slider')}
								</Text>
								<i className='pi pi-images' style={{ fontSize: '2em',color: 'lightblue'  }}></i>
							</HStack>
						<Divider />

						<HStack
								justify={'space-between'}
								p={'8px'}
								mt={'10px'}
								cursor={"pointer"}
								_hover={{transform: "scale(1.05,1.05)"}}
								onClick={ ()=> router.push('/admin/information', '/admin/information', { shallow: true })}>
							
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>
								{t('information')}
								</Text>
								<i className='pi pi-user' style={{ fontSize: '2em',color: 'lightblue' }}></i>
							</HStack>
						<Divider />

						<HStack
								justify={'space-between'}
								p={'8px'}
								mt={'10px'}
								cursor={"pointer"}
								_hover={{transform: "scale(1.05,1.05)"}}
								onClick={ ()=> router.push('/admin/feedback', '/admin/feedback', { shallow: true })}>
							
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>
								{t('feedback')}
								</Text>
								<i className='pi pi-star' style={{ fontSize: '2em' ,color: 'lightblue' }}></i>
							</HStack>
						<Divider />
						<HStack
								justify={'space-between'}
								p={'8px'}
								mt={'10px'}
								cursor={"pointer"}
								_hover={{transform: "scale(1.05,1.05)"}}
								onClick={ ()=> router.push('/admin/photos', '/admin/photos',{ shallow: true })}>
							
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>
								{t('photos')}
								</Text>
								<i className='pi pi-paperclip' style={{ fontSize: '2em' ,color: 'lightblue' }}></i>
							</HStack>

							<Divider />
						<HStack
								justify={'space-between'}
								p={'8px'}
								mt={'10px'}
								cursor={"pointer"}
								_hover={{transform: "scale(1.05,1.05)"}}
								onClick={ ()=> router.push('/admin/quizes', '/admin/quizes',{ shallow: true })}>
							
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>
								{t('quizes')}
								</Text>
								<i className='pi pi-verified' style={{ fontSize: '2em' ,color: 'lightblue' }}></i>
							</HStack>

					</DrawerBody>

					<DrawerFooter >
						<Button variant='outline' mr={3} onClick={onClose}>
							Cancel
						</Button>
						
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
