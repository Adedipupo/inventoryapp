import axios from "axios";
import {toast} from "react-toastify";

export const BASE_URL = process.env.BASE_URL


const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/users/register`, userData, {
        withCredentials: true 
    })
    if(response.statusText === "OK") {
        toast.success("Register successfully!")
    }
  } catch (error) {
    
  }
}