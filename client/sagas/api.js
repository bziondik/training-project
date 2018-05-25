import axios from 'axios';

const baseApiUrl = '/api';
export const loginUrl = '/login';
export const signupUrl = '/saveNewUser';
export const authFromTokenUrl = '/authFromToken';

const instance = axios.create({
  baseURL: baseApiUrl,
  timeout: 1000,
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
