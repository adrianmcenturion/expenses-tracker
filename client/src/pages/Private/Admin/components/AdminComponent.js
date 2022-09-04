import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Spacer, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, VStack, } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCategories, getCategories } from "../../../../redux/states/categories"

const AdminComponent = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [type, setType] = useState('type-expense')
  const categories = useSelector(state => state.categories)
  const {token, success} = useSelector(state => state.auth)
  const dispatch = useDispatch()


  const handleChange = (e) => {
    setType(e.target.name)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: e.target.name.value,
      type: type === 'type-expense' ? 'expense' : 'income',
      token : token
    }

    dispatch(createCategories(data))

    success && onClose()

  }

  useEffect(() => {
    if(token)
    dispatch(getCategories(token))  
}, [token, onClose]); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    
    <Flex p={4} gap={2}>
        <Flex flexDirection={'column'}  gap={4} w={'100%'}>
          <Flex align={'center'}>
            <Text fontSize={'lg'} fontWeight={'bold'} >Categories</Text>
            <Spacer />
            <Button bg={'green.500'} colorScheme='green' onClick={onOpen}>Create Category</Button>
          </Flex>
            <VStack>
            <Accordion w={'100%'} defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left' fontWeight={'semibold'}>
                      List of categories
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                <TableContainer>
                  <Table size={{base:"sm", md: 'sm'}} textTransform="capitalize">
                    <Thead>
                      <Tr>
                        <Th>Name</Th>
                        <Th>type</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {categories &&
                        categories.expenses.map((e, key) => {
                            return (
                            <Tr key={key}>
                              <Td>{e.name}</Td>
                              <Td>{e.type === 'expensesCategory' ? 'Expense' : 'Income'}</Td>
                            </Tr>
                          );
                        })}
                        {categories &&
                        categories.incomes.map((e, key) => {
                            return (
                            <Tr key={key}>
                              <Td>{e.name}</Td>
                              <Td>{e.type === 'expensesCategory' ? 'Expense' : 'Income'}</Td>
                            </Tr>
                          );
                        })}
                    </Tbody>
                  </Table>
                </TableContainer>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            </VStack>
        </Flex>
        <Modal isCentered isOpen={isOpen} onClose={onClose} size={{base:'xs', md: 'md'}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={'column'} p={4} gap={4} as='form' id='new-form-admin' onSubmit={handleSubmit}>
              <FormControl  id='type'>
                <FormLabel fontSize={{base:'xs', md: 'md'}}>Select a type</FormLabel>
                  <RadioGroup defaultValue={'expense'} name='type' id='type' onClick={handleChange}>
                      <HStack spacing='24px'>
                          <Radio name='type-expense' value='expense' id='type-expense'>Expense</Radio>
                          <Radio name='type-income' value='income' id='type-income'>Income</Radio>
                      </HStack>
                  </RadioGroup>
              </FormControl>
              <HStack spacing='24px'>
                <FormControl isRequired>
                  <FormLabel fontSize={{base:'xs', md: 'md'}}>Category name</FormLabel>
                  <Input name='name' placeholder='Category name' />
                </FormControl>
              </HStack>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button type='submit' form='new-form-admin' bg='red.500'>Create</Button>
            <Button ml={2} colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        
    </Flex>
    
  )
}

export default AdminComponent