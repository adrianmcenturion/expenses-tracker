import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { PublicRoutes } from "../../models/routes"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/states/auth"

const Logout = () => {
        const dispatch = useDispatch()
        const navigate = useNavigate()

        const logOut = () => {
            dispatch(logout())
            navigate(`/${PublicRoutes.LOGIN}`, {replace: true})
        }
    
  return (
    <Button variant='link' fontWeight={'bold'} _hover={{ textDecoration: 'none' }} onClick={logOut}>Logout</Button>
  )
}
export default Logout