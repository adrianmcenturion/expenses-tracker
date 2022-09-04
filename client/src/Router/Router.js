import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { AdminRoutes, PrivateRoutes, PublicRoutes } from "../models/routes";
import AuthGuard from "../guards/authGuard";
import RoutesNotFound from "../utils/routesNotFound";
import { Suspense } from 'react';
import { lazy } from "react";
import RoleGuard from "../guards/roleGuard";
import { Roles } from "../models/roles";
import { Center, Spinner } from "@chakra-ui/react";

const Login = lazy(() => import('../pages/Login/Login'))
const Register = lazy(() => import('../pages/Register/Register'))
const Private = lazy(() => import('../pages/Private/Private'))
const Admin = lazy(() => import('../pages/Private/Admin/Admin'))

const Router = () => {

  return (
    <Suspense fallback={<Center h={'100vh'}><Spinner /></Center>}>
      <BrowserRouter>
        <RoutesNotFound>
            <Route path="/*" element={<Navigate to ={PrivateRoutes.PRIVATE} />} />
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

export default Router;




