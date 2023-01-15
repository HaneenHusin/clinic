import {
	Box,
	Button,
	Flex,
	HStack,
	IconButton,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Skeleton,
	Spacer,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { ChevronDownIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useRecoilState } from 'recoil';
import { myAbbBarLocalState } from '../../Atoms/localAtoms';
import { useRouter } from 'next/router';
import { getCookie, setCookie, seti18Cookie } from '../services/cookies_file';
import { DrawerAdmin } from './drawer_admin';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

export function AppBarAdmin() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();
	const [appBarState, setAppBarState] = useRecoilState(myAbbBarLocalState);
	const { t } = useTranslation('common');

	async function setDirection(lang: string) {
		// setAppBarState(localState == "ar" ? "AR" : "EN")
		const { pathname, asPath, query } = router;
		router.reload();
		await router.push({ pathname, query }, asPath, { shallow: true });
	}
	useEffect(() => {
		let dir = router.locale == 'ar' ? 'rtl' : 'ltr';
		let lang = router.locale == 'ar' ? 'ar' : 'en';
		document.querySelector('html')?.setAttribute('dir', dir);
		document.querySelector('html')?.setAttribute('lang', lang);
		setAppBarState(lang == 'ar' ? 'AR' : 'EN');
	}, [router.locale]);
	async function goLoginPage() {
		const { pathname, asPath, query } = router;
		await router.push('/sign_in', '/sign_in', { shallow: true });
	}
	async function goSignUpPage() {
		const { pathname, asPath, query } = router;
		await router.push('/sign_up', '/sign_up', { shallow: true });
	}
	async function goSite() {
		const { pathname, asPath, query } = router;
		await router.push('../', '../', { shallow: true });
	}
	return (
		<>
			<Box bg={'brand.white'} boxShadow={'xl'}>
				<Flex h={'24'} px={2} w={'full'} alignItems={'center'} boxShadow={'md'}>
					<HStack display={'flex'}>
						<Image
							src={'/assets/images/LOGO.svg'}
							p={1}
							alt=' '
							height={{ base: '50px', md: '56px' }}
						/>
						<Text color='brand.blue'>ADHD Center</Text>
					</HStack>

					<Spacer w='calc(5vh)' />

					<Spacer w='calc(5vh)' />
					<Button
						variant='outline'
						colorScheme='brand'
						display={'flex'}
						onClick={() => goSite()}
						leftIcon={
							<Image
								src={'/assets/images/SIGN_IN.svg'}
								alt=''
								h={'20px'}
							></Image>
						}
					>
						{t('to_site')}
					</Button>

					<Box p={'5px'}>
						{/* <Menu>
                            <MenuButton as={Button} color={'brand.textGray'} rightIcon={<ChevronDownIcon/>}>
                                {appBarState}
                            </MenuButton>
                            <MenuList>
                                <MenuItem minH='48px' onClick={() => setDirection("ar")}>
                                    <Image
                                        boxSize='2rem'
                                        borderRadius='full'
                                        src='assets/images/AR.svg'
                                        alt='language'
                                        mr='12px'
                                    />
                                    <span color={'brand.textGray'}>AR</span>
                                </MenuItem>
                                <MenuItem minH='40px' onClick={() => setDirection("en")}>
                                    <i className="pi pi-globe" style={{'fontSize': '2em', 'marginRight': '12px'}}></i>
                                    <span className={'ml-12'} color={'brand.textGray'}>EN</span>
                                </MenuItem>
                            </MenuList>
                        </Menu> */}
						<DrawerAdmin />
					</Box>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							<Button
								variant='outline'
								colorScheme='brand'
								m={'10px'}
								onClick={() => goLoginPage()}
								leftIcon={
									<Image
										src={'assets/images/SIGN_IN.svg'}
										alt=''
										h={'30px'}
									></Image>
								}
							>
								{t('login')}
							</Button>

							<Button
								variant='primary'
								m={'10px'}
								onClick={() => goSignUpPage()}
								leftIcon={
									<Image
										src={'assets/images/SIGN_UP.svg'}
										alt=''
										h={'30px'}
									></Image>
								}
							>
								{t('join_us')}
							</Button>
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
export function AppBar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();
	const [appBarState, setAppBarState] = useRecoilState(myAbbBarLocalState);
	const { t } = useTranslation('');
	
	async function setDirection(lang: string) {
		const { pathname, asPath, query } = router;
		router.reload();
		await router.push({ pathname, query }, asPath, {
			locale: lang,
			shallow: true,
		});
	}

	async function goLoginPage() {
		const { pathname, asPath, query } = router;
		await router.push('/sign_in', '/sign_in', { shallow: true });
	}
	async function goSignUpPage() {
		const { pathname, asPath, query } = router;
		await router.push('/sign_up', '/sign_up', { shallow: true });
	}
	const { pathname, query, asPath } = router;


	const setLanguage = (locale:string)=>{
		debugger
		router.push(router.asPath, undefined, { locale: locale })
		seti18Cookie(locale)
	}
	useEffect(() => {
		let dir = router.locale == 'ar' ? 'rtl' : 'ltr';
		let lang = router.locale == 'ar' ? 'ar' : 'en';
		document.querySelector('html')?.setAttribute('dir', dir);
		document.querySelector('html')?.setAttribute('lang', lang);
		setAppBarState(lang == 'ar' ? 'AR' : 'EN');
	}, [router.locale]);
	return (
		<>
			<Box bg={'brand.white'} boxShadow={'xl'}>
				<Flex h={20} w={'full'} alignItems={'center'} boxShadow={'l'}>
					<HStack display={'flex'}>
						<Image
							src={'/assets/images/LOGO.svg'}
							p={1}
							height={{ base: '50px', md: '56px' }}
							alt=''
						/>
						<Text color='brand.blue'>ADHD Center</Text>
					</HStack>

					<Spacer w='calc(5vh)' />

					<Text
						pl={'2'}
						pr={'2'}
						fontSize={'l'}
						textColor={'brand.blue'}
						fontWeight={600}
						display={{ base: 'none', md: 'flex' }}
					>
						{t('we_are_available_string')}
					</Text>
					<Spacer w='calc(5vh)' />
					<HStack>
						<Button
							variant='outline'
							colorScheme='brand'
							display={{ base: 'none', md: 'flex' }}
							onClick={() => goLoginPage()}
							leftIcon={
								<Image
									src={'/assets/images/SIGN_IN.svg'}
									alt=''
									h={'30px'}
								></Image>
							}
						>
							{t('login')}
						</Button>

						<Button
							variant='primary'
							onClick={() => goSignUpPage()}
							display={{ base: 'none', md: 'flex' }}
							leftIcon={
								<Image
									src={'/assets/images/SIGN_UP.svg'}
									alt=''
									h={'30px'}
								></Image>
							}
						>
							{t('join_us')}{' '}
						</Button>
					</HStack>
					<Box p={'5px'}>
						<IconButton
							size={'md'}
							m={'5px'}
							icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
							aria-label={'Open Menu'}
							display={{ md: 'none' }}
							onClick={isOpen ? onClose : onOpen}
						/>
						<Menu>
							<MenuButton
								as={Button}
								color={'brand.textGray'}
								rightIcon={<ChevronDownIcon />}
							>
								{appBarState}
							</MenuButton>

							<MenuList>
								<Link href={{ pathname, query }} as={asPath} locale='ar'onClick={()=>setLanguage("ar")}>
									<MenuItem minH='48px'>
										<Image
											boxSize='2rem'
											borderRadius='full'
											src='/assets/images/AR.svg'
											alt='language'
											m='12px'
										/>
										<span color={'brand.textGray'}>AR</span>
									</MenuItem>
								</Link>
								<Link href={{ pathname, query }} as={asPath} locale='en' onClick={()=>setLanguage("en")}>
									<MenuItem minH='40px'>
										<i
											className='pi pi-globe'
											style={{ fontSize: '2em', margin: '12px' }}
										></i>
										<span className={'ml-12'} color={'brand.textGray'}>
											EN
										</span>
									</MenuItem>
								</Link>
							</MenuList>
						</Menu>
					</Box>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: 'none' }}>
						<Stack as={'nav'} spacing={4}>
							<Button
								variant='outline'
								colorScheme='brand'
								m={'10px'}
								onClick={() => goLoginPage()}
								leftIcon={
									<Image
										src={'/assets/images/SIGN_IN.svg'}
										alt=''
										h={'30px'}
									></Image>
								}
							>
								{t('login')}
							</Button>

							<Button
								variant='primary'
								m={'10px'}
								leftIcon={
									<Image
										src={'/assets/images/SIGN_UP.svg'}
										alt=''
										onClick={() => goSignUpPage()}
										h={'30px'}
									></Image>
								}
							>
								{t('join_us')}
							</Button>
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
