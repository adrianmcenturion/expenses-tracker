import { Navigate, Route } from "react-router-dom"
import { PrivateRoutes } from "../../models/routes"
import RoutesNotFound from "../../utils/routesNotFound"
import { lazy } from "react";

const Home = lazy(() => import('./Home/Home'))
const Transactions = lazy(() => import('../Private/Transactions/Transactions'))

const Private = () => {
  return (
    <RoutesNotFound>
        <Route path='/' element={<Navigate to ={PrivateRoutes.HOME} />} />
        <Route path={PrivateRoutes.HOME} element={<Home/>} />
        <Route path={PrivateRoutes.TRANSACTIONS} element={<Transactions/>} />
    </RoutesNotFound>
  )
}
export default Private