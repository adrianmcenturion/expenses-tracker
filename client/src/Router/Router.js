import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { AdminRoutes, PrivateRoutes, PublicRoutes } from "../models/routes";
import AuthGuard from "../guards/authGuard";
import RoutesNotFound from "../utils/routesNotFound";
import { Suspense } from 'react';
import { lazy } from "react";
import Logout from "../components/Logout/Logout";
import RoleGuard from "../guards/roleGuard";
import { Roles } from "../models/roles";
import { Spinner } from "@chakra-ui/react";

const Login = lazy(() => import('../pages/Login/Login'))
const Register = lazy(() => import('../pages/Register/Register'))
const Private = lazy(() => import('../pages/Private/Private'))
const Admin = lazy(() => import('../pages/Private/Admin/Admin'))

const Router = () => {

  return (
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
        <Logout />
        <RoutesNotFound>
            <Route path="/" element={<Navigate to ={PrivateRoutes.PRIVATE} />} />
            <Route path="*" element={<Login />} />
            <Route path={PublicRoutes.REGISTER} element={<Register />} />
            <Route path={PublicRoutes.LOGIN} element={<Login />} />

            <Route element={<AuthGuard privateValidation={true}/>}>
              <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
            </Route>
            <Route element={<RoleGuard rol={Roles.ADMIN} />}>
              <Route path={AdminRoutes.ADMIN} element={<Admin />} />
            </Route>
        </RoutesNotFound>
      </BrowserRouter>
    </Suspense>
  );
};





      // <Routes>
      //   {token && <Route path="/home" element={<Home />} />}
      //   {token ? null : <Route path="/register" element={<Register />} />}
      //   {!token && <Route path="/login" element={<Login />} />}
      //   {token ? <Route path="/admin" element={<Admin />} /> : null}
      //   {token ? <Route path="/transactions" element={<Transactions />} /> : null}
      //   <Route path="/" element={<Login />} />
      //   <Route path="*" element={<Login />} />
      // </Routes>

export default Router;




