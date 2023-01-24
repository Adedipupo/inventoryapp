import axios from "axios";

// export const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL ="https://inventoryapp-production.up.railway.app"
// const BASE_URL ="http://localhost:3344"



const createProduct = async (formData) => {
      const response = await axios.post(`${BASE_URL}/api/products/create`, formData)
      return response.data;  
  }
const getProducts = async () => {
      const response = await axios.get(`${BASE_URL}/api/products`)
      return response.data;  
  }
const getProduct = async (id) => {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`)
      return response.data;  
  }
const updateProduct = async (id,formData) => {
      const response = await axios.patch(`${BASE_URL}/api/products/${id}`,formData)
      return response.data;  
  }
const deleteProduct = async (id) => {
      const response = await axios.delete(`${BASE_URL}/api/products/${id}`)
      return response.data;  
  }

  const productService = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
  }

  export default productService;