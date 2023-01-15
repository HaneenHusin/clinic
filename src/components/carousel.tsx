import {Carousel} from "primereact/carousel";
import {Card} from "@chakra-ui/card";
import {CardBody, Stack, Image, Text, Button, IconButton, HStack, Flex, Box} from "@chakra-ui/react";
import {useRouter} from "next/router";
import parse from 'html-react-parser';
import { useTranslation } from "next-i18next";

const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];

export default function CustomCarousel(galleriaService:any) {
        return (
          
            <div className="card">
                <Carousel value={galleriaService.galleriaService} itemTemplate={RelatedNewsClinic} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions}
                          showIndicators={false} ></Carousel>
            </div>

        );
}


export function RelatedNewsClinic(item) {
    const router = useRouter()
    const { t } = useTranslation('');
    
    async function goArticlePage(item:Number) {
        router.push( `/home/${item}/article`,  undefined, { shallow: true})
         
       
    }
     return (
        <Card w={'70%'}  bg={'brand.blue'} rounded={'3xl'}>
            <CardBody  >
                <Image
                    src={item?.photos_list[0]?.datafile}
                    alt=''
                    borderRadius='lg'
                    h={"60%"}
                    width="6xl"
                />
                <Stack mt='6' spacing='3' color={"brand.gray"} fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'}>
                    <Text>
                    {parse(`${item.title}`)}
                    </Text>
                    <HStack onClick={() => goArticlePage(item.id)} cursor={"pointer"}    _hover={{transform: "scale(1.05, 1.05)",}}>
                        <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                              color={'brand.white'}>
                            {t('read_article')}
                        </Text>
                        {router.locale=="ar" ?
                            <IconButton colorScheme='brand.blue' aria-label={"more"}  >
                            <i className="pi pi-arrow-left" style={{'fontSize': '1em'}}></i>
                        </IconButton>
                            : <IconButton colorScheme='brand.blue' aria-label={"more"} >
                            <i className="pi pi-arrow-right" style={{'fontSize': '1em'}}></i>
                        </IconButton>}

                    </HStack>

                </Stack>
            </CardBody>
        </Card>
      

    )

}
