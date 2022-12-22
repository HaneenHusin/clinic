import {
    Box, Button,
    Flex,
    HStack, IconButton,
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
import {ChevronDownIcon, CloseIcon, HamburgerIcon,} from '@chakra-ui/icons';
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import {myAbbBarLocalState, myDirectionState, myLocalState} from "../../Atoms/localAtoms";
import {useRouter} from "next/router";
import {getCookie, setCookie} from "../services/cookies_file";
import {DrawerAdmin} from "./drawer_admin";
import { useState } from 'react';

export  function AppBarAdmin() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const router = useRouter()
    const [dirState,setDirState] = useRecoilState(myDirectionState);
    const [appBarState, setAppBarState] = useRecoilState(myAbbBarLocalState);
    const [localState,setLocalState] = useRecoilState(myLocalState);
    const localValue = `${localState} `;

    async function setDirection(lang: string) {
        setCookie("language", lang);
        setAppBarState(localState == "ar" ? "AR" : "EN")
        console.log('langButton      ' + appBarState)
        setDirState(lang  === "ar"?"rtl":"ltr")
        const {pathname, asPath, query} = router
        router.reload();
        await router.push({pathname, query}, asPath, {locale: localState,shallow: true})

    }
    useState(async () => {
        setLocalState( getCookie("language"));
        setDirState(localState == "ar" ? "rtl" : "ltr");
        setAppBarState(localState == "ar" ? "AR" : "EN");
        console.log("dirrrrrr2 " + dirState)
        console.log("localState " + localState)

    })

    async function goLoginPage() {
        debugger
        const {pathname, asPath, query} = router
        await router.push( '/sign_in', '/sign_in'  , { locale: localValue.trim(),shallow: true } );
        
    }
    async function goSignUpPage() {
        debugger
        const { pathname, asPath, query } = router;
		await router.push('/sign_up', '/sign_up', { locale: localValue.trim() ,shallow: true});

    }
    async function goSite() {
        const {pathname, asPath, query} = router
        await router.push( '/sign_in','/sign_in',  { locale: localValue.trim(),shallow: true } );

    }
    return (
        <>

            <Box  bg={'brand.white'} boxShadow={'xl'} dir={dirState}>
                <Flex h={'24'} px={2} w={'full'} alignItems={'center'} boxShadow={'md'}>

                        <HStack display={'flex'} >
                            <Image src={'/assets/images/LOGO.svg'}height={{base: '50px', md: '60px'}}/>
                            <Text color='brand.blue'>ADHD Center</Text>
                        </HStack>


                    <Spacer w='calc(5vh)'/>

                    <Spacer w='calc(5vh)'/>
               <Button variant='outline' colorScheme='brand'
                                        display={{base: 'none', md: 'flex'}}
                                        onClick={() => goSite()}
                                        leftIcon={<Image src={'/assets/images/SIGN_IN.svg'} h={'20px'}></Image>}><FormattedMessage  id={'to_site'} defaultMessage="to site"/></Button>
                    
                    <Box p={'5px'}>
                        <Menu>
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
                        </Menu>
                        <DrawerAdmin/>
                    </Box>

                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{md: 'none'}}>
                        <Stack as={'nav'} spacing={4}>
                            <Button variant='outline' colorScheme='brand' m={"10px"}
                                    onClick={() => goLoginPage()}
                                    leftIcon={<Image src={'assets/images/SIGN_IN.svg'}
                                                     h={'30px'}></Image>}><FormattedMessage
                                id={'login'} defaultMessage="Login"/></Button>

                            <Button variant='primary' m={"10px"} onClick={() => goSignUpPage()}
                                    leftIcon={<Image src={'assets/images/SIGN_UP.svg'}   h={'30px'}></Image>}>
                                        <FormattedMessage id={'join_us'} defaultMessage="Join us"/></Button>
                        </Stack>

                    </Box>

                ) : null}

            </Box>


        </>
    );
}
export function  AppBar() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const router = useRouter()
    const [dirState,setDirState] = useRecoilState(myDirectionState);
    const [appBarState, setAppBarState] = useRecoilState(myAbbBarLocalState);
    const [localState,setLocalState] = useRecoilState(myLocalState);
    const localValue = `${localState} `;

    async function setDirection(lang: string) {
        setCookie("language", lang);
        setAppBarState(localState == "ar" ? "AR" : "EN")
        console.log('langButton      ' + appBarState)
        setDirState(lang  === "ar"?"rtl":"ltr")
        const {pathname, asPath, query} = router
        router.reload();
        await router.push({pathname, query}, asPath, {locale: localState,shallow: true})

    }
    useState(async () => {
        setLocalState( getCookie("language"));
        setDirState(localState == "ar" ? "rtl" : "ltr");
        setAppBarState(localState == "ar" ? "AR" : "EN");
        console.log("dirrrrrr2 " + dirState)
        console.log("localState " + localState)

    })

    async function goLoginPage() {
        debugger
        const {pathname, asPath, query} = router
        await router.push( '/sign_in', '/sign_in'  , { locale: localValue.trim(),shallow: true } );
        
    }
    async function goSignUpPage() {
        const {pathname, asPath, query} = router
        await router.push('/sign_up', '/sign_up',  { locale: localValue.trim(),shallow: true} );

    }
    return (
        <>

            <Box  bg={'brand.white'} boxShadow={'xl'} dir={dirState} >
                <Flex h={20} w={'full'} alignItems={'center'} boxShadow={'l'}>

                        <HStack display={'flex'} >
                            <Image src={'/assets/images/LOGO.svg'}height={{base: '50px', md: '60px'}}/>
                            <Text color='brand.blue'>ADHD Center</Text>
                        </HStack>


                    <Spacer w='calc(5vh)'/>

                   <Text pl={'2'} pr={'2'} fontSize={'l'} textColor={'brand.blue'} fontWeight={600}
                          display={{base: 'none', md: 'flex'}}><FormattedMessage
                        id={'we_are_available_string'} defaultMessage="We are available to help you 7/24"/>
                    </Text>
                    <Spacer w='calc(5vh)'/>
                    <HStack>
                        <Button variant='outline' colorScheme='brand'
                                display={{base: 'none', md: 'flex'}}
                                onClick={() => goLoginPage()}
                                leftIcon={<Image src={'/assets/images/SIGN_IN.svg'}
                                                 h={'30px'}></Image>}><FormattedMessage
                            id={'login'} defaultMessage="Login"/></Button>

                        <Button variant='primary'  onClick={() => goSignUpPage()}
                                display={{base: 'none', md: 'flex'}}
                                leftIcon={<Image src={'/assets/images/SIGN_UP.svg'}
                                                 h={'30px'}></Image>}><FormattedMessage
                            id={'join_us'} defaultMessage="Join us"/></Button>
                    </HStack>
                    <Box p={'5px'}>
                      <IconButton
                            size={'md'}
                            m={"5px"}
                            icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
                            aria-label={'Open Menu'}
                            display={{md: 'none'}}
                            onClick={isOpen ? onClose : onOpen}
                        /> 
                        <Menu>
                            <MenuButton as={Button} color={'brand.textGray'} rightIcon={<ChevronDownIcon/>}>
                                {appBarState}
                            </MenuButton>
                            <MenuList>
                                <MenuItem minH='48px' onClick={() => setDirection("ar")}>
                                    <Image
                                        boxSize='2rem'
                                        borderRadius='full'
                                        src='/assets/images/AR.svg'
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
                        </Menu>
                    </Box>

                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{md: 'none'}}>
                        <Stack as={'nav'} spacing={4}>
                            <Button variant='outline' colorScheme='brand' m={"10px"}
                                    onClick={() => goLoginPage()}
                                    leftIcon={<Image src={'/assets/images/SIGN_IN.svg'}
                                                     h={'30px'}></Image>}><FormattedMessage
                                id={'login'} defaultMessage="Login"/></Button>

                            <Button variant='primary' m={"10px"}
                                    leftIcon={<Image src={'/assets/images/SIGN_UP.svg'}  onClick={() => goSignUpPage()}     h={'30px'}></Image>}>
                                        <FormattedMessage id={'join_us'} defaultMessage="Join us"/></Button>
                        </Stack>

                    </Box>

                ) : null}

            </Box>


        </>
    );
}