
import React, { useState, useRef } from 'react';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/Image';
import {useRecoilState} from "recoil";
import {myLayoutState} from "../../../Atoms/layout";
import {Card} from "primereact/card";
import {Box, Flex, HStack, Stack} from "@chakra-ui/react";
import CustomCarousel from "./components/carousel";

export default function  StepsDemo ()  {
    const [activeIndex, setActiveIndex] = useState(1);
    const toast = useRef(null);
    const [headerFooterState, setHeaderFooterState] = useRecoilState(myLayoutState);

    useState(() => {
        setHeaderFooterState({...headerFooterState, footer: "none", appBar: "none"})
        console.log("bottom " + headerFooterState.footer);

    });


    return (
        <Stack
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
            <Box pb={'10%'} align="center" justify="center" >
                <CustomCarousel template="steps"  />
            </Box>


            {/*<Box  >*/}
            {/*    <svg viewBox="0 0 100 100"  width="230" height="230">*/}
            {/*        <path transform="rotate(-180, 50, 50) " d="M0,0 l100,0 C25,50 50,75 0,100z" fill="#8aa7ca"/>*/}
            {/*    </svg>*/}
            {/*</Box>*/}
        </Stack>

    );
}
