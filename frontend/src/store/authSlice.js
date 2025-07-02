import { createSlice } from '@reduxjs/toolkit';

let userFromStorage = null;

try {
  const storedUser = localStorage.getItem('user');
  if (storedUser && storedUser !== 'undefined') {
    userFromStorage = JSON.parse(storedUser);
  }
} catch (err) {
  console.error('Failed to parse user from localStorage:', err);
  localStorage.removeItem('user'); // clean invalid entry
}

const initialState = {
  user: userFromStorage,
  isAuthenticated: !!localStorage.getItem('accessToken')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
