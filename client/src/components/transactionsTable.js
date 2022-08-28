import { Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, } from "@chakra-ui/react";
import moment from "moment";
import Alert from "../pages/Private/Transactions/components/alert";
import { AddTransactionModal } from "../pages/Private/Home/components/modal";

const TransactionsTable = ({ data, allTransactions }) => {
  
  let dataToEdit = ''
  const handleChangeData = (e) => {
    // console.log(e)
  }



  return (
    <>
    <TableContainer>
      <Table size={{base:"sm", md: 'sm'}} textTransform="capitalize">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Category</Th>
            <Th>Description</Th>
            <Th isNumeric>Amount</Th>
            {allTransactions ? <Th></Th> : null}
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((e, key) => {
                return (
                  <Tr key={key} id={'expenseDataParent'}>
                  <Td>{moment(e.date).format("MM/DD/YYYY")}</Td>
                  <Td id={e.category.id}>{e.category.name}</Td>
                  <Td>{e.name}</Td>
                  <Td id={e.type} color={e.type === 'expenseType' ? 'red.400' : 'green.500'} isNumeric>${e.amount}</Td>
                  {allTransactions ? <Td id={e.id}>
                    <Flex gap={1} justifyContent={'flex-end'}>
                        <AddTransactionModal add={false} dataToEdit={dataToEdit} editFunction={handleChangeData}/>
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

