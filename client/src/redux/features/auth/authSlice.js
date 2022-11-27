import { createSlice } from '@reduxjs/toolkit';


const name = JSON.parse(localStorage.getItem('name'));

const initialState = {
    isLoading: false,
    name: name ? name : "",
    user: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      photo: "",
    }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}
});

export const {} = authSlice.actions

export default authSlice.reducer 