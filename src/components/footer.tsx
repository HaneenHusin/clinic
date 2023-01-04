import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import SocialButton from "./social_button";
import {myDirectionState} from "../../Atoms/localAtoms";
import CopyRightDiv from "./copy_right";



export default function FooterBar() {
    const [dirState] = useRecoilState(myDirectionState);
    return (
        <Box
            dir={dirState}
            bg={'brand.blue'}
            borderTopRadius={'3xl'}
            color={'brand.white'}>
            <Container as={Stack} maxW={'8xl'} py={10} dir={dirState}>
                <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}>
                    <FormattedMessage id={'footer_caption'}/>
                </Text>
                <SimpleGrid
                    pt={'20px'}
                    dir={dirState}
                    templateColumns={{sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr'}}
                    spacing={8}>
                    <Stack  spacing={6}>

                        <Text fontSize={'lg'}>
                            <FormattedMessage id={'social_media'}/>
                        </Text>
                        <Stack direction={'row'} spacing={6}  dir={dirState}>
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
                    <Stack align={'flex-start'}  dir={dirState}>

                        <Text fontSize={'lg'}>  <FormattedMessage id={'contact_us_media'}/> </Text>
                        <Link href='/sign_in'><FormattedMessage id={'login_now'}/></Link>
                    </Stack>
                    <Stack align={'flex-start'}  dir={dirState}>
                        <Text fontSize={'lg'} ><FormattedMessage id={'about_us'}/></Text>
                        <Link href={'/contact_us'}><FormattedMessage id={'contact_us'}/></Link>
                    </Stack>

                </SimpleGrid>
            </Container>
            <CopyRightDiv />
        </Box>
            );
}