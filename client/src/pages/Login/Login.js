import { Container } from '@chakra-ui/react'
import Navbar from '../../components/Navbar/Navbar'
import LoginComponent from './components/LoginComponent'

const Login = () => {
  return (
    <Container maxW={'container.xl'} h={'100vh'} minH={'100vh'} mx={'auto'} pb={2}>
      <Navbar />
      <LoginComponent />
    </Container>
  )
}

export default Login