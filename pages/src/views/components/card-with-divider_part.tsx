import {Card, CardBody} from "@chakra-ui/card";
import {Box, CardHeader, Heading, Stack, Text, StackDivider, Divider, HStack} from "@chakra-ui/react";
import {FormattedMessage} from "react-intl";

export default function CardWithDivider_part() {
    return(
        <Card bg={'brand.white'} rounded={'3xl'} align="center" justify="center" >
            <CardBody>
                <HStack divider={<StackDivider fontWeight={'bold'} /> } spacing={['4', '6', '8', '12']} >
                    <Box align="center" justify="center">
                        <Heading  size='xs' textTransform='uppercase'>
                            <i className="pi pi-envelope"></i>
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            <FormattedMessage id={'our_email'}/>
                        </Text>
                        <Text pt='2' fontSize='sm' color={'brand.blue'}>
                            eeee@gmail.com
                        </Text>
                    </Box>
                    <Box align="center" justify="center">
                        <Heading size='xs' textTransform='uppercase'>
                            <i className="pi pi-phone"></i>
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            <FormattedMessage id={'call_us'}/>
                        </Text> <Text pt='2' fontSize='sm' color={'brand.blue'}>
                          +9631111121212
                        </Text>
                    </Box>
                    <Box align="center" justify="center">
                        <Heading  size='xs' textTransform='uppercase'>
                            <i className="pi pi-map-marker"></i>
                        </Heading>
                        <Text pt='2' fontSize='sm'>
                            <FormattedMessage id={'clinic_address'}/>
                        </Text>
                        <Text pt='2' fontSize='sm' color={'brand.blue'}>
                           Al_Mazzeh street
                        </Text>
                    </Box>
                </HStack>
            </CardBody>
        </Card>

    )

}