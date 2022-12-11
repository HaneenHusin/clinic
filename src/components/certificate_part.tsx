import {Box, Image, CardBody, CardHeader, Center, Heading, SimpleGrid, Stack, VStack} from "@chakra-ui/react";
import {Card} from "@chakra-ui/card";

export default function Certificates({certificateCount}: any) {
    return (
        <SimpleGrid spacing={12} columns={[2, 3]} templateColumns='repeat(2, 1fr)' w='35%'>
            {certificateCount.map(() =>
                <Card key={certificateCount.id} border={'4px'} borderStyle={'double'} borderColor={'brand.brounz'}   _hover={{border:"none"}}>
                    <CardBody w={'100%'}   _hover={{display:"none"}}>
                        <Center>

                            <Image
                                src={"assets/images/TEST_LOGO.svg"} alt='Green double couch with wooden legs'
                                borderRadius='lg'
                                _hover={{transform: "scale(2.05, 2.05)",border:"none"}}
                            />
                        </Center>
                    </CardBody>
                    <Center>
                        <Image src={"assets/images/decoration.svg"} width={'20%'}   />
                    </Center>
                </Card>
            )}

        </SimpleGrid>


    )


}