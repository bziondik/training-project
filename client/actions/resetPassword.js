import { createAction } from 'redux-actions';

export const forgotPasswordRequest = createAction('FORGOT_PASSWORD_REQUESTING');
export const forgotPasswordSuccess = createAction('FORGOT_PASSWORD_SUCCESS');
export const forgotPasswordError = createAction('FORGOT_PASSWORD_ERROR');

export const resetPasswordRequest = createAction('RESET_PASSWORD_REQUESTING');
export const resetPasswordSuccess = createAction('RESET_PASSWORD_SUCCESS');
export const resetPasswordError = createAction('RESET_PASSWORD_ERROR');
