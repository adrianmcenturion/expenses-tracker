import { CloseIcon } from "@chakra-ui/icons"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, IconButton, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteExpenses } from "../../../../redux/states/expenses"

const Alert = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef()
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const [idToDelete, setIdToDelete] = useState(null)


  const handleOpenAlert = (e) => {
    setIdToDelete(Number(e.currentTarget.parentNode.parentNode.id))
    console.log(idToDelete)
    onOpen()
  }
  
  const handleDelete = async () => {
    const data = {id: idToDelete, token: token}
    dispatch(deleteExpenses(data))
}

  return (
    <>
    <IconButton
      fontSize={{ base: "x-small", md: "md" }}
      onClick={handleOpenAlert}
      size={{ base: "10rem", md: "sm" }}
      p={1}
      borderRadius={{ base: "sm", md: "md" }}
      bg={"red.700"}
      _hover={{ bg: "red.500" }}
      icon={<CloseIcon />}
    ></IconButton>
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Transaction
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3} >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      </>
  )
}
export default Alert