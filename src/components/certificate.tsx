import {Box, Image, CardBody, CardHeader, Center, Heading, SimpleGrid, Stack, VStack} from "@chakra-ui/react";
import {Card, CardFooter} from "@chakra-ui/card";
import { certificateList } from "../services/api";

export default function Certificates() {
    const certificateResponse = certificateList(1, 10);
    return (
        <SimpleGrid spacing={4} columns={[2, null, 3]}  w= {{ base: '55%', md: '60%', lg: '60%' }}>
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
                <Card key={index} border={'4px'} borderStyle={'double'} borderColor={'brand.brounz'} h={"full"}  >
                    <CardBody>
                        <Center>

                            <Image
                                src={item.photo_model.datafile} alt=''
                                borderRadius='lg'
                                h={"90%"}
                                _hover={{transform: "scale(2.05, 3.30)",border:"none"}}
                            />
                        </Center>
                      
                    </CardBody>
                    <CardFooter>
                    <Image src={"/assets/images/decoration.svg"}alt="" width={"8"}  />
                    </CardFooter>
                </Card>
            )}

        </SimpleGrid>


    )


}