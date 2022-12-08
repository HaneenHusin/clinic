import {Box, Flex, Text} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import {myLayoutState} from "../Atoms/layout";

export default function CopyRightDiv() {
    const [headerFooterState] = useRecoilState(myLayoutState);
    const displayFooterBar=`${headerFooterState.footer} `;
    return(
       <Box display={displayFooterBar} bg={'brand.textGray'} boxShadow={'xl'}>
           <Flex bg={'brand.textGray'} align="center" justify="center"h={20} px={8} w={'full'} alignItems={'center'}  boxShadow={'l'}>
               <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'} color={'brand.white'}>
                   <FormattedMessage id={'copy_right'}/>
               </Text>
               </Flex>
       </Box>
    )
}