import axios from 'axios';

const baseApiUrl = '/api';
export const loginUrl = '/login';
export const signupUrl = '/saveNewUser';
export const authFromTokenUrl = '/authFromToken';
export const forgotPasswordUrl = '/forgotpassword';
export const resetPasswordUrl = '/resetpassword';
export const usersUrl = '/users';

const instance = axios.create({
  baseURL: baseApiUrl,
  timeout: 6000,
  headers: {
    'Cache-Control': 'no-cache',
  },
});

export const setTokenApi = (accessToken) => {
  console.log('setTokenApi accessToken=', accessToken);
  instance.defaults.headers.common.Authorization = `bearer ${accessToken}`;
};

export const clearTokenApi = () => {
  console.log('clearTokenApi');
  instance.defaults.headers.common.Authorization = '';
};

export const signupApi = data => instance.post(signupUrl, data);
export const loginApi = data => instance.post(loginUrl, data);
export const authFromTokenApi = () => instance.post(authFromTokenUrl);
export const forgotPasswordApi = data => instance.post(forgotPasswordUrl, data);
export const resetPasswordApi = data => instance.post(resetPasswordUrl, data);

export const getUsersApi = () => instance.get(usersUrl);
export const getUserApi = id => instance.get(`${usersUrl}/${id}`);
export const createUserApi = data => instance.post(usersUrl, data);
export const updateUserApi = data => instance.put(`${usersUrl}/${data.id}`, data.changes);
export const deleteUserApi = id => instance.delete(`${usersUrl}/${id}`);
