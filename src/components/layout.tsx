import { ReactElement, useEffect, useState } from 'react';
import { Flex, Skeleton } from '@chakra-ui/react';
import FooterBar from './footer';
import { Router, useRouter } from 'next/router';
import { AppBar } from './appbar';

type Props = {
	children: ReactElement | ReactElement[];
};
function Layout({ children, ...props }: Props) {
	const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
	useEffect(() => {
		
		Router.events.on('routeChangeStart', (url) => {
			setIsLoading(true);
		});

		Router.events.on('routeChangeComplete', (url) => {
			setIsLoading(false);
		});

		Router.events.on('routeChangeError', (url) => {
			setIsLoading(false);
		});
	}, [Router]);

	return (
		<Flex
			direction='column'
			maxW={{ xl: '1700px' }}
			backgroundImage='url(/assets/images/Path_1.svg)'
			{...props}
		>
			<Skeleton
				startColor='brand.blueLight'
				h={'full'}
				endColor='brand.textBlue'
				isLoaded={!isLoading}
			>
				<AppBar />
				<main>{children}</main>
				<FooterBar />
			</Skeleton>
		</Flex>
	);
}

export default Layout;
