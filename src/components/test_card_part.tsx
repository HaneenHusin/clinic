import {Button, Center, Flex, HStack, Text, useDisclosure, VStack} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {myDirectionState} from "../../Atoms/localAtoms";
import React from "react";

export default function TestCard(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [dirState] = useRecoilState(myDirectionState);

    const router = useRouter();
    return(
        <Flex w={{ base: '30%', md: '30%', lg: '20%' }} align="center" justify="center" bg={'brand.white'}
              boxShadow={'2xl'}
              rounded={'xl'}
              _hover={{transform: "scale(1.05, 1.05)",}}
              onClick={onOpen}
              cursor={'pointer'}
              dir={dirState}

        >

            <VStack dir={dirState}  >
                <img src={"/assets/images/TEST_LOGO.svg"} width={'40%'}/>
                <HStack p={'8px'}>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                          color={'brand.textGray'}>
                        <FormattedMessage id={'start_test'}/>
                    </Text>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'semibold'} color={'brand.blue'}>ADHD
                    </Text>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                          color={'brand.textGray'}>
                        <FormattedMessage id={'quick'}/>
                    </Text>
                </HStack>

            {/*<p className={"font-size:14px; color:#538b01; font-weight:bold; font-style:italic;"}>*/}
            {/*    <FormattedMessage id={'start_test'}></FormattedMessage>*/}
            {/*    <span className="color: #ff0000">January 30, 2011</span>*/}
            {/*    and you could win up to $$$$ — including amazing*/}
            {/*    <span className="color: #0000a0">summer</span>*/}
            {/*    trips!*/}
            {/*</p>*/}
            </VStack>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack dir={dirState}>
                            <img src={"/assets/images/TEST.svg"} height={'50%'} width={'50%'}/>
                            <Text align="center" fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                                  color={'brand.textBlue'} p={'4%'}>
                                <FormattedMessage id={'test_caption'}/>
                            </Text>
                        </VStack>

                    </ModalBody>

                    <ModalFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='primary' onClick={()=> router.push('/quize', '/quize', { shallow: true })}> <FormattedMessage id={'lets_go'}/></Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}