import {
    Box, Button,
    Heading,
    HStack, Icon, Input,
    Flex,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import React, {useState} from "react";
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import {myLayoutState} from "../Atoms/layout";
import {Card} from "@chakra-ui/card";
import {CheckIcon} from '@chakra-ui/icons'
import {myDirectionState} from "../Atoms/localAtoms";


export default function StepsEnd() {
    const [headerFooterState, setHeaderFooterState] = useRecoilState(myLayoutState);
    const [dirState] = useRecoilState(myDirectionState);

    useState(() => {
        setHeaderFooterState({...headerFooterState, footer: "none", appBar: "none"})
        console.log("bottom " + headerFooterState.footer);

    });
    return (
        <Box
            dir={dirState}
            w={'100%'}
            h={'100%'}
            bg={'brand.blueLight'}
            backgroundSize={'cover'}>

            <HStack spacing={['2', '8', '36']} dir={dirState}>
                <svg width="400" height="600" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 L100,0 C25,50 50,75 0,100z" fill="#ffffffff"/>
                </svg>
                <VStack align={'center'} justify={'center'}>
                    <Icon as={CheckIcon} color={'brand.blue'} boxSize={10}/>
                    <Heading textColor={'brand.blue'}>
                        <FormattedMessage id={'question_end'}/>
                    </Heading>
                    <Card w={['100px', '400px', '600px']} pt={'15px'} bg={'brand.white'} rounded={'2xl'}
                          border={'2px'} borderColor={'brand.gray'} align={'center'} justify={'center'}>
                        <Text pt={'6%'} fontSize={'l'} textColor={'brand.blue'} fontWeight={600}><FormattedMessage
                            id={'enter_your_phone'}/>
                        </Text>
                        <Input type='number' m={'15px'} w={['100px', '200px', '400px']} placeholder='phone'
                               borderColor={'brand.blue'}/>
                        <Button w={'100px'} mb={'10px'} variant='primary'><FormattedMessage
                            id={'confirm'}/>
                        </Button>
                    </Card>

                </VStack>
                <Box></Box>
            </HStack>

            {/*<Box  >*/}
            {/*    <svg viewBox="0 0 100 100"  width="230" height="230">*/}
            {/*        <path transform="rotate(-180, 50, 50) " d="M0,0 l100,0 C25,50 50,75 0,100z" fill="#8aa7ca"/>*/}
            {/*    </svg>*/}
            {/*</Box>*/}
        </Box>

    );
}