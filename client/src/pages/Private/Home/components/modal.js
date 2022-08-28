import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormLabel, Flex, FormControl, RadioGroup, HStack, Radio, Select, Input, NumberInput, NumberInputField,
 NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useDisclosure, IconButton } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { addExpense, updateExpense } from '../../../../redux/states/expenses';
import { getCategories } from '../../../../redux/states/categories';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { AddIcon, EditIcon } from '@chakra-ui/icons';


export const AddTransactionModal = ({add}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [type, setType] = useState('type-expense')
  const [editData, setEditData] = useState({})
  

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

        

        if(!add){

          if(token && data){
            data.id = editData.id
            dispatch(updateExpense(data))
            if (success) {
              setTimeout(() => {
                onClose()
            }, 600);
            }
            
          }
          return
        }

        if(token && data){
          dispatch(addExpense(data))
          if (success) {
            setTimeout(() => {
              onClose()
          }, 600);
          }
          
        }
        return
    }

    const handleClick = (e) => {

      if(!add) {

        setEditData({
          id: +e.currentTarget.parentNode.parentNode.id,
          name: e.currentTarget.parentNode.parentNode.parentNode.children[2].childNodes[0].nodeValue,
          date:  moment(e.currentTarget.parentNode.parentNode.parentNode.children[0].childNodes[0].nodeValue).format('YYYY-MM-DD'),
          amount: +e.currentTarget.parentNode.parentNode.parentNode.children[3].childNodes[1].nodeValue,
          category: +e.currentTarget.parentNode.parentNode.parentNode.children[1].id,
          type: e.currentTarget.parentNode.parentNode.parentNode.children[3].id,
        })
        console.log(editData)
      }
      onOpen()

    }

    useEffect(() => {
        if(token)
        dispatch(getCategories(token))  
    }, [token, onClose]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <IconButton onClick={handleClick} fontSize={{ base: "x-small", md: "md" }} size={add ? {base: 'sm', md: 'md'} : { base: "10rem", md: "sm" }} p={1} borderRadius={add ? { base: "lg", md: "lg" } : { base: "sm", md: "md" }} bg={add ? 'green.700' : 'blue.700'} icon={add ? <AddIcon /> : <EditIcon />} />
        <Modal isCentered isOpen={isOpen} onClose={onClose} size={{base:'xs', md: 'md'}}>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px)'
          />
        <ModalContent>
          <ModalHeader>{add ? 'New Transaction' : 'Edit Transaction'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={'column'} p={4} gap={4} as='form' id='new-form' onSubmit={handleSubmit}>
                <FormControl id='type'>
                    <RadioGroup defaultValue={editData.type === 'expenseType' ? 'expense' : 'income'} name='type' id='type' onClick={handleChange}>
                        <HStack spacing='24px'>
                            <Radio name='type-expense' value='expense' id='type-expense'>Expense</Radio>
                            <Radio name='type-income' value='income' id='type-income'>Income</Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
                <HStack spacing='24px'>
                <FormControl isRequired>
                    <FormLabel fontSize={{base:'xs', md: 'md'}}>Category</FormLabel>
                    <Select fontSize={{base:'xs', md: 'md'}} placeholder='Select a category' name='category' textTransform={'Capitalize'} size='sm' defaultValue={editData && editData.category}>
                        {type === 'type-expense' ? expenses.map((expense, key) => <option key={key} value={expense.id}>{expense.name}</option>) : incomes.map((incomes, key) => <option key={key} value={incomes.id}>{incomes.name}</option>)}
                    </Select>
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel fontSize={{base:'xs', md: 'md'}}>Enter amount</FormLabel>
                    <NumberInput min={0.1} placeholder='0' name='amount' size={'sm'}defaultValue={!add && editData ? editData.amount : 0}>
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
                    <Input name='name' placeholder='Description' defaultValue={editData ? editData.name : ''}/>
                </FormControl>
                <FormControl isRequired>
                <FormLabel fontSize={{base:'xs', md: 'md'}}>Date</FormLabel>
                <Input
                      defaultValue={editData ? editData.date : null}
                      name='date'
                      placeholder="Select Date and Time"
                      size="md"
                      type="date"
                      />
                </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button type='submit' form='new-form' bg={'red.600'} isLoading={loading} loadingText={add ? 'Adding transaction' : 'Saving...'}>{add ? 'Add' : 'Save'}</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    )
  }

export default Modal