import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormLabel,
	HStack,
	Image,
	Input,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRecoilState } from 'recoil';
import { myLayoutState } from '../Atoms/layout';
import { myDirectionState, myLocalState } from '../Atoms/localAtoms';
import { formSignInState } from '../Atoms/signInAtom';
import SocialButton from '../src/components/social_button';
import { SIGN_IN_API_URL, SIGN_UP_API_URL } from '../src/http-endpoint';
import { RequestA, RequestForm, useAxios } from '../src/services/request';

export default function SignUp() {
	const [headerFooterState, setHeaderFooterState] =useRecoilState(myLayoutState);

	useState(() => {
		setHeaderFooterState({
			...headerFooterState,
			footer: 'none',
			appBar: 'none',
		});
		console.log('bottom ' + headerFooterState.footer);
	});
	const [localState] = useRecoilState(myLocalState);
	const localValue = `${localState} `;
	const [dirState] = useRecoilState(myDirectionState);
	const [form, setForm] = useRecoilState(formSignInState);
	console.log('localValue    ' + localValue);

	function Register() {
		console.log('');
	}

	return (
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
					{/* <label>
						<FormattedMessage id={'email'} defaultMessage='email' />
					</label>
					<Input
						type='email'
						borderColor={'brand.blue'}
						onChange={onEmailTextChanged}
					/>
					<label>
						<FormattedMessage id={'password'} defaultMessage='password' />
					</label>
					<Input
						type='password'
						borderColor={'brand.blue'}
						onChange={onPassTextChanged}
					/>
					<label>
						<FormattedMessage
							id={'confirm_pass'}
							defaultMessage='Confirm password'
						/>
					</label>
					<Input
						type='password'
						borderColor={'brand.blue'}
						onChange={onPassTextMatchChanged}
					/> */}
                    	<Formik
						initialValues={{ email: '', password: '',confirm_password:'',username:'',firstname:'',lastname:'' }}
						validate={(values) => {
							const errors = {};
							if (!values.username) {
								errors.username = <FormattedMessage  id={'required'} defaultMessage='Required'  />;
							}  if (values.email &&!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
							) {
								errors.email =<FormattedMessage  id={'invalid_email'} defaultMessage='Invalid email address' />;
							
                        }  if  ( !values.confirm_password) {
                            errors.confirm_password =<FormattedMessage  id={'required'} defaultMessage='required' />;
                        }
                        else if(values.confirm_password !=values.password) {
                            errors.confirm_password =<FormattedMessage  id={'dosnt_match'} defaultMessage='password dosnt match' />;
                        }
                         if (!values.password) {
                            errors.password =<FormattedMessage  id={'required'} defaultMessage='required' />;
                        }
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
                                var bodyFormData = new FormData();
                                bodyFormData.append('username', values.username);
                                bodyFormData.append('email', values.email);
                                bodyFormData.append('first_name', values.firstname);
                                bodyFormData.append('last_name', values.lastname);
                                bodyFormData.append('password1', values.password);
                                bodyFormData.append('password2', values.confirm_password);
                                RequestForm(SIGN_UP_API_URL,bodyFormData,"Post");
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
								/> <Text color={"red"}>{errors.username }</Text>


                                	<FormLabel pt={"3%"}>  
									<FormattedMessage id={'firstname'} defaultMessage='firstname' />
								</FormLabel>
								<Input
									type='text'
									name='firstname'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.firstname}
								/>
                                <FormLabel pt={"3%"}>
									<FormattedMessage id={'lastname'} defaultMessage='lastname' />
								</FormLabel>
								<Input
									type='text'
									name='lastname'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.lastname}
								/>
								<FormLabel pt={"3%"}>
									<FormattedMessage id={'email'} defaultMessage='email' />
								</FormLabel>
								<Input
									type='email'
									name='email'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.email}
								/>
							   <Text color={"red"}>{errors.email && touched.email && errors.email}</Text>	
								<FormLabel pt={'3%'}>
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
                                 <FormLabel pt={'3%'}>
									<FormattedMessage id={'confirm_pass'} defaultMessage='password' />
								</FormLabel>
								<Input
									type='password'
									name='confirm_password'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.confirm_password}
								/>
								 <Text color={"red"}>{errors.confirm_password }</Text>	


					<Stack direction={{ base: 'column', md: 'row' }} spacing={4} pt={"8%"}>
						<Button w={'400px'} variant='primary' 	type='submit'	disabled={isSubmitting} onClick={() => Register()}>
							<FormattedMessage id={'register'} defaultMessage='Register' />
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
