import {Box, Flex, Skeleton, SkeletonText, Text} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";

export default function CopyRightDiv() {
    return(

       
            <Box  bg={'brand.textGray'} boxShadow={'xl'}>
                <Flex bg={'brand.textGray'} align="center" justify="center"h={20} px={8} w={'full'} alignItems={'center'}  boxShadow={'l'}>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'} color={'brand.white'}>
                        <FormattedMessage id={'copy_right'}/>
                    </Text>
                </Flex>
            </Box>
       
    )
}