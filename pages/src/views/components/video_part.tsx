import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";

export  default  function VideoPart(){
    return(
        <HStack w={'full'} align="center" justify="center" pt={'4%'}>
            <Box
                as='iframe'
                rounded={'lg'}
                border={'2px'}
                borderColor={'brand.white'}
                src='https://www.youtube.com/embed/wI2vqXsjsIo'
                width='25%'
                sx={{
                    aspectRatio: '16/9'
                }}
            />
            <VStack>
                <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'semibold'}
                      color={'brand.blue'}><FormattedMessage id={'know_more'}/>
                </Text>
                <HStack>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                          color={'brand.textGray'}><FormattedMessage id={'doctor'}/>
                    </Text>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'}
                          color={'brand.textGray'}>Ahmad mmmmm
                    </Text>
                </HStack>


            </VStack>
        </HStack>
    );
}