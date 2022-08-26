import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, } from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import TransactionsModal from "../pages/Private/Transactions/components/transactionsModal";
import Alert from "../pages/Private/Transactions/components/alert";
import { useDispatch, useSelector } from "react-redux";
import { getMovements } from "../redux/states/expenses";

const TransactionsTable = ({ data, allTransactions }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const cancelRef = useRef()
  const [expenseData, setExpenseData] = useState({});
  const [idToDelete, setIdToDelete] = useState()
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const {success} = useSelector(state => state.expenses)

  const handleDelete = (e) => {
    setIdToDelete(e.currentTarget.parentNode.parentNode.id);
    //parentNode.parentNode.parentNode.id
    onOpenDelete()
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setExpenseData({
      date: e.target.children[0].children[0].innerHTML,
      category: e.target.children[1].children[0].innerHTML,
      name: e.target.children[2].children[0].innerHTML,
      amount: e.target.children[3].children[0].innerHTML.slice(1),
      id: e.target.children[4].id,
    });

    console.log(e.target.children[0].children[0].innerHTML);
    console.log(e.target.children[1].children[0].innerHTML);
    console.log(e.target.children[2].children[0].innerHTML);
    console.log(e.target.children[3].children[0].innerHTML.slice(1));
    console.log(e.target.children[4].id);
  };

  // useEffect(() => {
  //   if(token)
  //   dispatch(getMovements(token))

  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                  <Tr key={key}>
                  <Td>{moment(e.date).format("MM/DD/YYYY")}</Td>
                  <Td>{e.category.name}</Td>
                  <Td>{e.name}</Td>
                  <Td color={e.type === 'expenseType' ? 'red.400' : 'green.500'} isNumeric>${e.amount}</Td>
                  {allTransactions ? <Td id={e.id}>
                    <Flex gap={1}>
                      <IconButton
                        fontSize={{ base: "x-small", md: "md" }}
                        onClick={onOpen}
                        type="submit"
                        size={{ base: "10rem", md: "sm" }}
                        p={1}
                        borderRadius={{ base: "sm", md: "md" }}
                        bg={"blue.700"}
                        _hover={{ bg: "blue.500" }}
                        icon={<EditIcon />}
                        ></IconButton>
                      <IconButton
                        fontSize={{ base: "x-small", md: "md" }}
                        onClick={handleDelete}
                        size={{ base: "10rem", md: "sm" }}
                        p={1}
                        borderRadius={{ base: "sm", md: "md" }}
                        bg={"red.700"}
                        _hover={{ bg: "red.500" }}
                        icon={<CloseIcon />}
                        ></IconButton>
                      <TransactionsModal
                        onClose={onClose}
                        isOpen={isOpen}
                        expenseData={expenseData}
                        />
                    </Flex>
                  </Td> : null}
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
    <Alert isOpen={isOpenDelete} onClose={onCloseDelete} cancelRef={cancelRef} id={idToDelete} />
    </>
  );
};

export default TransactionsTable;

