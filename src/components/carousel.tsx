import {Carousel} from "primereact/carousel";
import {galleriaService} from "../services/Photos";
import {Card} from "@chakra-ui/card";
import {CardBody, Stack, Image, Text, Button, IconButton, HStack} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import { myDirectionState } from "../../Atoms/localAtoms";
import Article from "../../pages/article";
import {useRouter} from "next/router";

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

export default function CustomCarousel() {
        return (
            <div className="card">
                <Carousel value={galleriaService} itemTemplate={RelatedNewsClinic} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions}
                          showIndicators={false} ></Carousel>
            </div>

        );
}


export function RelatedNewsClinic() {
    const [dirState] = useRecoilState(myDirectionState);
    const router = useRouter()
    async function goArticlePage() {
        await router.push('/article');

    }
     return (
        <Card w={'80%'} bg={'brand.blue'} rounded={'xl'} dir={dirState}>
            <CardBody  dir={dirState}>
                <Image
                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'  dir={dirState}>
                    <Text>
                        This sofa is perfect for modern tropical spaces, baroque inspired
                        spaces, earthy toned spaces and for people who love a chic design with a
                        sprinkle of vintage design.
                    </Text>
                    <HStack onClick={() => goArticlePage()} cursor={"pointer"}    _hover={{transform: "scale(1.05, 1.05)",}}>
                        <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                              color={'brand.white'}>
                            <FormattedMessage id={'read_article'}/>
                        </Text>
                        {dirState=="rtl" ?
                            <IconButton colorScheme='brand.blue' aria-label={"more"}  >
                            <i className="pi pi-arrow-right" style={{'fontSize': '1em'}}></i>
                        </IconButton>
                            : <IconButton colorScheme='brand.blue' aria-label={"more"} >
                            <i className="pi pi-arrow-left" style={{'fontSize': '1em'}}></i>
                        </IconButton>}

                    </HStack>

                </Stack>
            </CardBody>
        </Card>

    )

}
