import { call, takeEvery } from 'redux-saga/effects';

import * as actions from '../actions/calculators';
import requestFlow from './request';
import {
  getCalcsApi,
  getCalcApi,
  createCalcApi,
  updateCalcApi,
  deleteCalcApi,
} from './api';

function* calcsFlow(action) {
  yield call(
    requestFlow,
    getCalcsApi,
    {
      actionSuccess: actions.calcsSuccess,
      actionError: actions.calcsError,
      data: action.payload,
      isLoading: true,
    },
  );
}
function* calcGetFlow(action) {
  yield call(
    requestFlow,
    getCalcApi,
    {
      actionSuccess: actions.calcGetSuccess,
      actionError: actions.calcGetError,
      data: action.payload,
      isLoading: true,
    },
  );
}
function* calcCreateFlow(action) {
  yield call(
    requestFlow,
    createCalcApi,
    {
      actionSuccess: actions.calcCreateSuccess,
      actionError: actions.calcCreateError,
      data: action.payload,
      isLoading: true,
    },
  );
}
function* calcUpdateFlow(action) {
  yield call(
    requestFlow,
    updateCalcApi,
    {
      actionSuccess: actions.calcUpdateSuccess,
      actionError: actions.calcUpdateError,
      data: action.payload,
    },
  );
}
function* calcDeleteFlow(action) {
  yield call(
    requestFlow,
    deleteCalcApi,
    {
      actionSuccess: actions.calcDeleteSuccess,
      actionError: actions.calcDeleteError,
      data: action.payload,
    },
  );
}

function* calculatorsWatcher() {
  yield takeEvery(actions.calcsRequest, calcsFlow);
  yield takeEvery(actions.calcGetRequest, calcGetFlow);
  yield takeEvery(actions.calcCreateRequest, calcCreateFlow);
  yield takeEvery(actions.calcUpdateRequest, calcUpdateFlow);
  yield takeEvery(actions.calcDeleteRequest, calcDeleteFlow);
}

export default calculatorsWatcher;
