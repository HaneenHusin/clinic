import {Card} from "@chakra-ui/card";
import {Avatar, Box, HStack, Spacer, Text, VStack} from "@chakra-ui/react";
import {Galleria} from "primereact/galleria";
import {galleriaService} from "../services/Photos";
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import { myDirectionState } from "../../Atoms/localAtoms";

export default function CommentPart() {
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
        <Card bg={'brand.white'} w= {{ base: '55%', md: '60%', lg: '65%' }} rounded={'full'}  dir={dirState}>
            <Galleria value={galleriaService} responsiveOptions={responsiveOptions} numVisible={5}
                      style={{maxWidth: '100%'}}
                      showThumbnails={false} showIndicators changeItemOnIndicatorHover
                      item={itemTemplate}/>
        </Card>


    )
}
const itemTemplate = (item) => {
    return (

       <HStack m={'18px'}>
           <VStack  mt={'20px'}  justify={'start'} align={'start'} p={['12px']}>
               <Text  fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'semibold'}
                     color={'brand.blue'}>
                   <FormattedMessage id={'featured_recommendations'}/>
               </Text>
               <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                     color={'brand.textGray'}>
                   <FormattedMessage id={'parents_comment'}/>
               </Text>
           </VStack>
           <Box w={['4%' ,'10%']}></Box>
           <Avatar size='xs' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
           <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                 color={'brand.textGray'}>
               {item.itemImageSrc}
           </Text>


           <HStack>

           </HStack>
       </HStack>
    );
}
