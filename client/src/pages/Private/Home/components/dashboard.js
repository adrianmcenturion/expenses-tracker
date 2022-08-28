import { Flex, Spacer, Text, Button, useDisclosure } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { AddTransactionModal } from './modal'

const Dashboard = () => {

  // const { isOpen, onOpen, onClose } = useDisclosure()
  const {name} = useSelector(state => state.auth.userInfo)

  return (
    <Flex justifyContent={'space-between'} align="center" p={4}>
        <Text fontSize={'lg'}>{name}'s Dashboard</Text>
        <Spacer />
        {/* <Button onClick={onOpen} size={{base: 'sm', md: 'md'}} >Add Transactions</Button> */}
        <AddTransactionModal add={true}/>
    </Flex>
  )
}

export default Dashboard