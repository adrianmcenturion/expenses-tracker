import { Flex, Spacer, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { AddTransactionModal } from './modal'

const Dashboard = () => {
  const {name} = useSelector(state => state.auth.userInfo)

  return (
    <Flex justifyContent={'space-between'} align="center" p={4}>
        <Text fontSize={'lg'}>{name}'s Dashboard</Text>
        <Spacer />
        <AddTransactionModal add={true}/>
    </Flex>
  )
}

export default Dashboard