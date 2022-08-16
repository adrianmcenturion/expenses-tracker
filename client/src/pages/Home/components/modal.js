import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormLabel, Flex, FormControl, RadioGroup, HStack, Radio, Select, Input, NumberInput, NumberInputField,
 NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from '../../../redux/states/expenses';
import { getCategories } from '../../../redux/states/categories';
import { useEffect, useState } from 'react';
import moment from 'moment';


export const AddTransactionModal = ({isOpen, onClose}) => {

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
            name: e.target.name.value,
            date:  moment.utc(e.target.date.value).format('YYYY-MM-DD'),
            amount: +e.target.amount.value,
            category: +e.target.category.value,
            type: type === 'type-expense' ? 'expense' : 'income',
            token: token
        }

        if(token)
        dispatch(addExpense(data))
        if(success) onClose()
    }

    useEffect((token, dispatch) => {
        if(token)
        dispatch(getCategories(token))
    }, []);

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} >
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px)'
        />
        <ModalContent>
          <ModalHeader>New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={'column'} p={4} gap={4} as='form' id='new-form' onSubmit={handleSubmit}>
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
                    <FormLabel>Category</FormLabel>
                    <Select placeholder='Select a category' name='category' textTransform={'Capitalize'}>
                        {type === 'type-expense' ? expenses.map((expense, key) => <option key={key} value={expense.id}>{expense.name}</option>) : incomes.map((incomes, key) => <option key={key} value={incomes.id}>{incomes.name}</option>)}
                    </Select>
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel>Enter an amount</FormLabel>
                    <NumberInput min={0.1} placeholder='0' name='amount'>
                        <NumberInputField />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    </FormControl>
                </HStack>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input name='name' placeholder='Name' />
                </FormControl>
                <FormControl >
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
            <Button type='submit' form='new-form' isLoading={loading} loadingText='Adding transaction'>Add</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

export default Modal