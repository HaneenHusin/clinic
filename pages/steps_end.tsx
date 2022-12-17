import {
    Box, Button,
    Heading,
    HStack, Icon, Input,
    Text,
    VStack
} from "@chakra-ui/react";
import React, {ReactElement, useState} from "react";
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import {Card} from "@chakra-ui/card";
import {CheckIcon} from '@chakra-ui/icons'
import {myDirectionState} from "../Atoms/localAtoms";
import { NextPageWithLayout } from "./_app";
import LayoutWithoutBar from "../src/components/layout_without_bar";


const StepsEnd: NextPageWithLayout = () => {
    const [dirState] = useRecoilState(myDirectionState);

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
StepsEnd.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutWithoutBar>
            {page}
        </LayoutWithoutBar>
    )
}

export default  StepsEnd;