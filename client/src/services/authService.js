import axios from "axios";
import {toast} from "react-toastify";

// export const BASE_URL = process.env.REACT_APP_BASE_URL
export const BASE_URL ="http://localhost:3344"

export const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/signup`, userData, {
        withCredentials: true 
    })
    if(response.statusText === "OK") {
        toast.success("Register successfully!")
    }
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message)
  }
}
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/login`, userData, {
        withCredentials: true 
    })
    if(response.statusText === "OK") {
        toast.success("Login successfully!")
    }
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message)
  }
}
export const logoutUser = async () => {
  try {
    await axios.post(`${BASE_URL}/api/users/logout`, {
        withCredentials: true 
    })
    toast.error("Logged out successfully!")
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    toast.error(message)
  }
}
export const forgotPassword = async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/forgotpassword`, userData)
      toast.success(response.data.message)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      toast.error(message)
    }
  }
export const resettPassword = async (userData,resetToken) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/users/resetpassword/${resetToken}`, userData)
      return response.data
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      toast.error(message)
    }
  }