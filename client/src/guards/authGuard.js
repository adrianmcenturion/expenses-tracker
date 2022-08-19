import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { PublicRoutes, PrivateRoutes } from "../models/routes"



export const AuthGuard = ({privateValidation}) => {

    const token = useSelector(state => state.auth.token)
    return token ? privateValidation ? <Outlet/> : <Navigate replace to={PrivateRoutes.PRIVATE} /> : <Navigate replace to={PublicRoutes.LOGIN}/>
}

export default AuthGuard