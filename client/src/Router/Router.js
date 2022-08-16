import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import { useSelector } from "react-redux";

const Router = () => {

  const token = useSelector(state => state.auth.token)


  return (
    <BrowserRouter>
      <Routes>
        {token && <Route path="/home" element={<Home />} />}
        {token ? null : <Route path="/register" element={<Register />} />}
        {!token && <Route path="/login" element={<Login />} />}
        {token ? <Route path="/admin" element={<Admin />} /> : null}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;