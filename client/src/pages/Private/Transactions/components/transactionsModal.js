import { Box, Button, Flex, FormControl, FormLabel, HStack, Input, InputGroup, InputLeftAddon, InputRightAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Stack, Textarea } from "@chakra-ui/react"
import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCategories } from "../../../../redux/states/categories"
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

const TransactionsModal = ({isOpen, onClose, expenseData}) => {

    const [type, setType] = useState('type-expense')

    const handleChange = (e) => {
        setType(e.target.name)
      }
    
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

    useEffect(() => {
        if(token)
        dispatch(getCategories(token))  
    }, [token, onClose]); // eslint-disable-line react-hooks/exhaustive-deps



  return (
    // <Modal isCentered isOpen={isOpen} onClose={onClose} size={{base:'xs', md: 'md'}}>
    //     <ModalOverlay
    //       bg='blackAlpha.300'
    //       backdropFilter='blur(10px)'
    //     />
    //     <ModalContent>
    //       <ModalHeader>New Transaction</ModalHeader>
    //       <ModalCloseButton />
    //       <ModalBody>
    //         <Flex flexDirection={'column'} p={4} gap={4} as='form' id='new-form' onSubmit={handleSubmit}>
    //             <FormControl id='type'>
    //                 <RadioGroup defaultValue='expense' name='type' id='type' onClick={handleChange}>
    //                     <HStack spacing='24px'>
    //                         <Radio  name='type-expense' value='expense' id='type-expense'>Expense</Radio>
    //                         <Radio  name='type-income' value='income' id='type-income'>Income</Radio>
    //                     </HStack>
    //                 </RadioGroup>
    //             </FormControl>
    //             <HStack spacing='24px'>
    //             <FormControl isRequired>
    //                 <FormLabel fontSize={{base:'xs', md: 'md'}}>Category</FormLabel>
    //                 <Select fontSize={{base:'xs', md: 'md'}} placeholder='Select a category' name='category' textTransform={'Capitalize'} size='sm' >
    //                     {type === 'type-expense' ? expenses.map((expense, key) => <option key={key} value={expense.id}>{expense.name}</option>) : incomes.map((incomes, key) => <option key={key} value={incomes.id}>{incomes.name}</option>)}
    //                 </Select>
    //                 </FormControl>
    //                 <FormControl isRequired>
    //                 <FormLabel fontSize={{base:'xs', md: 'md'}}>Enter amount</FormLabel>
    //                 <NumberInput min={0.1} placeholder='0' name='amount' size={'sm'} defaultValue={expenseData.amount}>
    //                     <NumberInputField />
    //                     <NumberInputStepper>
    //                     <NumberIncrementStepper />
    //                     <NumberDecrementStepper />
    //                     </NumberInputStepper>
    //                 </NumberInput>
    //                 </FormControl>
    //             </HStack>
    //             <FormControl isRequired>
    //                 <FormLabel fontSize={{base:'xs', md: 'md'}}>Description</FormLabel>
    //                 <Input name='name' placeholder='Description' defaultValue={expenseData.name}/>
    //             </FormControl>
    //             <FormControl isRequired>
    //             <FormLabel fontSize={{base:'xs', md: 'md'}}>Date</FormLabel>
    //             <Input
    //                   name='date'
    //                   placeholder="Select Date and Time"
    //                   size="md"
    //                   type="date"
    //                   />
    //             </FormControl>
    //         </Flex>
    //       </ModalBody>
    //       <ModalFooter gap={2}>
    //         <Button type='submit' form='edit-transaction' isLoading={loading} loadingText='Adding transaction'>Add</Button>
    //         <Button onClick={onClose}>Close</Button>
    //       </ModalFooter>
    //     </ModalContent>
    //   </Modal>


    <Drawer
        isOpen={isOpen}
        placement='right'
        // initialFocusRef={firstField}
        onClose={onClose}
        size={{base:'xs', md: 'md'}}
      >
        {/* <DrawerOverlay /> */}
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create a new account
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel htmlFor='username'>Name</FormLabel>
                <Input
                //   ref={firstField}
                  id='username'
                  placeholder='Please enter user name'
                />
              </Box>

              <Box>
                <FormLabel htmlFor='url'>Url</FormLabel>
                <InputGroup>
                  <InputLeftAddon>http://</InputLeftAddon>
                  <Input
                    type='url'
                    id='url'
                    placeholder='Please enter domain'
                  />
                  <InputRightAddon>.com</InputRightAddon>
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor='owner'>Select Owner</FormLabel>
                <Select id='owner' defaultValue='segun'>
                  <option value='segun'>Segun Adebayo</option>
                  <option value='kola'>Kola Tioluwani</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='desc'>Description</FormLabel>
                <Textarea id='desc' />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}
export default TransactionsModal