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
  Text,
  Heading,
} from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWindowSize } from 'usehooks-ts';
// COMPONENT
function Register() {
  const { register } = useAuth();
  const { width } = useWindowSize();

  return (
    <>
      <ToastContainer />
      <Flex bg='gray.100' align='center' justify='center' h='100vh'>
        {width > 650 ? (
          <>
            <Box
              bg='white'
              boxShadow='dark-lg'
              zIndex={100}
              p={6}
              rounded='md'
              w={64}
            >
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  rememberMe: false,
                }}
                onSubmit={async (values) => {
                  await register({
                    email: values.email,
                    password: values.password,
                  });
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
                      <Button type='submit' colorScheme='blue' width='full'>
                        Register
                      </Button>
                    </VStack>
                  </form>
                )}
              </Formik>
            </Box>
            <Box
              boxShadow='2xl'
              bg='linear-gradient(330deg, #8aa9db, #2042aa)'
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
                  Already have an account ?
                </Text>
                <Link to='../login'>
                  <Button
                    type='button'
                    pl={8}
                    pr={8}
                    colorScheme='gray'
                    width='full'
                    mt={10}
                  >
                    Login
                  </Button>
                </Link>
              </Flex>
            </Box>
          </>
        ) : (
          <Box
            bg='white'
            boxShadow='dark-lg'
            zIndex={100}
            p={6}
            rounded='md'
            w={64}
          >
            <Formik
              initialValues={{
                email: '',
                password: '',
                rememberMe: false,
              }}
              onSubmit={(values) => {
                register({
                  email: values.email,
                  password: values.password,
                });
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
                    <Button type='submit' colorScheme='blue' width='full'>
                      Register
                    </Button>
                    <Flex
                      justify='space-between'
                      alignItems='center'
                      width='full'
                    >
                      <Text fontSize='sm' color='black' as='em'>
                        Already have an account ?
                      </Text>
                      <Link to='../login'>
                        <Text
                          textDecoration='underline'
                          fontSize='sm'
                          _hover={{ fontSize: 'm', color: 'blue' }}
                        >
                          Login
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

export default Register;
