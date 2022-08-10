import { Flex, Grid, GridItem, Box, Text } from "@chakra-ui/react";
import Dashboard from "./dashboard";
import Transactions from "./transactions";

const Layout = () => {
  return (
    <Grid
      h={"100%"}
      templateAreas={`" dash dash dash dash"
                      " balance balance balance balance"
                      " total-expenses-graph total-expenses-graph total-expenses-graph total-expenses-graph"
                      " account-balance account-balance income-expense income-expense"
                      " recent-transactions recent-transactions recent-transactions recent-transactions"`}
      gridTemplateRows={"0.5fr 0.5fr 1.5fr 1.5fr 1.5fr"}
      gridTemplateColumns={"1fr 1fr 1fr 1fr"}
      gap="1"
      color="blackAlpha.700"
      fontWeight="bold"
      py={4}
    >
      <GridItem bg="pink.300" area={"dash"} display='grid' alignContent="center">
        <Dashboard />
      </GridItem>
      <GridItem bg="green.300" area={"balance"} display='grid' alignContent="center">
        <Flex gap={4} justifyContent='space-evenly'>
          <Box textAlign={'center'}>
            <Text>$23450</Text>
            Income
          </Box>
          <Box textAlign={'center'}>
            <Text>$3450</Text>
            Expenses
          </Box>
          <Box textAlign={'center'}>
            <Text>$20000</Text>
            Balance
          </Box>
          <Box textAlign={'center'}>
            <Text>2</Text>
            Transactions
          </Box>
        </Flex>
      </GridItem>
      <GridItem bg="blue.300" area={"total-expenses-graph"}>
        total-expenses-graph
      </GridItem>
      <GridItem bg="red.300" area={"account-balance"}>
        account-balance
      </GridItem>
      <GridItem bg="yellow.300" area={"income-expense"}>
        income-expense
      </GridItem>
      <GridItem  bg="cyan.400" area={"recent-transactions"} display='grid' w='100%'>
        <Transactions />
      </GridItem>
    </Grid>
  );
};

export default Layout;
