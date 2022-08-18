import { Flex, Spacer, Text, Link, Center, Spinner} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLastMovements } from "../../../redux/states/expenses";
import { Link as RouteLink } from "react-router-dom";
import GridTransactions from "../../../components/transactionsGrid";


const RecentTransactions = () => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const {movements, success, loading} = useSelector(state => state.expenses)

    useEffect(() => {
        if(token)
        dispatch(getLastMovements(token))
        
    }, [token, success]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex flexDirection={'column'} p={4} gap={2}>
        <Flex align={'center'}>
            <Text fontSize={'lg'} >Recent Transactions</Text>
            <Spacer />
            <Link
                as={RouteLink}
                to={'/transactions'}
                fontWeight={'bold'}
                px={2}
                py={1}
                fontSize={{base: 'sm', md: 'md'}}
                textTransform={'capitalize'}
                >
                    View all
            </Link>
        </Flex>
        {loading ? <Center h={'100%'}><Spinner /></Center> : <GridTransactions data={movements}/>}
    </Flex>
    
  )
}

export default RecentTransactions