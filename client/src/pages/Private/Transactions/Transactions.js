import { Flex, Container, Text, Spinner, AbsoluteCenter, Center, } from "@chakra-ui/react"
import Navbar from '../../../components/Navbar/Navbar'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMovements } from "../../../redux/states/expenses";
import TransactionsTable from "../../../components/transactionsTable";

const Transactions = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const {movements, loading, success} = useSelector(state => state.expenses)

    useEffect(() => {
        if(token)
        dispatch(getMovements(token))
        
    }, [token, success]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Container maxW={'container.xl'} h={'100vh'} minH={'100vh'} mx={'auto'} pb={2}>
            <Flex h={'100%'} flexDirection={'column'}>
                <Navbar />
                <Flex flexDirection={'column'} p={4} gap={2}>
                    <Flex align={'center'}>
                        <Text fontSize={'lg'} >Transactions</Text>
                    </Flex>
                    {loading ? <AbsoluteCenter><Spinner /></AbsoluteCenter> : movements.length !== 0 ? <TransactionsTable data={movements} allTransactions={true}/> : <Center h={'100%'}><Text>No transactions</Text></Center>}
                </Flex>
            </Flex>
        </Container>
      )
    }

export default Transactions