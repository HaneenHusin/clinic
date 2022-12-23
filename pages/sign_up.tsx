import {
	Button,
	Flex,
	FormLabel,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Stack,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { ReactElement, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRecoilState } from 'recoil';
import { myDirectionState } from '../Atoms/localAtoms';
import LayoutWithoutBar from '../src/components/layout_without_bar';
import { SignRequest } from '../src/services/api';
import { NextPageWithLayout } from './_app';

const SignUp: NextPageWithLayout = () => {
	const router = useRouter();
	const [dirState] = useRecoilState(myDirectionState);
	const [show, setShow] = React.useState(false);
	const [showConfirm, setShowConfirm] = React.useState(false);
	const handleClick = () => setShow(!show);
	const handleconfirmClick = () => setShowConfirm(!showConfirm);

	async function Register(response: any) {
		const { pathname, asPath, query } = router;
		await router.push('/sign_in', '/sign_in', { shallow: true });
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

					<Formik
						initialValues={{
							email: '',
							password: '',
							confirm_password: '',
							username: '',
							firstname: '',
							lastname: '',
						}}
						validate={(values) => {
							const errors = {};
							if (!values.username) {
								errors.username = (
									<FormattedMessage id={'required'} defaultMessage='Required' />
								);
							}
							if (
								values.email &&
								!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
							) {
								errors.email = (
									<FormattedMessage
										id={'invalid_email'}
										defaultMessage='Invalid email address'
									/>
								);
							}
							if (!values.confirm_password) {
								errors.confirm_password = (
									<FormattedMessage id={'required'} defaultMessage='required' />
								);
							} else if (values.confirm_password != values.password) {
								errors.confirm_password = (
									<FormattedMessage
										id={'dosnt_match'}
										defaultMessage='password dosnt match'
									/>
								);
							}
							if (!values.password) {
								errors.password = (
									<FormattedMessage id={'required'} defaultMessage='required' />
								);
							}
							return errors;
						}}
						onSubmit={(values, { setSubmitting }) => {
							setTimeout(() => {
								alert(JSON.stringify(values, null, 2));
								const dataToRequestAPI = {
									username: values.username,
									password: values.password,
									first_name: values.firstname,
									last_name: values.lastname,
									password1: values.password,
									password2: values.confirm_password,
								};
								SignRequest('/signup/', dataToRequestAPI, Register);
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
								/>{' '}
								<Text color={'red'}>{errors.username}</Text>
								<FormLabel pt={'3%'}>
									<FormattedMessage
										id={'firstname'}
										defaultMessage='firstname'
									/>
								</FormLabel>
								<Input
									type='text'
									name='firstname'
									onChange={handleChange}
									onBlur={handleBlur}
									borderColor={'brand.blue'}
									value={values.firstname}
								/>
								<FormLabel pt={'3%'}>
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
								<FormLabel pt={'3%'}>
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
								<Text color={'red'}>
									{errors.email && touched.email && errors.email}
								</Text>
								<FormLabel pt={'3%'}>
									<FormattedMessage id={'password'} defaultMessage='password' />
								</FormLabel>
								<InputGroup size='md'>
									<Input
										type={show ? 'text' : 'password'}
										name='password'
										onChange={handleChange}
										onBlur={handleBlur}
										borderColor={'brand.blue'}
										value={values.password}
									/>
									{dirState == 'ltr' ? (
										<InputRightElement width='4.5rem'>
											<Button h='1.75rem' size='sm' onClick={handleClick}>
												{show ? (
													<i
														style={{ color: 'blue' }}
														className='pi pi-eye-slash'
													></i>
												) : (
													<i
														style={{ color: 'blue' }}
														className='pi pi-eye'
													></i>
												)}
											</Button>
										</InputRightElement>
									) : (
										<InputLeftElement width='4.5rem'>
											<Button h='1.75rem' size='sm' onClick={handleClick}>
												{show ? (
													<i
														style={{ color: 'blue' }}
														className='pi pi-eye-slash'
													></i>
												) : (
													<i
														style={{ color: 'blue' }}
														className='pi pi-eye'
													></i>
												)}
											</Button>
										</InputLeftElement>
									)}
								</InputGroup>
								<Text color={'red'}>
									{errors.password && touched.password && errors.password}
								</Text>
								<FormLabel pt={'3%'}>
									<FormattedMessage
										id={'confirm_pass'}
										defaultMessage='password'
									/>
								</FormLabel>
								<InputGroup size='md'>
									<Input
										type={showConfirm ? 'text' : 'password'}
										name='confirm_password'
										onChange={handleChange}
										onBlur={handleBlur}
										borderColor={'brand.blue'}
										value={values.confirm_password}
									/>
									{dirState == 'ltr' ? (
										<InputRightElement width='4.5rem'>
											<Button
												h='1.75rem'
												size='sm'
												onClick={handleconfirmClick}
											>
												{showConfirm ? (
													<i
														style={{ color: 'blue' }}
														className='pi pi-eye-slash'
													></i>
												) : (
													<i
														style={{ color: 'blue' }}
														className='pi pi-eye'
													></i>
												)}
											</Button>
										</InputRightElement>
									) : (
										<InputLeftElement width='4.5rem'>
											<Button
												h='1.75rem'
												size='sm'
												onClick={handleconfirmClick}
											>
												{showConfirm ? (
													<i
														style={{ color: 'blue' }}
														className='pi pi-eye-slash'
													></i>
												) : (
													<i
														style={{ color: 'blue' }}
														className='pi pi-eye'
													></i>
												)}
											</Button>
										</InputLeftElement>
									)}
								</InputGroup>
								<Text color={'red'}>{errors.confirm_password}</Text>
								<Stack
									direction={{ base: 'column', md: 'row' }}
									spacing={4}
									pt={'8%'}
								>
									<Button
										w={'400px'}
										variant='primary'
										type='submit'
										disabled={isSubmitting}
									>
										<FormattedMessage
											id={'register'}
											defaultMessage='Register'
										/>
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
};
SignUp.getLayout = function getLayout(page: ReactElement) {
	return <LayoutWithoutBar>{page}</LayoutWithoutBar>;
};

export default SignUp;
