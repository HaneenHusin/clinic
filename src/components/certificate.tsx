import {Box, Image, CardBody, CardHeader, Center, Heading, SimpleGrid, Stack, VStack} from "@chakra-ui/react";
import {Card, CardFooter} from "@chakra-ui/card";
import { certificateclient } from "../services/api";

export default function Certificates() {
    const certificateResponse = certificateclient(1, 10);
    return (
        <SimpleGrid spacing={14} columns={[2, null,3]}  w= {{ base: '70%', md: '70%', lg: '60%' }} m={"4"}>
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
            
                <Card key={index} border={'2px'} borderStyle={'double'} borderColor={'brand.brounz'} align={"center"} >
                    
                     
                            <Image
                                src={item.photo_model.datafile} alt=''
                                borderRadius='lg'
                                _hover={{transform: "scale(2.05, 2.30)"}}
                               
                               h="full"
                            />
                              {/* <Image src={"/assets/images/decoration.svg"}alt="" width={{ base: '15%', md: '20%', lg: '10%' }}  /> */}
                       
                  
                
                </Card>
            )}

        </SimpleGrid>


    )


}