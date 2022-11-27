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
    console.log("error",message)
    toast.error(message)
  }
}