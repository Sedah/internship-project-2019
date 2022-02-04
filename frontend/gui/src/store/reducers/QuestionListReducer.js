import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../../utils/utillity";

const initialState = {
  error: null,
  loading: false,
  data: []
};

const questionListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const questionListFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const questionListSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false
  };
};

const deleteQuestion = (state, action) => {
  // console.log(state);
  // console.log(action);
  return {
    ...state,
    data: state.data.filter(item => {
      return item.question_id != action.data;
    })
  };
};

const updateQuestion = (state, action) => {
  console.log(state);
  console.log(action);
  return {
    ...state,
    data:  state.data.map(
      (data) => data.question_id != action.data.question_id ? {
        ...data,
      } :
      action.data
    )
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUESTION_LIST_START:
      return questionListStart(state, action);
    case actionTypes.QUESTION_LIST_GET:
      return [state], action;
    case actionTypes.QUESTION_DELETE:
      return deleteQuestion(state, action);
    case actionTypes.QUESTION_UPDATE:
      return updateQuestion(state, action);
    case actionTypes.QUESTION_LIST_FAIL:
      return questionListFail(state, action);
    case actionTypes.QUESTION_LIST_SUCCESS:
      return questionListSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
