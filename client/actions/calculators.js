import { createAction } from 'redux-actions';

export const calcsRequest = createAction('CALCS_REQUESTING');
export const calcsSuccess = createAction('CALCS_SUCCESS');
export const calcsError = createAction('CALCS_ERROR');

export const calcGetRequest = createAction('CALC_GET_REQUESTING');
export const calcGetSuccess = createAction('CALC_GET_SUCCESS');
export const calcGetError = createAction('CALC_GET_ERROR');

export const calcCreateRequest = createAction(
  'CALC_CREATE_REQUESTING',
  (id, settings) => ({ userId: id, settings }),
);
export const calcCreateSuccess = createAction('CALC_CREATE_SUCCESS');
export const calcCreateError = createAction('CALC_CREATE_ERROR');

export const calcUpdateRequest = createAction('CALC_UPDATE_REQUESTING', (id, changes) => ({ id, changes }));
export const calcUpdateSuccess = createAction('CALC_UPDATE_SUCCESS');
export const calcUpdateError = createAction('CALC_UPDATE_ERROR');

export const calcDeleteRequest = createAction('CALC_DELETE_REQUESTING', (userId, calcId) => ({ userId, calcId }));
export const calcDeleteSuccess = createAction('CALC_DELETE_SUCCESS');
export const calcDeleteError = createAction('CALC_DELETE_ERROR');
