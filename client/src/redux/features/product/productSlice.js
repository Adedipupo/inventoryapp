import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import productService from '../../../services/productService'

const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  message: '',
}

const createProduct = createAsyncThunk(
  'product/create',
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      console.log(message)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      console.log('first')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        console.log(action.payload)
        state.products.push(action.payload)
        toast.success('Product added successfully')
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
    //   .addCase(getProducts.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(getProducts.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.isError = false
    //     console.log(action.payload)
    //     state.products = action.payload
    //   })
    //   .addCase(getProducts.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    //     toast.error(action.payload)
    //   })
    // .addCase(deleteProduct.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(deleteProduct.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.isError = false;
    //     toast.success("Product deleted successfully");
    //   })
    //   .addCase(deleteProduct.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload;
    //     toast.error(action.payload);
    //   })
    //   .addCase(getProduct.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getProduct.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.isError = false;
    //     state.product = action.payload;
    //   })
    //   .addCase(getProduct.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload;
    //     toast.error(action.payload);
    //   })
    //   .addCase(updateProduct.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(updateProduct.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.isError = false;
    //     toast.success("Product updated successfully");
    //   })
    //   .addCase(updateProduct.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload;
    //     toast.error(action.payload);
    //   });
  },
})

export const { CALC_STORE_VALUE } = productSlice.actions

export const selectIsLoading = (state) => state.product.isLoading;
export const selectIsError = (state) => state.product.isError;


export default productSlice.reducer
