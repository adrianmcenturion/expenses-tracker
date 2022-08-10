
import { Container } from '@chakra-ui/react'
import Navbar from '../../components/Navbar/Navbar'
import AdminComponent from './components/AdminComponent'

const Admin = () => {
  return (
    <Container maxW={'container.xl'} h={'100vh'} minH={'100vh'} mx={'auto'} pb={2}>
      <Navbar />
      <AdminComponent />
    </Container>
  )
}

export default Admin