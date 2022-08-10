
import { Container, Flex } from "@chakra-ui/react"
import Layout from "./components/Layout"
import Navbar from '../../components/Navbar/Navbar'

const Home = () => {
  return (
    <Container maxW={'container.xl'} h={'100vh'} minH={'100vh'} mx={'auto'} pb={2}>
        <Flex h={'100%'} flexDirection={'column'}>
            <Navbar />
            <Layout/>
        </Flex>
    </Container>
  )
}

export default Home