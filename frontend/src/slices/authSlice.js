import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: localStorage.getItem('userInfo') 
      ? JSON.parse(localStorage.getItem('userInfo')) : null,
  users: [],    

}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
   // eslint-disable-next-line no-unused-vars
   logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo')
   } 
  }
})

export const { setCredentials, setUsers, logout } = authSlice.actions;

export default authSlice.reducer;
