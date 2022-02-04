import * as actionTypes from "../actions/actionTypes";

import {
  updateObject
} from "../../utils/utillity";

const initialState = {
  error: null,
  loading: false,
  data: []
};

const assignStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const assignsFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const assignsSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false
  };
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ASSIGN_EXAM_START:
      return assignStart(state, action);
    case actionTypes.ASSIGN_EXAM_GET:
      return ([state], action);
    case actionTypes.ASSIGN_EXAM_FAIL:
      return assignsFail(state, action);
    case actionTypes.ASSIGN_EXAM_SUCCESS:
      return assignsSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;