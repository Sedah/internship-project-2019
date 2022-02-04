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

const updateAssign = (state, action) => {
  console.log(state)
  console.log(action)
  return {
    ...state,
    data: state.data.map(
      (data, i) => data.id === action.data.id ? {
        ...data,
        ...action.data
      } :
      data
    )
  };
};

const deleteAssign = (state, action) => {
  return {
    ...state,
    data: state.data.filter(function (item) {
      return item.id != action.data;
    })
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ASSIGN_EXAMS_LIST_START:
      return assignStart(state, action);
    case actionTypes.ASSIGN_EXAMS_LIST_GET:
      return([state], action);
    case actionTypes.ASSIGN_EXAM_UPDATE:
      return updateAssign(state, action);
    case actionTypes.ASSIGN_EXAM_DELETE:
      return deleteAssign(state, action);
    case actionTypes.ASSIGN_EXAMS_LIST_FAIL:
      return assignsFail(state, action);
    case actionTypes.ASSIGN_EXAMS_LIST_SUCCESS:
      return assignsSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;