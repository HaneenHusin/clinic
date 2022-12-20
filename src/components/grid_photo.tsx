import { Box, Checkbox, Text, SimpleGrid,Image, VStack } from '@chakra-ui/react';
import { Galleria } from 'primereact/galleria';
import { Paginator } from 'primereact/paginator';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRecoilState } from 'recoil';
import { myImagesState } from '../../Atoms/imagesAtom';
import { DeleteRequest, photosList } from '../services/api';

export default function Gridphotot() {
	const photosResponse = photosList(1, 10);
	const [imageState, setimageState] = useRecoilState(myImagesState);
	const [basicFirst, setBasicFirst] = useState(0);
	const [basicRows, setBasicRows] = useState(10);
	const onBasicPageChange = (event) => {
		setBasicFirst(event.first);
		setBasicRows(event.rows);
	};
	function onImageSelect(e:any,id:number) {
        debugger 
        let array = [...imageState]
        if (e.target.checked==true){
            array.push(id)
            setimageState( array)
        }else{
            array.pop(id)
            setimageState( array)
        }
       
     
        // setimageState(imageState=> [...imageState, id]);
         console.log("imageState"+imageState)
		
	}
	return (
		<Box>
			<SimpleGrid
				spacing={5}
				columns={[2, 3]}
				templateColumns='repeat(3, 1fr)'
				w='full%'
			>
				{photosResponse.data?.data.results.map((link) => (
					<VStack key={link.id}>
                        <Image src={link.datafile} alt={''} />
						<Checkbox colorScheme='blue'  size={"lg"}   onChange={(e) => onImageSelect(e,link.id)}>
							
						</Checkbox>
						
					</VStack>
				))}
			</SimpleGrid>
			<Paginator
				first={basicFirst}
				rows={basicRows}
				totalRecords={photosResponse.data?.data.results.length}
				rowsPerPageOptions={[10, 20, 30]}
				onPageChange={onBasicPageChange}
			></Paginator>
		</Box>
	);
}
