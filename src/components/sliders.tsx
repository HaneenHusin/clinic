
import {Galleria} from "primereact/galleria";
import {Card, CardBody, CardHeader} from "@chakra-ui/card";
import {Heading, Image} from "@chakra-ui/react";

export default function Sliders(galleriaService:any){
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
        <Galleria value={galleriaService.galleriaService} responsiveOptions={responsiveOptions} numVisible={5}
                  
                  showThumbnails={false} showIndicators changeItemOnIndicatorHover showIndicatorsOnItem
                  item={itemGalleryTemplate}/>
    );
}
const itemGalleryTemplate = (item) => {

    return (

       
                <Image src={item.photo_model.datafile}
                       roundedTop={'full'}
                       border={'2px'}
                       borderColor={'brand.blue'}
                       onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
                       alt={item.alt} style={{width:'60%' ,height:'60%', display: 'flex'}}/>

    );
}
