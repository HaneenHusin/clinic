import React, {useState, useRef} from 'react';
import {Image} from 'primereact/Image';
import {useRecoilState} from "recoil";
import {myLayoutState} from "../Atoms/layout";
import {Box, Button, CardBody, Flex, HStack, Stack, Text} from "@chakra-ui/react";
import {Carousel} from "primereact/carousel";
import {galleriaService} from "./services/Photos";
import {myProgressState} from "../Atoms/progressAtom";
import {Card} from "@chakra-ui/card";
import {FormattedMessage} from "react-intl";
import {ProgressBar} from "primereact/progressbar";
import StepsEnd from "./steps_end";
import {useRouter} from "next/router";
import {myDirectionState} from "../Atoms/localAtoms";

export default function StepsDemo() {
    const [headerFooterState, setHeaderFooterState] = useRecoilState(myLayoutState);
    const [dirState] = useRecoilState(myDirectionState);

    useState(() => {
        setHeaderFooterState({...headerFooterState, footer: "none", appBar: "none"})
        console.log("bottom " + headerFooterState.footer);

    });


    return (
        <Stack
            dir={dirState}
            w={'full'}
            h={'full'}
            bg={'brand.white'}
            backgroundSize={'cover'}>
            {/*<div className="col-12 md:col-6 overflow-hidden">*/}
            {/*    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ-ajsv7dw4zBasIv-nzzWmiSrb2n9X2fQKQ&usqp=CAU" alt="hero-1" className="md:ml-auto block md:h-full" style={{ clipPath: 'polygon(8% 0, 100% 0%, 100% 100%, 0 100%)' }} />*/}
            {/*</div>*/}
            <HStack>
                <svg width="466" height="603" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 L100,0 C25,50 50,75 0,100z" fill="#CAE5F0"/>
                </svg>
                <Image src={'assets/images/Clinic.svg'}>
                </Image>
            </HStack>
            <Box pb={'10%'} align="center" justify="center">
                <Carousel value={galleriaService} itemTemplate={StepsTest} numVisible={1} numScroll={1}
                          showIndicators={false}></Carousel>
            </Box>


            {/*<Box  >*/}
            {/*    <svg viewBox="0 0 100 100"  width="230" height="230">*/}
            {/*        <path transform="rotate(-180, 50, 50) " d="M0,0 l100,0 C25,50 50,75 0,100z" fill="#8aa7ca"/>*/}
            {/*    </svg>*/}
            {/*</Box>*/}
        </Stack>

    );
}

export function StepsTest() {
    const [progressState, setProgressState] = useRecoilState(myProgressState);

    const itemSteps = [
        {
            icon: <i className="pi pi-check"></i>,
        },
        {
            icon: <i className="pi pi-check"></i>
        },
        {
            icon: <i className="pi pi-check"></i>
        },
        {
            icon: <i className="pi pi-check"></i>
        }, {
            icon: <i className="pi pi-check"></i>
        },
        {
            icon: <i className="pi pi-check"></i>
        }, {
            icon: <i className="pi pi-check"></i>
        },
        {
            icon: <i className="pi pi-check"></i>
        }, {
            icon: <i className="pi pi-check"></i>
        },
        {
            icon: <i className="pi pi-check"></i>
        }, {
            icon: <i className="pi pi-check"></i>
        },
        {
            icon: <i className="pi pi-check"></i>
        }, {
            icon: <i className="pi pi-check"></i>
        },
        {
            icon: <i className="pi pi-check"></i>
        }, {
            icon: <i className="pi pi-check"></i>
        },
        {
            icon: <i className="pi pi-check"></i>
        }, {
            icon: <i className="pi pi-check"></i>
        },
        {
            icon: <i className="pi pi-check"></i>
        },
    ];
    const router = useRouter()
    function activeSteps(val: number) {
        console.log("indexxxx " + progressState)
        setProgressState(progressState + val)
        if (progressState == 99) {
            console.log("StepsEnd  ")
            router.replace( '/steps_end' );
        }
    }


    return (

        <Card w={['50%', '78%', '90%', '70%']} bg={'brand.white'} border={'2px'} borderColor={'brand.gray'}
              rounded={'xl'} boxShadow={'xl'}>

            <CardBody>
                <Card w={['50%', '90%', '70%']} p={['2%', '5%', '4%', '2%']} bg={'brand.white'} rounded={'full'}
                      border={'2px'} borderColor={'brand.gray'} align={'center'} justify={'center'}>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                          color={'brand.blue'}>
                        <FormattedMessage id={'footer_caption'}/>
                    </Text>
                </Card>
                <Stack mt='6' spacing='3'>
                    <HStack spacing={2} align="center" justify="center">
                        <Button variant='primary' onClick={() => activeSteps(5.5)}>
                            <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}> <FormattedMessage
                                id={'never'}/> </Text>
                        </Button>
                        <Button variant='primary' onClick={() => activeSteps(5.5)}>
                            <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}> <FormattedMessage
                                id={'sometimes'}/></Text>
                        </Button> <Button variant='primary' onClick={() => activeSteps(5.5)}>
                        <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}> <FormattedMessage
                            id={'most_of_the_time'}/></Text></Button>
                        <Button variant='primary' onClick={() => activeSteps(5.5)}><FormattedMessage
                            id={'all_the_time'}/>
                        </Button>
                    </HStack>
                    <div>

                        {/*<Card>*/}
                        {/*    <Steps  model={itemSteps} activeIndex={activeIndex}  readOnly={true} />*/}
                        {/* </Card>*/}
                        {/*  <Progress colorScheme='green' size='sm' value={activeIndex} />*/}
                        {/*  <Progress colorScheme='green' size='sm' value={activeIndex} />*/}
                        <ProgressBar  showValue={false}  value={progressState} colorScheme='brand.blue'/>
                    </div>
                </Stack>
            </CardBody>


        </Card>
    );
}

