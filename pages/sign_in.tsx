import {
    Box, Button, Checkbox,
    HStack,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Stack,
    Text, useColorModeValue,
    VStack
} from "@chakra-ui/react";
import {useState} from "react";
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import {myLayoutState} from "../Atoms/layout";
import {myDirectionState, myLocalState} from "../Atoms/localAtoms";
import SocialButton from "../components/social_button";

export default function SignIn() {
    const [headerFooterState, setHeaderFooterState] = useRecoilState(myLayoutState);

    useState(() => {
        setHeaderFooterState({...headerFooterState, footer: "none", appBar: "none"})
        console.log("bottom " + headerFooterState.footer);

    });
    const [localState] = useRecoilState(myLocalState);
    const localValue = `${localState} `
    const [dirState] = useRecoilState(myDirectionState);;
    return (
        <Box
            w={'full'}
            h={'100vh'}
            bg={'brand.white'}
            backgroundSize={'cover'}
            p={'8%'}
            dir={dirState}
        >
            <HStack spacing={"72"}  dir={dirState}>
                <VStack>
                    <Image src={'assets/images/Clinic.svg'}/>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} pt={'15px'} color={'brand.blue'} fontWeight={'semibold'}>
                        ADHD Center Online Clinic
                    </Text>
                </VStack>
                <VStack align={'start'}  dir={dirState}>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} pt={'15px'} color={'brand.blue'} fontWeight={'semibold'}>
                        <FormattedMessage id={'welcome_our_clinic'}/>
                    </Text>
                    <Stack spacing={4}>
                        <InputGroup>
                            {localValue === "EN" ? <InputLeftElement
                                pointerEvents='none'
                                color={'brand.blue'}
                                children={<i className="pi pi-envelope"></i>}
                            /> : <InputRightElement
                                pointerEvents='none'
                                color={'brand.blue'}
                                children={<i className="pi pi-envelope"></i>}
                            />}

                            <Input type='email' placeholder='Email' borderColor={'brand.blue'}/>
                        </InputGroup>

                        <InputGroup>
                            {localValue === "EN" ? <InputLeftElement
                                pointerEvents='none'
                                color={'brand.blue'}
                                children={<i className="pi pi-lock"></i>}
                            /> : <InputRightElement
                                pointerEvents='none'
                                color={'brand.blue'}
                                children={<i className="pi pi-lock"></i>}
                            />}
                            <Input placeholder='Password' type='password' borderColor={'brand.blue'}/>
                        </InputGroup>
                    </Stack>
                    <Text fontSize={['sm']} color={'brand.textGray'} textDecoration={'underline'}
                          fontWeight={'semibold'}>
                        <FormattedMessage id={'forget_pass'}/>
                    </Text>
                    <HStack pt={'20%'} spacing={20}>
                        <Button w={'100px'} variant='primary'><FormattedMessage
                            id={'login'}/>
                        </Button>
                        <Checkbox colorScheme='blue' defaultChecked>
                            <Text fontSize={['sm']} color={'brand.textGray'}>
                                <FormattedMessage id={'remember_me'}/>
                            </Text>

                        </Checkbox>
                    </HStack>
                    <Text pt={'50px'} fontSize={['sm', 'md']} color={'brand.textGray'} fontWeight={'semibold'}>
                        <FormattedMessage id={'login_by'}/>
                    </Text>
                    <HStack>
                        <SocialButton label={'Facebook'} href={'#'}
                                      bgColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.100')}>
                            <i style={{'fontSize': '1.5em'}} className="pi pi-facebook"></i>
                        </SocialButton>
                        <SocialButton label={'Facebook'} href={'#'}
                                      bgColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.100')}>
                            <i style={{'fontSize': '1.5em'}} className="pi pi-google"></i>
                        </SocialButton>
                    </HStack>

                </VStack>
            </HStack>
        </Box>

    );
}