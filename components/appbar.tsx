import {
    Box, Button,
    Flex,
    HStack,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import {ChevronDownIcon, CloseIcon, HamburgerIcon,} from '@chakra-ui/icons';
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import {myAbbBarLocalState, myDirectionState, myLocalState} from "../Atoms/localAtoms";
import {useRouter} from "next/router";
import {myLayoutState} from "../Atoms/layout";
import {setCookie} from "../pages/services/lang_cookies";

export default function AppBar() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const router = useRouter()
    const [headerFooterState] = useRecoilState(myLayoutState);
    const displayAppBar = `${headerFooterState.appBar} `;
    const [localState] = useRecoilState(myLocalState);
    const [dirState] = useRecoilState(myDirectionState);
    const [appBarState,setAppBarState] = useRecoilState(myAbbBarLocalState);


    async function setDirection(lang: string) {
        // debugger
        // let newLang: Lang;
        // newLang = {local: lang, dir: lang  === "ar"?"rtl":"ltr"};
        // myLangService.addLang(newLang);
        // dirLang=myLangService.getLang();
        setCookie("language", lang);

        setAppBarState(localState  == "ar"?"AR":"EN")
        console.log('langButton      ' + appBarState)
        // setDirState(lang  === "ar"?"rtl":"ltr")
        // setLocalState(lang  === "ar"?"AR":"EN")
        // console.log('dirLang  '+dirLang.dir)
        const {pathname, asPath, query} = router
        router.reload();
        await router.push({pathname, query}, asPath, {locale: lang})

    }

    async function goLoginPage() {
        await router.replace('/sign_in');

    }

    return (
        <>
            <Box display={displayAppBar} bg={'brand.white'} boxShadow={'xl'} dir={dirState}>
                <Flex h={20} px={8} w={'full'} alignItems={'center'} boxShadow={'l'}>
                    {/*<IconButton*/}
                    {/*    size={'md'}*/}
                    {/*    icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}*/}
                    {/*    aria-label={'Open Menu'}*/}
                    {/*    display={{md: 'none'}}*/}
                    {/*    onClick={isOpen ? onClose : onOpen}*/}
                    {/*/>*/}
                    <HStack>
                        <Image src={'assets/images/LOGO.svg'}/>
                        <Text color='brand.blue'>ADHD Center</Text>
                    </HStack>

                    <Spacer w='calc(5vh)'/>

                    <Text pl={'2'} pr={'2'} fontSize={'l'} textColor={'brand.blue'} fontWeight={600}
                          display={{base: 'none', md: 'flex'}}><FormattedMessage
                        id={'we_are_available_string'}/>
                    </Text>
                    <Spacer w='calc(5vh)'/>
                    <HStack>
                        <Button variant='outline' colorScheme='brand'
                                onClick={() => goLoginPage()}
                                leftIcon={<Image src={'assets/images/SIGN_IN.svg'}
                                                 h={'30px'}></Image>}><FormattedMessage
                            id={'login'}/></Button>

                        <Button variant='primary'
                                leftIcon={<Image src={'assets/images/SIGN_UP.svg'}
                                                 h={'30px'}></Image>}><FormattedMessage
                            id={'join_us'}/></Button>
                    </HStack>
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

                    </Box>

                </Flex>

                {/*{isOpen ? (*/}
                {/*    <Box pb={4} display={{md: 'none'}}>*/}
                {/*        <Stack as={'nav'} spacing={4}>*/}

                {/*        </Stack>*/}

                {/*    </Box>*/}

                {/*) : null}*/}

            </Box>


        </>
    );
}