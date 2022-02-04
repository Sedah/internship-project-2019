import * as actionTypes from "../actions/actionTypes";

import {
  updateObject
} from "../../utils/utillity";

const initialState = {
  error: null,
  loading: false,
  data: []
};

const attemptStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const attemptFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const attemptSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ATTEMPT_START:
      return attemptStart(state, action);
    case actionTypes.ATTEMPT_GET:
      return ([state], action);
    case actionTypes.ATTEMPT_CREATE:
          return ([state], action);
    case actionTypes.ATTEMPT_FAIL:
      return attemptFail(state, action);
    case actionTypes.ATTEMPT_SUCCESS:
      return attemptSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;