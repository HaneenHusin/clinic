import {
	Box,
	Heading,
	Text,
	Image,
	VStack,
	HStack,
	BreadcrumbItem,
	Breadcrumb,
	BreadcrumbLink,
	CardBody,
	StackDivider,
	Card,
  Center,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { informationclient } from '../src/services/api';
import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function Contact() {
	let info = informationclient(1, 10);
	const emailVal = info.data?.data.results.find((obj: any) => {
		return obj.name === 'email';
	});
	const addressVal = info.data?.data.results.find((obj: any) => {
		return obj.name === 'address';
	});
	const phoneVal = info.data?.data.results.find((obj: any) => {
		return obj.name === 'phone';
	});
	const videoVal = info.data?.data.results.find((obj: any) => {
		return obj.name === 'video';
	});
	const doctorName = info.data?.data.results.find((obj: any) => {
		return obj.name === 'doctorName';
	});
	const { t } = useTranslation('');
	const router = useRouter();
	useEffect(() => {
		let dir = router.locale == "ar" ? "rtl" : "ltr";
		let lang = router.locale == "ar" ? "ar" : "en";
		document.querySelector("html")?.setAttribute("dir", dir);
		document.querySelector("html")?.setAttribute("lang", lang);
	  }, [router.locale]);
	return (
		<Box >
			{info.isLoading == true ? (
				<div id='globalLoader'>
					<Image
						src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
						alt=''
					/>
				</div>
			) : (
				<></>
			)}
			<Box
				width={'full'}
				p={'4'}
				h={'20%'}
				bg={'brand.white'}
				boxShadow={'xl'}
				border={'1px'}
				borderColor={'brand.dark'}
			>
				<HStack display={'flex'} justify={'space-between'}>
					<Image
						src={'/assets/images/LOGO.svg'}
						alt=''
						height={{ base: '50px', md: '60px' }}
					/>
					<Text color='brand.blue'>ADHD Center</Text>
					<Breadcrumb fontWeight='medium' fontSize='sm'>
						<BreadcrumbItem>
							<BreadcrumbLink href='#'>
								<Text
									fontSize={['sm', 'sm', 'md', 'lg']}
									fontWeight={'bold'}
									color={'brand.textGray'}
								>
									{t('contact_us')}
										
								</Text>
							</BreadcrumbLink>
						</BreadcrumbItem>

						<BreadcrumbItem>
							<Link href='./' shallow={true}>
								<Text
									fontSize={['sm', 'sm', 'md', 'lg']}
									fontWeight={'bold'}
									textDecoration={'underline'}
									color={'brand.textGray'}
								>
									{t('home')}
								</Text>
							</Link>
						</BreadcrumbItem>
					</Breadcrumb>
				</HStack>
			</Box>

			<Box
				borderRadius='lg'
				m={{ sm: 4, md: 16, lg: 10 }}
				p={{ sm: 5, md: 5, lg: 16 }}
			>
				<Box>
					<Center p={4}>
						<Heading>
						{t('contact_us')}
						</Heading>
						
					</Center>

					<Card
						bg={'brand.white'}
						rounded={'3xl'}
						align='center'
						justify='center'
						border={'1px'}
						borderColor={'brand.darkGray'}
					>
						<CardBody>
							<HStack justify={'space-between'}>
								<VStack
									divider={<StackDivider fontWeight={'bold'} />}
									spacing={['4', '6', '8', '12']}
								>
                  <Text  fontSize={['lg', 'xl', '2xl', '3xl']} color='gray.500'>
				  {t('contact_us_media')}
              </Text>
									<Box align='center' justify='center'>
										<Heading size='xs' textTransform='uppercase'>
											<i className='pi pi-envelope'></i>
										</Heading>
										<Text pt='2' fontSize='sm'>
											{t('our_email')}
										</Text>

										<Text pt='2' fontSize='sm' color={'brand.blue'}>
											{emailVal?.value}
										</Text>
									</Box>
									<Box
										align='center'
										justify='center'
									>
										<Heading size='xs' textTransform='uppercase'>
											<i className='pi pi-phone'></i>
										</Heading>
										<Text pt='2' fontSize='sm'>
										{t('call_us')} 
										</Text>
										<Text pt='2' fontSize='sm' color={'brand.blue'}>
											{phoneVal?.value}
										</Text>
									</Box>
									<Box align='center' justify='center'>
										<Heading size='xs' textTransform='uppercase'>
											<i className='pi pi-map-marker'></i>
										</Heading>
										<Text pt='2' fontSize='sm'>
										{t('clinic_address')}
										</Text>
										<Text pt='2' fontSize='sm' color={'brand.blue'}>
											{addressVal?.value}
										</Text>
									</Box>
								</VStack>
								<Image
									src='/assets/images/map.PNG'
									alt=''
									width={'70%'}
								></Image>
							</HStack>
						</CardBody>
					</Card>
				</Box>
			</Box>
		</Box>
	);
}
export const getStaticProps = async ({ locale}:{ locale:string }) => ({
	props: {
	  ...(await serverSideTranslations(locale, ["common"])),
	}
  })