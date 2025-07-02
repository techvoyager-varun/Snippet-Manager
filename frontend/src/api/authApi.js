import axiosInstance from './axios';

export const registerUser = (userData) => {
  return axiosInstance.post('/users/register', userData);
};

export const loginUser = (credentials) => {
  return axiosInstance.post('/users/login', credentials);
};

export const logoutUser = () => {
  return axiosInstance.post('/users/logout');
};

export const getCurrentUser = () => {
  return axiosInstance.get('/users/me');
};