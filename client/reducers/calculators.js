import { handleActions } from 'redux-actions';

import * as actions from '../actions/calculators';

const initialState = {
  all: [],
  current: null,
};

export default handleActions(
  {
    [actions.calcsRequest]: state => ({
      ...state,
      all: [],
    }),
    [actions.calcsSuccess]: (state, action) => ({
      ...state,
      all: action.payload,
    }),
    [actions.calcGetRequest]: state => ({
      ...state,
      current: null,
    }),
    [actions.calcGetSuccess]: (state, action) => ({
      ...state,
      current: action.payload,
    }),
    [actions.calcCreateRequest]: state => ({
      ...state,
      current: null,
    }),
    [actions.calcCreateSuccess]: (state, action) => ({
      ...state,
      all: action.payload,
    }),
    [actions.calcUpdateRequest]: state => ({
      ...state,
      current: null,
    }),
    [actions.calcUpdateSuccess]: (state, action) => ({
      ...state,
      all: action.payload,
    }),
    [actions.calcDeleteSuccess]: (state, action) => ({
      ...state,
      all: action.payload,
    }),
  },
  initialState,
);

export const getCalculators = state => state.calculators.all.filter(calc => !calc.isTemplate);
export const getTemplates = state => state.calculators.all.filter(calc => calc.isTemplate);
