import {Button, Image, Flex, HStack, Text, useDisclosure, VStack} from "@chakra-ui/react";
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
import React from "react";
import { useTranslation } from "next-i18next";

export default function TestCard(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { t } = useTranslation('common');
    const router = useRouter();
    return(
        <Flex w={{ base: '30%', md: '30%', lg: '20%' }} align="center" justify="center" bg={'brand.white'}
              boxShadow={'2xl'}
              rounded={'xl'}
              _hover={{transform: "scale(1.05, 1.05)",}}
              onClick={onOpen}
              cursor={'pointer'}

        >

            <VStack   >
                <Image src={"/assets/images/TEST_LOGO.svg"} alt="" width={'40%'}/>
                <HStack p={'3px'} >
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                          color={'brand.textGray'}>
                    {t('start_test')}
                    </Text>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'semibold'} color={'brand.blue'}>ADHD
                    </Text>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                          color={'brand.textGray'}>
                      {t('quick')}
                    </Text>
                </HStack>

            </VStack>
            <Modal isOpen={isOpen} onClose={onClose} size={['xs', 'sm', 'md', 'lg']}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <Image src={"/assets/images/TEST.svg"} alt="" height={'50%'} width={'50%'}/>
                            <Text align="center" fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                                  color={'brand.textBlue'} p={'4%'}>
                             {t('test_caption')}
                            </Text>
                        </VStack>

                    </ModalBody>

                    <ModalFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                        {t('cancel')}
                        </Button>
                        <Button variant='primary' onClick={()=> router.push('/quize', '/quize', { shallow: true })}>{t('lets_go')}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}
