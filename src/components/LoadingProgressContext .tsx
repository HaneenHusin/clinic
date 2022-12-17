import {Progress, VStack, CircularProgress, Skeleton} from '@chakra-ui/react'
import { createContext, ReactElement, useContext, useState, useEffect, useRef } from 'react'

type Props = {
    children: ReactElement | ReactElement[]
}

type Progress = {
    value: number
    start: () => void
    done: () => void
}

const LoadingProgressContext = createContext<Progress>({
    value: 0,
    start: () => {},
    done: () => {}
})

export const useLoadingProgress = (): Progress => {
    return useContext<Progress>(LoadingProgressContext)
}


const LoadingProgress = () => {
    const { value } = useLoadingProgress()

    return (
        <VStack align="flex-end" position="absolute" top={0} left={0} right={0}>
            <Progress value={value} size="xs" width="100%" />
        </VStack>
    )
}


export const LoadingProgressProvider = ({ children }: Props): ReactElement => {

    const step = useRef(5)
    const [value, setValue] = useState(0)
    const [isOn, setOn] = useState(false)
    useEffect(() => {
        if (isOn) {
            let timeout: number = 0

            if (value < 20) {
                step.current = 5
            } else if (value < 40) {
                step.current = 4
            } else if (value < 60) {
                step.current = 3
            } else if (value < 80) {
                step.current = 2
            } else {
                step.current = 1
            }

            if (value <= 98) {
                timeout = setTimeout(() => {
                    setValue(value + step.current)
                }, 500)
            }

            return () => {
                if (timeout) {
                    clearTimeout(timeout)
                }
            }
        }
    }, [value, isOn])

    const start = () => {
        setValue(0)
        setOn(true)
    }

    const done = () => {
        setValue(100)
        setTimeout(() => {
            setOn(false)
        }, 200)
    }

    return (
        <LoadingProgressContext.Provider
            value={{
                value,
                start,
                done
            }}>
            {isOn ? <LoadingProgress /> : <></>}
            <Skeleton startColor='brand.blueLight' endColor='brand.textBlue'  isLoaded={!isOn}>
            {children}
            </Skeleton>
        </LoadingProgressContext.Provider>
    )
}


// export const usePageLoading = () => {
//   const [isPageLoading, setIsPageLoading] = useState(false);

//   useEffect(() => {
//     const routeEventStart = () => {
//       setIsPageLoading(true);
//     };
//     const routeEventEnd = () => {
//       setIsPageLoading(false);
//     };

//     Router.events.on('routeChangeStart', routeEventStart);
//     Router.events.on('routeChangeComplete', routeEventEnd);
//     Router.events.on('routeChangeError', routeEventEnd);
//     return () => {
//       Router.events.off('routeChangeStart', routeEventStart);
//       Router.events.off('routeChangeComplete', routeEventEnd);
//       Router.events.off('routeChangeError', routeEventEnd);
//     };
//   }, []);

//   return { isPageLoading };
// };
