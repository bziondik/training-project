import { createAction } from 'redux-actions';

export const usersRequest = createAction('USERS_REQUESTING');
export const usersSuccess = createAction('USERS_SUCCESS');
export const usersError = createAction('USERS_ERROR');

export const userGetRequest = createAction('USER_GET_REQUESTING');
export const userGetSuccess = createAction('USER_GET_SUCCESS');
export const userGetError = createAction('USER_GET_ERROR');

export const userCreateRequest = createAction('USER_CREATE_REQUESTING');
export const userCreateSuccess = createAction('USER_CREATE_SUCCESS');
export const userCreateError = createAction('USER_CREATE_ERROR');

export const userUpdateRequest = createAction('USER_UPDATE_REQUESTING', (id, changes) => ({ id, changes }));
export const userUpdateSuccess = createAction('USER_UPDATE_SUCCESS');
export const userUpdateError = createAction('USER_UPDATE_ERROR');

export const userDeleteRequest = createAction('USER_DELETE_REQUESTING');
export const userDeleteSuccess = createAction('USER_DELETE_SUCCESS');
export const userDeleteError = createAction('USER_DELETE_ERROR');
