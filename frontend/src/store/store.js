import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import snippetReducer from './snippetSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    snippets: snippetReducer // Make sure this matches what you use in useSelector

  }
});