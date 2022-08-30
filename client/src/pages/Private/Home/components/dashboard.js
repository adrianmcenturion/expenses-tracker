import { Flex, Text } from '@chakra-ui/react'
import { AddTransactionModal } from './modal'

const Dashboard = () => {

  return (
    <Flex justifyContent={'center'} align="center" gap={4} p={4}>
        <Text fontSize={'lg'}>Add New Transaction</Text>
        <AddTransactionModal add={true}/>
    </Flex>
  )
}

export default Dashboard