import { Flex, Spacer, Text, Button, useDisclosure } from '@chakra-ui/react'
import { AddTransactionModal } from './modal'

const Dashboard = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <Flex justifyContent={'space-between'} align="center" p={4}>
        <Text fontSize={'lg'}>Dashboard</Text>
        <Spacer />
        <Button onClick={onOpen}>Add Transactions</Button>
        <AddTransactionModal onClose={onClose} isOpen={isOpen} />
    </Flex>
  )
}

export default Dashboard