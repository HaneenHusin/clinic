import {Alert, AlertIcon} from "@chakra-ui/alert";

export  default function ErrorResponse(message:string){
    return(
        <Alert status='error'>
            <AlertIcon />
            {message=="" ?  "There was an error processing your request":message}
            There was an error processing your request
        </Alert>
    )
}