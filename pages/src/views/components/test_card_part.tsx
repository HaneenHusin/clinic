import {Flex, HStack, Text, VStack} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";

export default function TestCard( ){
    return(
        <Flex w={['50%', '40%', '30%', '20%']} align="center" justify="center" bg={'brand.white'}
              boxShadow={'2xl'}
              rounded={'xl'}>
            <VStack>
                <img src={"assets/images/TEST_LOGO.svg"} width={'40%'}/>
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
            </VStack>


        </Flex>
    );
}