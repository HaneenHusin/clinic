import React, {useState, useRef, ReactElement} from 'react';
import {Image} from 'primereact/Image';
import {useRecoilState} from "recoil";
import {Box, Button, CardBody, Flex, HStack, Stack, Text} from "@chakra-ui/react";
import {Carousel} from "primereact/carousel";
import {galleriaService} from "../src/services/Photos";
import {myProgressState} from "../Atoms/progressAtom";
import {Card} from "@chakra-ui/card";
import {FormattedMessage} from "react-intl";
import {ProgressBar} from "primereact/progressbar";
import StepsEnd from "./steps_result";
import { NextPageWithLayout } from './_app';
import LayoutWithoutBar from '../src/components/layout_without_bar';
import { useRouter } from 'next/router';
import { quizeclient } from '../src/services/api';

const quize: NextPageWithLayout = () => {
   
  const quizeResponse = quizeclient(1,10);
console.log("quizeResponse........."+quizeResponse.data?.data.results)
    return (
      
        <Stack
          
            w={'full'}
            h={'full'}
            bg={'brand.white'}
            backgroundSize={'cover'}>
                  {quizeResponse.isLoading == true ? (
            <div id='globalLoader'>
                <Image
                    src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
                    alt=''
                />
            </div>
        ) : (
            <></>
        )}
    
            <HStack>
                <svg width="466" height="603" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,0 L100,0 C25,50 50,75 0,100z" fill="#CAE5F0"/>
                </svg>
                <Image src={'assets/images/Clinic.svg'}>
                </Image>
            </HStack>
            <Box pb={'10%'} align="center" justify="center">
                <Carousel value={quizeResponse.data?.data?.results} itemTemplate={StepsTest} numVisible={1} numScroll={1}
                          showIndicators={false}></Carousel>
            </Box>

        </Stack>

    );
}

export function StepsTest(item) {
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
            // router.replace( '/steps_end' );
            router.push({
                pathname: '/steps_result',
                query: { item: JSON.stringify(item) },
             }, undefined, { shallow: true})
             
        }
    }

    const [dirState] = useRecoilState(myDirectionState);
    return (

        <Card w={['50%', '78%', '90%', '70%']} bg={'brand.white'} border={'2px'} borderColor={'brand.gray'}
              rounded={'xl'} boxShadow={'xl'}   dir={dirState}>

            <CardBody>
                <Card w={['50%', '90%', '70%']} p={['2%', '5%', '4%', '2%']} bg={'brand.white'} rounded={'full'}
                      border={'2px'} borderColor={'brand.gray'} align={'center'} justify={'center'}>
                    <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}
                          color={'brand.blue'}>
                        {/* <FormattedMessage id={'footer_caption'}/> */}
                        {item.title}
                    </Text>
                </Card>
                <Stack mt='6' spacing='3'>
                    <HStack spacing={2} align="center" justify="center">
                        {item.questions_list.map((item:any,index:number) => ( 
                        <Button key={item.id} variant='primary' onClick={() => activeSteps(5.5)}>
                            <Text fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'normal'}> {item} </Text>
                        </Button>))}
                        {/* <Button variant='primary' onClick={() => activeSteps(5.5)}>
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
                        </Button> */}
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
quize.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutWithoutBar>
            {page}
        </LayoutWithoutBar>
    )
}

export default  quize;

