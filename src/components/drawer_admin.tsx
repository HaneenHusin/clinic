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
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import CertificatesAdmin from '../../pages/admin/certificates_admin';
export function DrawerAdmin() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();
	const router = useRouter();
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
				placement='right'
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						{' '}
						<FormattedMessage id={'mange_your_clinic'} defaultMessage='mange your clinic' />
					</DrawerHeader>

					<DrawerBody>
					<Link href={'../../pages/admin/article_admin'}>
						<HStack
							justify={'space-between'}
							p={'8px'}
						>
							<Text fontSize={['sm', 'md', 'lg', 'xl']}>
								<FormattedMessage id={'article'} defaultMessage='article' />
							</Text>
							<i className='pi pi-book' style={{ fontSize: '2em' }}></i>
						</HStack>
						</Link>
						<Divider />

						<Link href={'../../pages/admin/certificates_admin'}>
							<HStack
								justify={'space-between'}
								p={'8px'}
							>
								<Text fontSize={['sm', 'md', 'lg', 'xl']}>
									<FormattedMessage
										id={'certificate'}
										defaultMessage='certificate'
									/>
								</Text>
								<i className='pi pi-bookmark' style={{ fontSize: '2em' }}></i>
							</HStack>
						</Link>
						<Divider />
					</DrawerBody>

					<DrawerFooter>
						<Button variant='outline' mr={3} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme='blue'>Save</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
