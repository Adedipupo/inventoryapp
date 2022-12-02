import axios from "axios";
import {toast} from "react-toastify";

// export const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL ="http://localhost:3344"


const createProduct = async (formData) => {
      const response = await axios.post(`${BASE_URL}/api/products/create`, formData)
      return response.data;  
  }

  const productService = {
    createProduct 
  }

  export default productService;