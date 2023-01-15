import {Box, Flex, Skeleton, SkeletonText, Text} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

export default function CopyRightDiv() {
    const { t } = useTranslation('common')
    return(

       
            <Box  bg={'brand.textGray'} boxShadow={'xl'}>
                <Flex bg={'brand.textGray'} align="center" justify="center"h={20} px={8} w={'full'} alignItems={'center'}  boxShadow={'l'}>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'} color={'brand.white'}>
                    {t('copy_right')}
                    </Text>
                </Flex>
            </Box>
       
    )
}