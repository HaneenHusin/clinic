import {
    Box,
    chakra,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    VisuallyHidden,
    Input,
    IconButton,
    useColorModeValue,
} from '@chakra-ui/react';
import {ReactNode} from 'react';
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import {myDirectionState} from "../../../../Atoms/directionAtoms";
import { myLayoutState } from '../../../../Atoms/layout';
import SocialButton from "./social_button";



export default function FooterBar() {
    const [dirState, setDirState] = useRecoilState(myDirectionState);
    const [headerFooterState, setHeaderFooterState] = useRecoilState(myLayoutState);
    const displayFooterBar=`${headerFooterState.footer} `;
    return (
        <Box
            dir={dirState}
            display={displayFooterBar}
            bg={'brand.blue'}
            borderTopRadius={'3xl'}
            color={'brand.white'}>
            <Container as={Stack} maxW={'8xl'} py={10} dir={dirState}>
                <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'semibold'}>
                    <FormattedMessage id={'footer_caption'}/>
                </Text>
                <SimpleGrid
                    pt={'20px'}
                    templateColumns={{sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr'}}
                    spacing={8}>
                    <Stack  spacing={6}>

                        <Text fontSize={'sm'}>
                            <FormattedMessage id={'social_media'}/>
                        </Text>
                        <Stack direction={'row'} spacing={6}>
                            <SocialButton label={'Twitter'} href={'#'} bgColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}>

                                <i className="pi pi-twitter"></i>

                            </SocialButton>
                            <SocialButton label={'Facebook'} href={'#'} bgColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}>
                                <i className="pi pi-facebook"></i>
                            </SocialButton>
                            <SocialButton label={'Instagram'} href={'#'} bgColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}>
                                <i className="pi pi-instagram"></i>
                            </SocialButton>
                        </Stack>
                    </Stack>
                    <Stack align={'flex-start'}>

                        <Link href={'#'}>  <FormattedMessage id={'contact_us_media'}/> </Link>
                        <Link href={'#'}><FormattedMessage id={'login_now'}/></Link>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Link href={'#'}><FormattedMessage id={'about_us'}/></Link>
                        <Link href={'#'}><FormattedMessage id={'contact_us'}/></Link>
                    </Stack>

                </SimpleGrid>
            </Container>
        </Box>
    );
}