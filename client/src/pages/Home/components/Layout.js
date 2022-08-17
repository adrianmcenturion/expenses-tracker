import { Flex, Grid, GridItem, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./dashboard";
import Transactions from "./transactions";
import { useEffect } from "react";
import { getBalance } from "../../../redux/states/expenses";
import { PieChartGraph } from "./chart";

const Layout = () => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const { balance, expense, income, transactions, success } = useSelector(state => state.expenses)
 
  useEffect(() => {
    if(token)
    dispatch(getBalance(token))

  }, [token, success]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
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
      <GridItem bg={'rgba(0,0,0,0.15)'} borderRadius={6} border={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} area={"dash"} display='grid' alignContent="center">
        <Dashboard />
      </GridItem>
      <GridItem area={"balance"} display='grid' alignContent="center" bg={'rgba(0,0,0,0.15)'} borderRadius={6} border={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} p={4}>
        <Flex gap={4} justifyContent='space-evenly' fontSize={{base:'xs', md: 'md'}}>
          <Box textAlign={'center'}>
            Income
            <Text color={'green.500'}>${income}</Text>
          </Box>
          <Box textAlign={'center'}>
            Expenses
            <Text color={'red.400'}>${expense}</Text>
          </Box>
          <Box textAlign={'center'}>
            Balance
            <Text color={balance > 0 ? 'green.500' : 'red.400'}>${balance}</Text>
          </Box>
          <Box textAlign={'center'}>
            Transactions
            <Text color={'blue.400'}>{transactions}</Text>
          </Box>
        </Flex>
      </GridItem>
      <GridItem  bg={'rgba(0,0,0,0.15)'} borderRadius={6} border={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')} area={"total-expenses-graph"} maxH='600px'>
        <PieChartGraph />
      </GridItem>
      <GridItem area={"recent-transactions"} display='grid' w='100%'  bg={'rgba(0,0,0,0.15)'} borderRadius={6} border={'1px solid'} borderColor={useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)')}>
        <Transactions />
      </GridItem>
    </Grid>
  );
};

export default Layout;
