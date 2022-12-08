
import {useRecoilState} from "recoil";
import {Card, CardBody, CardHeader} from "@chakra-ui/card";
import {Box, Center, Flex, Heading, HStack, Stack, Text, VStack, Image} from "@chakra-ui/react";
import {galleriaService} from "./services/Photos";
import {FormattedMessage} from "react-intl";
import CardWithDivider_part from "../components/card-with-divider_part";
import Certificates from "../components/certificate_part";
import CommentPart from "../components/comment_part";
import CustomCarousel from "../components/carousel";
import CustomGalleria from "../components/galleria";
import TestCard from "../components/test_card_part";
import VideoPart from "../components/video_part";
import {useState} from "react";
import {myLayoutState} from "../Atoms/layout";
import {getCookie} from "./services/lang_cookies";
import {myAbbBarLocalState, myDirectionState, myLocalState} from "../Atoms/localAtoms";

export default function Welcome() {


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
    const [headerFooterState, setHeaderFooterState] = useRecoilState(myLayoutState);
    const [localState,setLocalState] = useRecoilState(myLocalState);
    const [dirState,setDirState] = useRecoilState(myDirectionState);

    useState(() => {
        debugger
        setHeaderFooterState({...headerFooterState, footer: "block", appBar: "block"})
        setLocalState(getCookie("language"))
        setDirState(   localState == "ar"?"rtl":"ltr")
        console.log("dirrrrrr2 "+dirState)
        console.log("localState "+localState)
    });

    return (
        <div dir={dirState}>
           <CustomGalleria />
            <Center>
                <VStack>
                    <Text fontSize={['sm', 'md', '2xl', '3xl']} align="center" fontWeight={'normal'}
                          color={'brand.textGray'} p={'4%'}>
                        <FormattedMessage id={'first_caption'}/>
                    </Text>
                    <VStack>
                        <img src={"assets/images/test1.png"}
                             onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                             alt={"no Image"} style={{width: '100%', display: 'block'}}/>

                    </VStack>

                    <Text align="center" fontSize={['sm', 'md', '2xl', '3xl']} fontWeight={'normal'}
                          color={'brand.textGray'} p={'4%'}>
                        <FormattedMessage id={'second_caption'}/>
                    </Text>
                    <img src={"assets/images/test2.png"}
                         onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                         alt={"no Image"} style={{width: '100%', display: 'block'}}/>

                    <Flex w={{ base: '40%', md: '60%', lg: '40%' }} bg={'brand.white'} mt={'5px'} boxShadow={'2xl'}
                          rounded={'full'}
                          align="center"
                          justify="center">
                        <Text align="center" fontSize={['lg', 'xl', '2xl']} fontWeight={'normal'} color={'brand.blue'}
                              p={'3%'}>
                            <FormattedMessage id={'Spend_minutes_caption'}/>
                        </Text>

                    </Flex>
                   <TestCard />
                    <Box pt={'10%'} w={{ base: '50%', md: '60%', lg: '50%' }}>
                        <CardWithDivider_part/>
                    </Box>
                    <Box pt={'10%'} w={{ base: '50%', md: '60%', lg: '50%' }} >
                    <VideoPart />
                    </Box>
                    <Flex pt={'10%'} align="center" justify="center" w={'80%'}>
                        <Certificates certificateCount={galleriaService}/>
                    </Flex>
                    <Flex pt={'5%'} align="center" justify="center" w={'100%'}>
                        <CommentPart/>
                    </Flex>
                    <Flex pt={'3%'} pb={'5%'} w={'70%'} align="center" justify="center">
                        <VStack>
                            <Text align="center" fontSize={['lg', 'xl', '2xl']} fontWeight={'semibold'}
                                  color={'brand.blue'}
                                  p={'0.5%'}>
                                <FormattedMessage id={'related_news'}/>
                            </Text>
                            <CustomCarousel template="relatedNews" />
                        </VStack>

                    </Flex>

                </VStack>

            </Center>
        </div>
    );
}
