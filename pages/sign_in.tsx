import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	HStack,
	Image,
	Input,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { ReactElement, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRecoilState } from 'recoil';
import { myDirectionState, myLocalState } from '../Atoms/localAtoms';
import LayoutWithoutBar from '../src/components/layout_without_bar';
import { setCookie } from '../src/services/cookies_file';
import { SignRequest } from '../src/services/api';
import { NextPageWithLayout } from './_app';

 const SignIn: NextPageWithLayout = () => {
	const [localState] = useRecoilState(myLocalState);
	const localValue = `${localState} `;
	const [dirState] = useRecoilState(myDirectionState);
	const router = useRouter();
   
   
	async function goSignUpPage() {
		console.log('localValue...' + localValue);
		const { pathname, asPath, query } = router;
		await router.push('/sign_up', '/sign_up', { locale: localValue.trim(),shallow: true });
	}
	
	
async function loginResult(response:any) {
	debugger
	await setCookie('cookies',response.access);
	const { pathname, asPath, query } = router;
	if(response.role=="A")
	{await router.push('/admin/article', '/admin/article', { locale: localValue.trim(),shallow: true });}
	else
	{await router.push('/welcome', '/welcome', { locale: localValue.trim(),shallow: true });}
	
	
   }

	return (
		//             </HStack>
		//             {/* <Text pt={'50px'} fontSize={['sm', 'md']} color={'brand.textGray'} fontWeight={'semibold'}>
		//                 <FormattedMessage id={'login_by'} defaultMessage='Login by' />
		//             </Text>
		//             <HStack>
		//                 <SocialButton label={'Facebook'} href={'#'}
		//                               bgColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.100')}>
		//                     <i style={{'fontSize': '1.5em'}} className="pi pi-facebook"></i>
		//                 </SocialButton>
		//                 <SocialButton label={'Facebook'} href={'#'}
		//                               bgColor={useColorModeValue('blackAlpha.50', 'whiteAlpha.100')}>
		//                     <i style={{'fontSize': '1.5em'}} className="pi pi-google"></i>
		//                 </SocialButton>
		//             </HStack> */}

		<Stack
			dir={dirState}
			minH={'100vh'}
			direction={{ base: 'column', md: 'row' }}
			bg={'brand.white'}
			backgroundSize={'cover'}
		>
			<Flex p={8} flex={1} align={'center'} justify={'center'}>
				<Stack spacing={6} w={'full'} maxW={'lg'}>
					<Text
						fontSize={['md', 'lg', 'xl', '3xl']}
						pt={'15px'}
						color={'brand.blue'}
						fontWeight={'semibold'}
					>
						<FormattedMessage
							id={'welcome_our_clinic'}
							defaultMessage='welcome our clinic'
						/>
					</Text>


					<Formik
						initialValues={{  password: '',username:'' }}
						validate={(values) => {
							const errors = {};
							if (!values.username) {
								errors.username = <FormattedMessage  id={'required'} defaultMessage='Required'  />;
							}
                            if (!values.password) {
                                errors.password =<FormattedMessage  id={'required'} defaultMessage='required' />;
                            }
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
                              
                            
                            const dataToRequestAPI = {
	                        username: values.username,
	                        password: values.password,
                                  }
								  SignRequest('/signin/',dataToRequestAPI,loginResult)
								setSubmitting(false);
							}, 400);
						}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							isSubmitting,
						}) => (
							<form onSubmit={handleSubmit}>
								<FormLabel>
									<FormattedMessage id={'username'} defaultMessage='username' />
								</FormLabel>
								<Input
									type='text'
									name='username'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.username}
								/>
							   <Text color={"red"}>{errors.username && touched.username && errors.username}</Text>	
								<FormLabel pt={'5%'}>
									<FormattedMessage id={'password'} defaultMessage='password' />
								</FormLabel>
								<Input
									type='password'
									name='password'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.password}
								/>
								 <Text color={"red"}>{errors.password && touched.password && errors.password}</Text>	

								{/* <label>
						<FormattedMessage id={'password'} defaultMessage='password' />
					</label>
					<Input
						type='password'
						borderColor={'brand.blue'}
						onChange={onPassTextChanged}
					/> */}
								<HStack pt={'4%'} justify={'space-between'}>
									<Text
										fontSize={['md']}
										color={'brand.textGray'}
										textDecoration={'underline'}
										cursor={'pointer'}
										onClick={() => goSignUpPage()}
										fontWeight={'semibold'}
									>
										<FormattedMessage
											id={'dont_have_account'}
											defaultMessage='Dont have account'
										/>
									</Text>
									<Checkbox colorScheme='blue' defaultChecked>
										<Text fontSize={['lg']} color={'brand.textGray'}>
											<FormattedMessage
												id={'remember_me'}
												defaultMessage='Remember me'
											/>
										</Text>
									</Checkbox>
								</HStack>

								<Stack
									direction={{ base: 'column', md: 'row' }}
									spacing={8}
									pt={'10%'}
								>
									<Button
										w={'400px'}
										variant='primary'
										type='submit'
										disabled={isSubmitting}
									>
										<FormattedMessage id={'login'} defaultMessage='login' />
									</Button>
								</Stack>
							</form>
						)}
					</Formik>
				</Stack>
			</Flex>
			<VStack flex={1}>
				<Image
					alt={'Login Image'}
					objectFit={'cover'}
					rounded={'xl'}
					align={'center'}
					w={'60%'}
					h={'60%'}
					src={'/assets/images/Clinic.svg'}
				/>
				<Text
					fontSize={['sm', 'md', 'lg', 'xl']}
					pt={'15px'}
					color={'brand.blue'}
					fontWeight={'semibold'}
				>
					ADHD Center Online Clinic
				</Text>
			</VStack>
		</Stack>
	);
}
SignIn.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutWithoutBar>
            {page}
        </LayoutWithoutBar>
    )
}

export default  SignIn;