import {
	Box,
	Checkbox,
	Text,
	SimpleGrid,
	Image,
	VStack,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
} from '@chakra-ui/react';
import { Galleria } from 'primereact/galleria';
import { Paginator } from 'primereact/paginator';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRecoilState } from 'recoil';
import { myImagesState, myListImagesState } from '../../Atoms/imagesAtom';
import { DeleteRequest, photosList } from '../services/api';

export default function Gridphotot({isMulti}:{isMulti: boolean}) {
	const [imageState, setimageState] = useRecoilState(myImagesState);
	const [listImageState, setListImageState] = useRecoilState(myListImagesState);
	const [basicFirst, setBasicFirst] = useState(1);
	const [basicRows, setBasicRows] = useState(10);
	const photosResponse = photosList(basicFirst, basicRows);
	const onBasicPageChange = (event) => {
		setBasicFirst(event.page + 1);
		setBasicRows(event.rows);
	};
	function onImageSelect(e: any, id: number) {
		debugger;
		if (isMulti == true) {
			let array = [...listImageState];
			if (e.target.checked == true) {
				array.push(id);
				setListImageState(array);
			} else {
				array.pop(id);
				setListImageState(array);
			}
		} else {
			if (e.target.checked == true) {
				setimageState(id);
			} else {
				setimageState(id);
			}
		}

		// setimageState(imageState=> [...imageState, id]);
		console.log('imageState' + imageState);
	}
	return (
		<Box>
			{isMulti !=true ?
				<Box>
	<Alert status='warning'>
					<AlertIcon />
					<AlertDescription>
					<FormattedMessage
											id={'select_one_item'}
											defaultMessage='select one item'
										/>
					
					</AlertDescription>
				</Alert> 
				</Box>
			:<></>}
			<SimpleGrid
				spacing={5}
				columns={[2, 3]}
				templateColumns='repeat(3, 1fr)'
				w='full%'
			>
				
				
				{photosResponse.data?.data.results.map((link) => (
					<VStack key={link.id}>
						<Image src={link.datafile} alt={''} />
						<Checkbox
							colorScheme='blue'
							size={'lg'}
							onChange={(e) => onImageSelect(e, link.id)}
						></Checkbox>
					</VStack>
				))}
			</SimpleGrid>
			<Paginator
				first={basicFirst}
				rows={basicRows}
				totalRecords={photosResponse.data?.data.count}
				onPageChange={onBasicPageChange}
			></Paginator>
		</Box>
	);
}
