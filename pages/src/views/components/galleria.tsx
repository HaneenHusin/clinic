
import {Galleria} from "primereact/galleria";
import {Card, CardBody, CardHeader} from "@chakra-ui/card";
import {Heading, Image} from "@chakra-ui/react";
import {galleriaService} from "../../services/Photos";
import {parseToHsla} from "color2k";

export default function CustomGalleria(){
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    return (
        <Galleria value={galleriaService} responsiveOptions={responsiveOptions} numVisible={5}
                  style={{maxWidth: '100%'}}
                  showThumbnails={false} showIndicators changeItemOnIndicatorHover showIndicatorsOnItem
                  item={itemGalleryTemplate}/>
    );
}
const itemGalleryTemplate = (item) => {
    return (

        <Card bg={'brand.white'} w={'full'} align="center" justify="center" m={'18px'} boxShadow={'l'} rounded={'xl'}>
            <CardHeader>
                <Heading align="center" justify="center"   color={'brand.textGray'} fontSize={['sm', 'md', '2xl', '3xl']}> {item.title}</Heading>
            </CardHeader>
            <CardBody>
                <Image src={item.itemImageSrc}
                       roundedTop={'full'}
                       border={'2px'}
                       borderColor={'brand.blue'}
                       onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                       alt={item.alt} style={{width: '100%', display: 'block'}}/>

            </CardBody>
        </Card>

    );
}
