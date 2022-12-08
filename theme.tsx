
import {extendTheme, StyleFunctionProps } from "@chakra-ui/react"




const theme = extendTheme({
    fonts: {
        heading: `'Heading Font Name'`,
        body: `'Body Font Name'`,
    },
    colors: {
        brand: {
            gray: "#EEEEEE",
            textGray: "#565E60",
            textBlue: "#215EE9",
            darkGray: "#1E5B6333",
            dark:"#AAAAAA",
            blue:"#34B4EA",
            blueLight:"#CAE5F0",
            white:"#ffffffff",
            black:"#00000000",
            brounz:"#a47b23"
        },

    },
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                color: 'default',
                bg: 'brand.blueLight',
            },
        }),
    },
    components: {
Button:{
    variants: {

        outline: {
            fontFamily: "Body Font Name",
            bg: `brand.white`,
            fontWeight: "semibold",
            color: 'brand.blue',
            rounded:'2xl',
            transition: 'transform 0.15s ease-out, background 0.15s ease-out',
            padding:'20px',
            _hover: {
                transform: "scale(1.05, 1.05)",
            },

            _active: {
                transform: "scale(1, 1)",

            },
        },
        primary: {
            fontFamily: "Body Font Name",
            bg: `brand.blue`,
            fontWeight: "semibold",
            color: 'brand.white',
            rounded:'2xl',
            transition: 'transform 0.15s ease-out, background 0.15s ease-out',
            padding:'20px',
            _hover: {
                transform: "scale(1.05, 1.05)",
            },

            _active: {
                transform: "scale(1, 1)",

            },
        },
        }


    },}
})
export default theme;