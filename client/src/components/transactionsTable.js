import { Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, } from "@chakra-ui/react";
import moment from "moment";
import Alert from "../pages/Private/Transactions/components/alert";
import { AddTransactionModal } from "../pages/Private/Home/components/modal";

const TransactionsTable = ({ data, allTransactions }) => {

  return (
    <>
    <TableContainer>
      <Table size={{base:"sm", md: 'sm'}} textTransform="capitalize" variant={'simple'}>
        <Thead>
          <Tr>
            <Th borderColor={'gray.700'}>Date</Th>
            <Th borderColor={'gray.700'}>Category</Th>
            <Th borderColor={'gray.700'}>Description</Th>
            <Th borderColor={'gray.700'} isNumeric>Amount</Th>
            {allTransactions ? <Th borderColor={'gray.700'}></Th> : null}
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((e, key) => {
                return (
                  <Tr key={key} id={'expenseDataParent'} fontWeight="normal">
                  <Td borderColor={'gray.700'}>{moment(e.date).format("MM/DD/YYYY")}</Td>
                  <Td borderColor={'gray.700'} id={e.category.id}>{e.category.name}</Td>
                  <Td borderColor={'gray.700'}>{e.name}</Td>
                  <Td borderColor={'gray.700'} fontWeight="semibold" id={e.type} color={e.type === 'expenseType' ? 'red.500' : 'green.500'} isNumeric>${e.amount}</Td>
                  {allTransactions ? <Td borderColor={'gray.700'} id={e.id}>
                    <Flex gap={1} justifyContent={'flex-end'}>
                        <AddTransactionModal add={false}/>
                        <Alert/>
                    </Flex>
                  </Td> : null}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
    
    </>
  );
};

export default TransactionsTable;

