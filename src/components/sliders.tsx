import { Galleria } from 'primereact/galleria';
import { Card, CardBody, CardHeader } from '@chakra-ui/card';
import { Box, Text, Image, Heading } from '@chakra-ui/react';

export default function Sliders(galleriaService: any) {
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

	return (
		<Galleria
			value={galleriaService.galleriaService}
			responsiveOptions={responsiveOptions}
			numVisible={5}
			style={{ maxWidth: '100%', height: '60%' }}
			showThumbnails={false}
			showIndicators
			item={itemGalleryTemplate}
		/>
	);
}
const itemGalleryTemplate = (item) => {
	return (
		<Box
			bg={'brand.white'}
			w={'100%'}
			align='center'
			justify='center'
			p={'3px'}
			boxShadow={'l'}
			roundedTop={'xl'}
		>
			<Heading
				p={'10'}
				align='center'
				justify='center'
				color={'brand.textGray'}
				fontSize={['sm', 'md', '2xl', '3xl']}
			>
				{' '}
				{item.text}
			</Heading>

			<Image
				src={item.photo_model.datafile}
				roundedTop={'full'}
				border={'2px'}
				borderColor={'brand.blue'}
				height={500}
				onError={(e) =>
					(e.target.src =
						'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
				}
				alt={item.alt}
				style={{ width: '100%', display: 'block' }}
			/>
		</Box>
	);
};
