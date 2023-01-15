import {Card} from "@chakra-ui/card";
import {Avatar, Box, HStack, Spacer, Text, VStack} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import {Galleria} from "primereact/galleria";

export default function Feedback(galleriaService:any) {
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    return (
        <Card bg={'brand.white'} w= {{ base: '80%', md: '60%', lg: '50%' }} h={{ base: '65%', md: '70%', lg: '30%' }} rounded={'full'} >
            <Galleria value={galleriaService.galleriaService} responsiveOptions={responsiveOptions} numVisible={5}
                     
                      showThumbnails={false} showIndicators changeItemOnIndicatorHover
                      item={itemTemplate}/>
        </Card>


    )
}

const itemTemplate = (item) => {
    const { t } = useTranslation('common');
    return (

       <HStack p={"12"} justify={'space-between'}>
           <VStack    justify={'start'} align={'start'} width={"full"} >
               <Text  fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'semibold'}
                     color={'brand.blue'}>
                 {t('featured_recommendations')}
               </Text>
               <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                     color={'brand.textGray'}>
                  {t('parents_comment')}
               </Text>
           </VStack>
           <VStack width={"full"}>
            <HStack>
            <Avatar size='xs' name='Dan Abrahmov' src='https://bit.ly/dan-abramov'  />
            <Text fontSize={['md', 'lg', 'xl', '2xl']} fontWeight={'semibold'}
                 color={'brand.textGray'}>
               {item.title}
           </Text>
            </HStack>
          
           <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                 color={'brand.textGray'}>
               {item.brief}
           </Text>
           </VStack>
           
       </HStack>
    );
}
