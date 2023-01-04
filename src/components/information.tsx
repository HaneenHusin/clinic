import { Card, CardBody } from '@chakra-ui/card';
import {
	Box,
	Heading,
	Text,
	StackDivider,
	HStack,
	AspectRatio,
	Flex,
	Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import { useRecoilState } from 'recoil';
import { myDirectionState } from '../../Atoms/localAtoms';

export default function Information(info: any) {
	const [dirState] = useRecoilState(myDirectionState);
	const emailVal = info.info.find((obj: any) => {
		return obj.name === 'email';
	});
	const addressVal = info.info.find((obj: any) => {
		return obj.name === 'address';
	});
	const phoneVal = info.info.find((obj: any) => {
		return obj.name === 'phone';
	});
	const videoVal = info.info.find((obj: any) => {
		return obj.name === 'video';
	});
	const doctorName = info.info.find((obj: any) => {
		return obj.name === 'doctorName';
	});
	const router = useRouter();
	async function goContact() {
		await router.push('/contact_us', '/contact_us', { shallow: true });
	}
	return (
		<Box>
			<Card
				bg={'brand.white'}
				rounded={'3xl'}
				align='center'
				justify='center'
				border={'1px'}
				borderColor={'brand.darkGray'}
			>
				<CardBody>
					<HStack
						divider={<StackDivider fontWeight={'bold'} />}
						spacing={['4', '6', '8', '12']}
					>
						<Box align='center' justify='center'>
							<Heading size='xs' textTransform='uppercase'>
								<i className='pi pi-envelope'></i>
							</Heading>
							<Text pt='2' fontSize='sm'>
								<FormattedMessage id={'our_email'} />
							</Text>

							<Text pt='2' fontSize='sm' color={'brand.blue'}>
								{emailVal.value}
							</Text>
						</Box>
						<Box
							align='center'
							justify='center'
							cursor={'pointer'}
							onClick={() => goContact()}
						>
							<Heading size='xs' textTransform='uppercase'>
								<i className='pi pi-phone'></i>
							</Heading>
							<Text pt='2' fontSize='sm'>
								<FormattedMessage id={'call_us'} />
							</Text>
							<Text pt='2' fontSize='sm' color={'brand.blue'}>
								{phoneVal.value}
							</Text>
						</Box>
						<Box align='center' justify='center'>
							<Heading size='xs' textTransform='uppercase'>
								<i className='pi pi-map-marker'></i>
							</Heading>
							<Text pt='2' fontSize='sm'>
								<FormattedMessage id={'clinic_address'} />
							</Text>
							<Text pt='2' fontSize='sm' color={'brand.blue'}>
								{addressVal.value}
							</Text>
						</Box>
					</HStack>
				</CardBody>
			</Card>

			<Stack minH={'50vh'} direction={{ base: 'column', md: 'row' }}>
				<Flex flex={1} align={'center'} justify={'center'}>
			

					<Box
						rounded={'lg'}
						border={'2px'}
						borderColor={'brand.white'}
						m={'4'}
					>
						<iframe
							src={`https://www.youtube.com/embed/${videoVal.value}`}
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
							allowFullScreen
							title='Embedded youtube'
						/>
					</Box>

					<Stack spacing={1} w={'full'} maxW={'lg'} p={'4'}>
						<Text
							fontSize={['sm', 'md', 'lg', 'xl']}
							fontWeight={'semibold'}
							color={'brand.blue'}
						>
							<FormattedMessage id={'know_more'} />
						</Text>
						{/* <Text
								fontSize={['sm', 'md', 'lg', 'xl']}
								fontWeight={'normal'}
								color={'brand.textGray'}
							>
								<FormattedMessage id={'doctor'} />
							</Text> */}
						<Text
							fontSize={['sm', 'md', 'lg', 'xl']}
							fontWeight={'bold'}
							color={'brand.textGray'}
						>
							{doctorName.value}
						</Text>
					</Stack>
				</Flex>
			</Stack>
		</Box>
	);
}
