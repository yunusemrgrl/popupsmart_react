import { Formik, Field } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useWindowSize } from 'usehooks-ts';
import { useAuth } from '../../context/AuthContext';
// COMPONENT
function Login() {
  const { width } = useWindowSize();
  const { login } = useAuth();
  return (
    <>
      <ToastContainer />
      <Flex bg='gray.100' align='center' justify='center' h='100vh'>
        {width > 650 ? (
          <>
            <Box
              bg='white'
              boxShadow='dark-lg'
              p={6}
              rounded='md'
              w={64}
              zIndex={100}
            >
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  rememberMe: false,
                }}
                onSubmit={(values) => {
                  try {
                    login({ email: values.email, password: values.password });
                  } catch (e) {
                    console.log('Login', e);
                  }
                }}
              >
                {({ handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align='flex-start'>
                      <FormControl>
                        <FormLabel htmlFor='email'>Email Address</FormLabel>
                        <Field
                          as={Input}
                          id='email'
                          name='email'
                          type='email'
                          variant='filled'
                        />
                      </FormControl>
                      <FormControl
                        isInvalid={!!errors.password && touched.password}
                      >
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Field
                          as={Input}
                          id='password'
                          name='password'
                          type='password'
                          variant='filled'
                          validate={(value) => {
                            let error;

                            if (value.length < 5) {
                              error =
                                'Password must contain at least 6 characters';
                            }

                            return error;
                          }}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      </FormControl>
                      <Field
                        as={Checkbox}
                        id='rememberMe'
                        name='rememberMe'
                        colorScheme='purple'
                      >
                        Remember me?
                      </Field>
                      <Button type='submit' colorScheme='purple' width='full'>
                        Login
                      </Button>
                    </VStack>
                  </form>
                )}
              </Formik>
            </Box>
            <Box
              boxShadow='2xl'
              bg='linear-gradient(226deg, #cd53b6, #4a85b6)'
              zIndex={99}
              ml={-10}
              p={8}
              rounded='md'
              w={600}
              h={600}
            >
              <Flex
                w={'full'}
                h={'full'}
                align='center'
                justify='center'
                direction='column'
              >
                <Heading fontSize='4xl' color='white' as='em'>
                  Welcome !
                </Heading>
                <Text fontSize='2xl' color='white' as='em' mt={30}>
                  {' '}
                  Don't have an account ?
                </Text>
                <Link to='../register'>
                  <Button
                    type='button'
                    pl={8}
                    pr={8}
                    colorScheme='gray'
                    width='full'
                    mt={10}
                  >
                    Signup
                  </Button>
                </Link>
              </Flex>
            </Box>
          </>
        ) : (
          <Box
            bg='white'
            boxShadow='dark-lg'
            p={6}
            rounded='md'
            w={64}
            zIndex={100}
          >
            <Formik
              initialValues={{
                email: '',
                password: '',
                rememberMe: false,
              }}
              onSubmit={(values) => {
                try {
                  login(values.email, values.password);
                } catch (e) {
                  console.log('Login', e);
                }
              }}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align='flex-start'>
                    <FormControl>
                      <FormLabel htmlFor='email'>Email Address</FormLabel>
                      <Field
                        as={Input}
                        id='email'
                        name='email'
                        type='email'
                        variant='filled'
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor='password'>Password</FormLabel>
                      <Field
                        as={Input}
                        id='password'
                        name='password'
                        type='password'
                        variant='filled'
                        validate={(value) => {
                          let error;
                          if (value.length < 5) {
                            error =
                              'Password must contain at least 6 characters';
                          }
                          return error;
                        }}
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <Field
                      as={Checkbox}
                      id='rememberMe'
                      name='rememberMe'
                      colorScheme='purple'
                    >
                      Remember me?
                    </Field>
                    <Button type='submit' colorScheme='purple' width='full'>
                      Login
                    </Button>
                    <Flex
                      justify='space-between'
                      alignItems='center'
                      width='full'
                    >
                      <Text fontSize='sm' color='black' as='em'>
                        Don't have an account ?
                      </Text>
                      <Link to='../register'>
                        <Text
                          textDecoration='underline'
                          fontSize='sm'
                          _hover={{ fontSize: 'm', color: 'blue' }}
                        >
                          Signup
                        </Text>
                      </Link>
                    </Flex>
                  </VStack>
                </form>
              )}
            </Formik>
          </Box>
        )}
      </Flex>
    </>
  );
}

export default Login;
