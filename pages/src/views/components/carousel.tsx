import {Carousel} from "primereact/carousel";
import {galleriaService} from "../../services/Photos";
import {Card, CardHeader} from "@chakra-ui/card";
import {useRouter} from "next/router";
import {CardBody, Heading, Stack, Image, Text, Button, IconButton, HStack, Toast} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";
import {useRecoilState} from "recoil";
import {myDirectionState} from "../../../../Atoms/directionAtoms";
import { Steps } from "primereact/steps";
import {useRef, useState} from "react";

const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '600px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1
    }
];

export default function CustomCarousel(template:any){

   if (template==='relatedNews')
   {
       return (
       <Carousel value={galleriaService} itemTemplate={RelatedNewsClinic}  numVisible={3} numScroll={1}
                 showIndicators={false} responsiveOptions={responsiveOptions}></Carousel>
       );

   }
   else{
       return (
       <Carousel value={galleriaService} itemTemplate={StepsTest}  numVisible={1} numScroll={1}
                 showIndicators={false} ></Carousel>
       );

   }
}

export function RelatedNewsClinic() {
    const router=useRouter();
    const [dirState, setDirState] = useRecoilState(myDirectionState);
    let dirVar=dirState;
   let serviceImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8S-PRQ8_TOZ9pffqCKs8Lq8fuDtA3zk_t8Jgt9yUKi1Hvl5uBCpuWJ2sQSnaYvhb4sRk&usqp=CAU"
    return (
        <Card w={'80%'} bg={'brand.blue'} rounded={'xl'} dir={dirState}>
            <CardBody>
                <Image
                    src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Text>
                        This sofa is perfect for modern tropical spaces, baroque inspired
                        spaces, earthy toned spaces and for people who love a chic design with a
                        sprinkle of vintage design.
                    </Text>
                    <HStack>
                        <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                              color={'brand.white'}>
                            <FormattedMessage id={'read_article'}/>
                        </Text>
                        {}
                        <IconButton   colorScheme='brand.blue' aria-label={"more"}>
                             <i className="pi pi-arrow-left" style={{'fontSize': '1em'}}></i>
                            {/*<i className="pi pi-arrow-right" style={{'fontSize': '1em'}}></i>*/}
                        </IconButton>

                    </HStack>

                </Stack>
            </CardBody>


        </Card>

    )

}

export function StepsTest() {
    const [activeIndex, setActiveIndex] = useState(1);
    const toast = useRef(null);
    return (

        <Card w={['50%','78%','90%','70%']}  bg={'brand.white'} border={'2px'} borderColor={'brand.gray'} rounded={'xl'} boxShadow={'xl'}>

            <CardBody>
                <Card w={['50%','90%','70%']} p={['2%','5%','4%','2%']}   bg={'brand.white'} rounded={'full'} border={'2px'} borderColor={'brand.gray'}  align={'center'} justify={'center'}>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                          color={'brand.blue'}>
                        <FormattedMessage id={'footer_caption'}/>
                    </Text>
                </Card>
                <Stack mt='6' spacing='3'>
                        <HStack spacing={2} align="center" justify="center">
                            <Button variant='primary'  >
                                <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}>  <FormattedMessage id={'never'}/> </Text>
                                </Button>
                            <Button variant='primary'>
                                <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}> <FormattedMessage id={'sometimes'}/></Text>
                            </Button> <Button variant='primary'>
                            <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}> <FormattedMessage  id={'most_of_the_time'}/></Text></Button>
                         <Button variant='primary'><FormattedMessage
                                id={'all_the_time'}/>
                </Button>
                  </HStack>
                     <div >

                       <Card>
                           <Steps model={itemSteps} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} readOnly={false} />
                        </Card>
                    </div>
                </Stack>
            </CardBody>


        </Card>
    );
}
const itemSteps = [

            {
                label: 'offer.title',
                command: (event:any) => {
                    toast.current.show({ severity: 'info', summary: 'First Step', detail: event.item.label });
                }
            },
    {
        label: 'Seat',
        command: (event:any) => {
            toast.current.show({ severity: 'info', summary: 'Seat Selection', detail: event.item.label });
        }
    },
    {
        label: 'Payment',
        command: (event:any) => {
            toast.current.show({ severity: 'info', summary: 'Pay with CC', detail: event.item.label });
        }
    },
    {
        label: 'Confirmation',
        command: (event:any) => {
            toast.current.show({ severity: 'info', summary: 'Last Step', detail: event.item.label });
        }
    }
];