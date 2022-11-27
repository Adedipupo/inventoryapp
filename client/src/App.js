import { Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Sidebar from "./components/Sidebar/Sidebar";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";



function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgotpassword" element={<ForgotPassword />} />
    <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />

    <Route path="/dashboard"  element={
      <Sidebar>
        <Layout>
          <Dashboard />
        </Layout>
      </Sidebar>
    }/>
  </Routes>
  );
}

export default App;
