import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import {myDirectionState} from "../../Atoms/localAtoms";

export  default  function VideoPart(){
    const [dirState] = useRecoilState(myDirectionState);

    return(
        <HStack w={'full'} align="center" justify="center" pt={'4%'} dir={dirState}>
            <Box
                as='iframe'
                rounded={'lg'}
                border={'2px'}
                borderColor={'brand.white'}
                src='https://www.youtube.com/embed/wI2vqXsjsIo'
                width='50%'
                sx={{
                    aspectRatio: '16/9'
                }}
            />
            <VStack dir={dirState}>
                <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'semibold'}
                      color={'brand.blue'}><FormattedMessage id={'know_more'}/>
                </Text>
                <HStack dir={dirState}>
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