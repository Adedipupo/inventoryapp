import { Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Sidebar from './components/Sidebar/Sidebar'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ResetPassword from './pages/Auth/ResetPassword'
import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { userStatus } from './services/authService'
import { SET_LOGIN } from './redux/features/auth/authSlice'
import AddProduct from './pages/AddProduct/AddProduct'
import ProductDetail from './components/Product/ProductDetails/ProductDetails'
import EditProduct from './pages/EditProduct/EditProduct'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'

axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function loginStatus() {
      const status = await userStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }, [dispatch])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        {/* <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        /> */}
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
