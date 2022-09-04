
import { Container, Flex, useColorModeValue } from '@chakra-ui/react'
import Navbar from '../../../components/Navbar/Navbar'
import AdminComponent from './components/AdminComponent'

const Admin = () => {
  return (
    <Container maxW={'container.xl'} h={'100vh'} minH={'100vh'} mx={'auto'} pb={2}>
      <Flex h={'100%'} flexDirection={'column'} gap={1}>
        <Navbar />
        <Flex flexDirection={'column'} p={4} bg={'rgba(0,0,0,0.025)'} borderRadius={6} border={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} overflow={'auto'}>
          <AdminComponent />
        </Flex>
      </Flex>
    </Container>
  )
}

export default Admin