import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CustomGalleria from '../src/components/sliders';

export default function Article(props:any) {
    const router = useRouter();
const userData = JSON.parse(router.query.item);
console.log("prrrroooops : ",userData)
    return (
        <Stack minH={'50vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: useBreakpointValue({ base: '20%', md: '30%' }),
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'blue.400',
                                zIndex: -1,
                            }}>
                            Freelance
                        </Text>
                        <br />{' '}
                        <Text color={'blue.400'} as={'span'}>
                           {userData.title}
                        </Text>{' '}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                       {userData.body}
                    </Text>
                   
                </Stack>
            </Flex>
            <Flex flex={1}>
                {/* <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    rounded={"xl"}
                    align={'center'}
                    w={'100%'}
                    h={'100%'}
                    src={
                        'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                    }
                /> */}
                	<CustomGalleria galleriaService={userData.Photos}></CustomGalleria>
            </Flex>
        </Stack>
    );
}


