import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../../services/productService';

const initialState = {
    product : null,
    products : [],
    isError : false,
    isSuccess : false,
    message : "" 
}

const createProduct = createAsyncThunk(
    "product/create",
    async (formData,thunkAPI) => {
        try {
            return await productService.createProduct(formData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        CALC_STORE_VALUE(state,action){
            console.log("first")
        }
    },
    extraReducers: (builder) => {

    }
})

export const {CALC_STORE_VALUE} = productSlice.actions

export default productSlice.reducer