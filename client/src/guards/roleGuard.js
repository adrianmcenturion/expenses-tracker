import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { PrivateRoutes } from "../models/routes"

const RoleGuard = ({rol}) => {

    const role = useSelector(state => state.auth.role)

    return role === rol ? <Outlet /> : <Navigate replace to={PrivateRoutes.PRIVATE}/>

}
export default RoleGuard