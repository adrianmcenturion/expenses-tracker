import { Container } from '@chakra-ui/react'
import Navbar from '../../components/Navbar/Navbar'
import RegisterComponent from './components/RegisterComponent'

const Register = () => {
  return (
    <Container maxW={'container.xl'} h={'100vh'} minH={'100vh'} mx={'auto'} pb={2}>
      <Navbar />
      <RegisterComponent />
    </Container>
  )
}

export default Register