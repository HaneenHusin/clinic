import {ReactNode} from "react";
import {chakra, useColorModeValue, VisuallyHidden} from "@chakra-ui/react";
import { ToastErrorShow } from "./toast";

export  default function  SocialButton  ({
                          children,
                          label,
                          href,
                          bgColor
                      }: {
    children: ReactNode;
    label: string;
    href: string;
    bgColor:any
}) {
    return (
        <chakra.button
            bg={bgColor}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            onClick={()=>  ToastErrorShow("قريباً !!!!!")}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};