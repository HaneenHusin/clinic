import {
    Box,
    Container,
    SimpleGrid,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import SocialButton from "./social_button";
import CopyRightDiv from "./copy_right";
import { useTranslation } from 'next-i18next';
import Link from 'next/link';



export default function FooterBar() {
    const { t } = useTranslation('common');
    return (
        <Box
            bg={'brand.blue'}
            borderTopRadius={'3xl'}
            color={'brand.white'}>
            <Container as={Stack} maxW={'8xl'} py={10} >
                <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}>
                {t('footer_caption')}
                </Text>
                <SimpleGrid
                    pt={'20px'}
                    templateColumns={{sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr'}}
                    spacing={8}>
                    <Stack  spacing={6}>

                        <Text fontSize={'lg'}>
                        {t('social_media')}
                        </Text>
                        <Stack direction={'row'} spacing={6}  >
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
                    <Stack align={'flex-start'}  >

                        <Text fontSize={'lg'}> {t('contact_us_media')} </Text>
                        <Link href='/sign_in'>{t('login_now')}</Link>
                    </Stack>
                    <Stack align={'flex-start'} >
                        <Text fontSize={'lg'} >{t('about_us')}</Text>
                        <Link href={'/contact_us'}  shallow={true} >{t('contact_us')}</Link>
                    </Stack>

                </SimpleGrid>
            </Container>
            <CopyRightDiv />
        </Box>
            );
}