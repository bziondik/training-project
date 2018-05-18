export const SIGNUP_REQUESTING = 'SIGNUP_REQUESTING';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';

export function signupRequest(user) {
  return {
    type: SIGNUP_REQUESTING,
    user,
  };
}
export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}
export function signupError(user) {
  return {
    type: SIGNUP_ERROR,
    user,
  };
}

