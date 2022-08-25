import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, useColorModeValue, useToast, InputGroup, InputRightElement} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../../../redux/states/auth';
import { LoggedErrortoasts, Loggedtoasts} from '../../../components/toasts';
import { useEffect, useState } from 'react';
import { PrivateRoutes } from '../../../models/routes';

  const LoginComponent = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {loading, success, error, token } = useSelector((state) => state.auth)
    const toast = useToast()

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {email: e.target.email.value, password: e.target.password.value}
      dispatch(Login(data))

      if (success) {
        
        toast(Loggedtoasts())
        setTimeout(() => {
          navigate(`/${PrivateRoutes.PRIVATE}`, {replace: true}) 
        }, 2500);
      }
      if (error) {
        toast(LoggedErrortoasts())
      }
    }

    useEffect(() => {
      if (token) {
        navigate(`/${PrivateRoutes.PRIVATE}`, {replace: true}) 
      }
    }, [navigate, token])
    
    
    return (
      <Flex
        align={'center'}
        justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'rgba(0,0,0,0.15)'} borderRadius={6} border={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}
            as='form'
            onSubmit={handleSubmit}>
              <FormControl id="email">
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')}>Remember me</Checkbox>
                  <Link as={RouteLink} to={'/register'} color={'blue.400'}>Don't have an account?</Link>
                </Stack>
                <Button
                  isLoading={loading}
                  loadingText='Submitting'
                  type='submit'
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }

  export default LoginComponent