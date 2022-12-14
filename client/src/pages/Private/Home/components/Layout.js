import { Flex, Grid, GridItem, Box, Text, useColorModeValue, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./dashboard";
import { useEffect } from "react";
import { getBalance } from "../../../../redux/states/expenses";
import { PieChartGraph } from "./chart";
import RecentTransactions from "./recentTransactions";
import { logout, userInfoAction } from "../../../../redux/states/auth";

const Layout = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const { balance, expense, income, transactions, success, error } = useSelector(state => state.expenses)
 
  useEffect(() => {
    if(token)
    dispatch(getBalance(token))
    dispatch(userInfoAction(token))

  }, [token, success]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {

    if(error === 'Not authorized'){
      // alert('Token expired')
      dispatch(logout())
    }
    
  }, [error]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Grid
        h={"100%"}
        templateAreas={`" dash dash dash dash"
        " balance balance balance balance"
                        " total-expenses-graph total-expenses-graph total-expenses-graph total-expenses-graph"
                        " total-expenses-graph total-expenses-graph total-expenses-graph total-expenses-graph"
                        " recent-transactions recent-transactions recent-transactions recent-transactions"`}
                        gridTemplateRows={"0.5fr 0.5fr 1.5fr 1.5fr 1.5fr"}
                        gridTemplateColumns={"1fr 1fr 1fr 1fr"}
                        gap="1"
                        fontWeight="bold"
                        py={1}
                        >
        <GridItem bg={'rgba(0,0,0,0.025)'} borderRadius={6} border={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} area={"dash"} display='grid' alignContent="center">
          <Dashboard />
        </GridItem>
        <GridItem area={"balance"} display='grid' alignContent="center" bg={'rgba(0,0,0,0.025)'} borderRadius={6} border={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} p={4}>
          <Flex gap={4} justifyContent='space-evenly' fontSize={{base:'xs', md: 'md'}}>
            <Box textAlign={'center'}>
              Income
              <Text color={'green.500'}>${income}</Text>
            </Box>
            <Box textAlign={'center'}>
              Expenses
              <Text color={'red.500'}>${expense}</Text>
            </Box>
            <Box textAlign={'center'}>
              Balance
              <Text color={balance > 0 ? 'green.500' : 'red.500'}>${balance}</Text>
            </Box>
            <Box textAlign={'center'}>
              Transactions
              <Text color={'blue.500'}>{transactions}</Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem  bg={'rgba(0,0,0,0.025)'} borderRadius={6} border={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} area={"total-expenses-graph"} minH={'400px'} maxH='800px'>
          <PieChartGraph />
        </GridItem>
        <GridItem area={"recent-transactions"} display='grid' w='100%' bg={'rgba(0,0,0,0.025)'} borderRadius={6} border={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')}>
          <RecentTransactions />
        </GridItem>
      </Grid>
      {error === 'Not authorized' ? <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Token expired!</AlertTitle>
        <AlertDescription>Please log in again.</AlertDescription>
      </Alert> : null}
    </>
  );
};

export default Layout;
