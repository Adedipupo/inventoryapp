import axios from "axios";

// export const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL ="http://localhost:3344"


const createProduct = async (formData) => {
      const response = await axios.post(`${BASE_URL}/api/products/create`, formData)
      return response.data;  
  }
const getProducts = async () => {
      const response = await axios.get(`${BASE_URL}/api/products`)
      return response.data;  
  }

  const productService = {
    createProduct,
    getProducts
  }

  export default productService;