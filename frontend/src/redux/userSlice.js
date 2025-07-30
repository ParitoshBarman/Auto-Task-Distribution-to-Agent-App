import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  role: null,
  name: null,
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { token, role, name, email } = action.payload;
      state.token = token;
      state.role = role;
      state.name = name;
      state.email = email;
    },
    logoutUser(state) {
      state.token = null;
      state.role = null;
      state.name = null;
      state.email = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
