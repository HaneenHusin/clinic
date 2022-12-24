import {
	Flex,
	Heading,
	Stack,
	Text,
	useBreakpointValue,
	Image,
	useDisclosure,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Center,
	Box,
	HStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { articlesclient } from '../../../src/services/api';
import { Galleria } from 'primereact/galleria';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useRecoilState } from 'recoil';
import { myDirectionState } from '../../../Atoms/localAtoms';

export default function Article() {
	const responsiveOptions = [
		{
			breakpoint: '1024px',
			numVisible: 5,
		},
		{
			breakpoint: '768px',
			numVisible: 3,
		},
		{
			breakpoint: '560px',
			numVisible: 1,
		},
	];
	const [dirState, setDirState] = useRecoilState(myDirectionState);
	const router = useRouter();
	const { articleId } = router.query;
	let articleResult = articlesclient(1, 10);
	const result = articleResult.data?.data.results.find((obj) => {
		return obj.id === Number(articleId);
	});
	return (
		<Box dir={dirState}>
			<Box
				width={'full'}
				p={'4'}
				h={'20%'}
				bg={'brand.white'}
				boxShadow={'xl'}
				border={'1px'}
				borderColor={'brand.dark'}
			>
				<HStack display={'flex'} justify={"space-between"}>
					<Image
						src={'/assets/images/LOGO.svg'}
						alt=""
						height={{ base: '50px', md: '60px' }}
					/>
					<Text color='brand.blue'>ADHD Center</Text>
					<Breadcrumb fontWeight='medium' fontSize='sm'>
						

						<BreadcrumbItem>
							<BreadcrumbLink href='#'>
								<Text fontSize={['sm', 'sm', 'md', 'lg']} fontWeight={'bold'} color={"brand.textGray"}>
									<FormattedMessage id={'article'} defaultMessage='article' />
								</Text>
							</BreadcrumbLink>
						</BreadcrumbItem>

						<BreadcrumbItem>
							<Link href='/welcome' shallow={true}>
								<Text
									fontSize={['sm', 'sm', 'md', 'lg']}
									fontWeight={'bold'}
									textDecoration={'underline'}
									color={"brand.textGray"}
								>
									<FormattedMessage
										id={'home'}
										defaultMessage='home'
									></FormattedMessage>
								</Text>{' '}
							</Link>
						</BreadcrumbItem>
					</Breadcrumb>
				</HStack>
			</Box>

			<Stack minH={'50vh'} direction={{ base: 'column', md: 'row' }}>
				<Flex p={8} flex={1} align={'center'} justify={'center'}>
					<Stack spacing={6} w={'full'} maxW={'lg'}>
						<Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
							<Text
								as={'span'}
								position={'relative'}
								_after={{
									content: "''",
									width: 'full',
									height: useBreakpointValue({ base: '20%', md: '30%' }),
									position: 'absolute',
									bottom: 1,
									left: 0,
									bg: 'blue.400',
									zIndex: -1,
								}}
							>
								ADHD Center
							</Text>
							<br />
							<Text color={'blue.400'} as={'span'}>
								{result?.title}
							</Text>
						</Heading>
						<Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
							{parse(`${result?.body}`)}
						</Text>
					</Stack>
				</Flex>
				<Flex flex={1} pt="8%">
					{/* <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    rounded={"xl"}
                    align={'center'}
                    w={'100%'}
                    h={'100%'}
                    src={
                        'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                    }
                /> */}
					<Galleria
						value={result?.photos_list}
						responsiveOptions={responsiveOptions}
						numVisible={5}
						showThumbnails={false}
						showIndicators
						changeItemOnIndicatorHover
						style={{ width: '100%', height: '100%' }}
						item={itemGalleryTemplate}
					/>
				</Flex>
			</Stack>
		</Box>
	);
}

const itemGalleryTemplate = (item) => {
	return (
		<Image
			src={item.datafile}
			align={'center'}
			objectFit={'cover'}
			rounded={"xl"}
			onError={(e) =>
				(e.target.src =
					'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
			}
			alt={''}
			style={{ width: '100%', height: '100%', display: 'block' }}
		/>
	);
};
