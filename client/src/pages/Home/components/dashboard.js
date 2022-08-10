import { Flex, Spacer, Text, Input } from '@chakra-ui/react'

const Dashboard = () => {
  return (
    <Flex justifyContent={'space-between'} align="center" p={2}>
        <Text fontSize={'lg'}>Dashboard</Text>
        <Spacer />
        <Input
            maxW={'200px'}
            size="sm"
            type="datetime-local"
            />
    </Flex>
  )
}

export default Dashboard