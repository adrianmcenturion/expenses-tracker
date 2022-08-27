import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { deleteExpenses } from "../../../../redux/states/expenses"

const Alert = ({isOpen, onClose, cancelRef, id}) => {

    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    const handleDelete = async () => {
        let expenseId = Number(id)
        const data = {id: expenseId, token: token}
        dispatch(deleteExpenses(data))

        setTimeout(() => {
            onClose()
        }, 1000);
    }

  return (
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
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )
}
export default Alert