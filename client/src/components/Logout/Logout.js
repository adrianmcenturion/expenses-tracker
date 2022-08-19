import { Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { clearLocalStorage } from "../../utils/LocalStorageFunctions"
import { PublicRoutes } from "../../models/routes"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/states/auth"

const Logout = () => {
        const dispatch = useDispatch()
        const navigate = useNavigate()
        const logOut = () => {

            clearLocalStorage('token')
            dispatch(logout())
            navigate(`/${PublicRoutes.LOGIN}`, {replace: true})
        }
    
  return (
    <Button onClick={logOut}>Log Out</Button>
  )
}
export default Logout