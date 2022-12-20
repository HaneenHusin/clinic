import {Box, Image, CardBody, CardHeader, Center, Heading, SimpleGrid, Stack, VStack} from "@chakra-ui/react";
import {Card} from "@chakra-ui/card";
import { certificateList } from "../services/api";

export default function Certificates({certificateCount}: any) {
    const certificateResponse = certificateList(1, 10);
    return (
        <SimpleGrid spacing={4} columns={[2, 3]} templateColumns='repeat(2, 1fr)' w= {{ base: '65%', md: '60%', lg: '55%' }}>
            {certificateResponse.isLoading == true ? (
				<div id='globalLoader'>
					<Image src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
						alt=''
					/>
				</div>
			) : (
				<></>
			)}
            {certificateResponse.data?.data.results.map((item,index) =>
                <Card key={index} border={'4px'} borderStyle={'double'} borderColor={'brand.brounz'}  >
                    <CardBody w={'100%'} >
                        <Center>

                            <Image
                                src={item.photo_model.datafile} alt='Green double couch with wooden legs'
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