import { Routes, Route, Link } from "react-router-dom";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/Home/Home";



function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
  </Routes>
  );
}

export default App;
