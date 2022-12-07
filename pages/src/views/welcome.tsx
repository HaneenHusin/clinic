import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {myDirectionState} from "../../../Atoms/directionAtoms";
import {Card, CardBody, CardHeader} from "@chakra-ui/card";
import {Box, Center, Flex, Heading, HStack, Stack, Text, VStack, Image} from "@chakra-ui/react";
import {Galleria} from "primereact/galleria";
import {galleriaService} from "../services/Photos";
import {FormattedMessage} from "react-intl";
import CardWithDivider_part from "./components/card-with-divider_part";
import Certificates from "./components/certificate_part";
import CommentPart from "./components/comment_part";
import CustomCarousel from "./components/carousel";
import Router from "next/router";
import CustomGalleria from "./components/galleria";
import TestCard from "./components/test_card_part";
import VideoPart from "./components/video_part";

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
    const [dirState, setDirState] = useRecoilState(myDirectionState);
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

                    <Flex w={['100%', '60%', '70%', '50%', '40%']} bg={'brand.white'} mt={'5px'} boxShadow={'2xl'}
                          rounded={'full'}
                          align="center"
                          justify="center">
                        <Text align="center" fontSize={['lg', 'xl', '2xl']} fontWeight={'normal'} color={'brand.blue'}
                              p={'3%'}>
                            <FormattedMessage id={'Spend_minutes_caption'}/>
                        </Text>

                    </Flex>
                   <TestCard />
                    <Box pt={'20%'} w={['100%', '60%', '70%', '50%', '40%']}>
                        <CardWithDivider_part/>
                    </Box>
                    <VideoPart />

                    <Flex pt={'10%'} align="center" justify="center" w={'80%'}>
                        <Certificates certificateCount={galleriaService}/>
                    </Flex>
                    <Flex pt={'10%'} align="center" justify="center" w={'100%'}>
                        <CommentPart/>
                    </Flex>
                    <Flex pt={'10%'} pb={'5%'} w={'70%'} align="center" justify="center">
                        <VStack>
                            <Text align="center" fontSize={['lg', 'xl', '2xl']} fontWeight={'semibold'}
                                  color={'brand.blue'}
                                  p={'3%'}>
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
