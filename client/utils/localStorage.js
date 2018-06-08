export function getTokenFromLocalStorage() {
  return localStorage.getItem('access_token');
}

export function setTokenToLocalStorage(token) {
  localStorage.setItem('access_token', token);
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem('access_token');
}

export function getCalcDataFromLocalStorage() {
  return localStorage.getItem('calc_data');
}

export function setCalcDataToLocalStorage(data) {
  localStorage.setItem('calc_data', data);
}

export function removeCalcDataFromLocalStorage() {
  localStorage.removeItem('calc_data');
}
