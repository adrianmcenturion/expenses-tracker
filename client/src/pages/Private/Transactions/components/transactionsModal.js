import { EditIcon } from "@chakra-ui/icons"
import { Button, Flex, FormControl, FormLabel, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, useDisclosure, } from "@chakra-ui/react"
import moment from "moment"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const TransactionsModal = ({expenseData}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [type, setType] = useState('type-expense')

  const handleChange = (e) => {
      setType(e.target.name)
    }

    console.log('render')
  
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const {loading, success} = useSelector((state) => state.expenses)
  const { expenses, incomes} = useSelector(state => state.categories)

  const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
          id: expenseData.id,
          name: e.target.name.value,
          date:  moment.utc(e.target.date.value).format('YYYY-MM-DD'),
          amount: +e.target.amount.value,
          category: +e.target.category.value,
          type: type === 'type-expense' ? 'expense' : 'income',
          token: token,
      }

      if(token && data){
          // dispatch(addExpense(data))
          success && onClose()
      }
      return
  }

  return (
    <>
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
    <Modal isCentered isOpen={isOpen} onClose={onClose} size={{base:'xs', md: 'md'}}>
        <ModalOverlay
          bg='blackAlpha.100'
          backdropFilter='blur(2px)'
          />
        <ModalContent>
          <ModalHeader>Edit Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={'column'} p={4} gap={4} as='form' id='edit-expense-form' onSubmit={handleSubmit}>
                <FormControl id='type'>
                    <RadioGroup defaultValue='expense' name='type' id='type' onClick={handleChange}>
                        <HStack spacing='24px'>
                            <Radio  name='type-expense' value='expense' id='type-expense'>Expense</Radio>
                            <Radio  name='type-income' value='income' id='type-income'>Income</Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
                <HStack spacing='24px'>
                <FormControl isRequired>
                    <FormLabel fontSize={{base:'xs', md: 'md'}}>Category</FormLabel>
                    <Select fontSize={{base:'xs', md: 'md'}} placeholder='Select a category' name='category' textTransform={'Capitalize'} size='sm' >
                        {type === 'type-expense' ? expenses.map((expense, key) => <option key={key} value={expense.id}>{expense.name}</option>) : incomes.map((incomes, key) => <option key={key} value={incomes.id}>{incomes.name}</option>)}
                    </Select>
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel fontSize={{base:'xs', md: 'md'}}>Enter amount</FormLabel>
                    <NumberInput min={0.1} placeholder='0' name='amount' size={'sm'} defaultValue={expenseData.amount}>
                        <NumberInputField />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </FormControl>
                </HStack>
                <FormControl isRequired>
                    <FormLabel fontSize={{base:'xs', md: 'md'}}>Description</FormLabel>
                    <Input name='name' placeholder='Description' defaultValue={expenseData.name}/>
                </FormControl>
                <FormControl isRequired>
                <FormLabel fontSize={{base:'xs', md: 'md'}}>Date</FormLabel>
                <Input
                      name='date'
                      placeholder="Select Date and Time"
                      size="md"
                      type="date"
                      />
                </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button type='submit' form='edit-transaction' isLoading={loading} loadingText='Adding transaction'>Add</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
  )
}
export default TransactionsModal