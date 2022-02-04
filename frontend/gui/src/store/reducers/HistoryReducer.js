import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utillity";

const initialState = {
  error: null,
  loading: false,
  data: [],
};

const historyStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const historyFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const historySuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
  };
};

const examHistoryStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const examHistoryFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const examHistorySuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
  };
};

const createExam = (state, action) => {
  // console.log(state);
  // console.log(action);
  return {
    ...state,
    data: [action.data, ...state.data],
  };
};

const updateExam = (state, action) => {
  console.log(state);
  console.log(action);
  return {
    ...state,
    data: state.data.map((data, i) =>
      data.exam_id === action.data.exam_id ? { ...data, ...action.data } : data
    ),
  };
};

const deleteExam = (state, action) => {
  // console.log(state);
  // console.log(action);
  return {
    ...state,
    data: state.data.filter(function (item) {
      return item.exam_id != action.data;
    }),
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HISTORY_START:
      return historyStart(state, action);
    case actionTypes.HISTORYS_GET:
      return [state], action;
    case actionTypes.HISTORY_FAIL:
      return historyFail(state, action);
    case actionTypes.HISTORY_SUCCESS:
      return historySuccess(state, action);
    case actionTypes.EXAM_HISTORY_START:
      return examHistoryStart(state, action);
    case actionTypes.EXAM_HISTORYS_GET:
      return [state], action;
    case actionTypes.EXAM_CREATE:
      return createExam(state, action);
    case actionTypes.EXAM_UPDATE:
      return updateExam(state, action);
    case actionTypes.EXAM_DELETE:
      return deleteExam(state, action);
    case actionTypes.EXAM_HISTORY_FAIL:
      return examHistoryFail(state, action);
    case actionTypes.EXAM_HISTORY_SUCCESS:
      return examHistorySuccess(state, action);
    default:
      return state;
  }
};
export default reducer;
