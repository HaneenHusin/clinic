import {Card} from "@chakra-ui/card";
import {Avatar, Box, HStack, Spacer, Text, VStack} from "@chakra-ui/react";
import {Galleria} from "primereact/galleria";
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import { myDirectionState } from "../../Atoms/localAtoms";

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
    const [dirState] = useRecoilState(myDirectionState);
    return (
        <Card bg={'brand.white'} w= {{ base: '80%', md: '60%', lg: '50%' }} h={{ base: '65%', md: '70%', lg: '30%' }} rounded={'full'}  dir={dirState}>
            <Galleria value={galleriaService.galleriaService} responsiveOptions={responsiveOptions} numVisible={5}
                     
                      showThumbnails={false} showIndicators changeItemOnIndicatorHover
                      item={itemTemplate}/>
        </Card>


    )
}
const itemTemplate = (item) => {
    return (

       <HStack p={"4"} justify={'space-between'}>
           <VStack    justify={'start'} align={'start'} width={"full"} >
               <Text  fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'semibold'}
                     color={'brand.blue'}>
                   <FormattedMessage id={'featured_recommendations'}/>
               </Text>
               <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                     color={'brand.textGray'}>
                   <FormattedMessage id={'parents_comment'}/>
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
