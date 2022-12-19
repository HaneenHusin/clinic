import { createStandaloneToast } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

export function ToastErrorShow(text:string){
    const { toast } = createStandaloneToast();

    toast({   
    description: text,
    status: 'error',
    duration: 4000,
    position:"top",
    isClosable: true,});
}
export function ToastSuccessShow(text:string){
    const { toast } = createStandaloneToast();

    toast({   
    description: text,
    status: 'success',
    duration: 4000,
    position:"top",
    isClosable: true,});
}