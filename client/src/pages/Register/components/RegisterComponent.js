import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, useToast} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouteLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { Register } from '../../../redux/states/auth';
import { toasts } from '../../../components/toasts';
  
 const RegisterComponent = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {loading} = useSelector((state) => state.auth)

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {name: e.target.name.value, email: e.target.email.value, password: e.target.password.value}
      console.log(data)
      dispatch(Register(data))
      toast(toasts)
      setTimeout(() => {
        !loading && navigate('/login')
      }, 1500);
    }
  
    return (
      <Flex
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box
            as='form'
            onSubmit={handleSubmit}
            rounded={'lg'}
            bg={'rgba(0,0,0,0.15)'} borderRadius={6} border={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} type="text" name='name'/>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} type="email" name='email'/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} type={showPassword ? 'text' : 'password'} name='password'/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={loading}
                  loadingText='Submitting'
                  type='submit'
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link as={RouteLink} to={'/login'} color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }

  export default RegisterComponent