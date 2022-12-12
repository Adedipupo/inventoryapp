import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice"
import productReducer from "../redux/features/product/productSlice"
import filterReducer from "./features/product/filterSlice";

const store = configureStore({
    reducer: {
        auth : authReducer,
        product: productReducer,
        filter: filterReducer
    }
})

export default store;