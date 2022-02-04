import * as actionTypes from "../actions/actionTypes";

import { updateObject } from '../../utils/utillity';

const initialState = {
  error: null,
  loading: false,
  data: []
};

const examStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const examFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const examSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false
  };
};

// const deleteExam = (state, action) => {
//   // console.log(state);
//   // console.log(action);
//   return {
//     ...state,
//     data: state.data.filter(function(item) {
//       return item.exam_id != action.data;
//     })
//   };
// };

// const updateExam = (state, action) => {
//   console.log(state);
//   console.log(action);
//   return {
//     ...state,
//     data: state.data.map(
//       (data, i) => i === 0 ? {...data, title: action.data.title}
//                               : data
//     )
//   };
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EXAM_START:
      return examStart(state, action);
    // case actionTypes.EXAM_UPDATE:
    //   return updateExam(state, action);
    // case actionTypes.EXAM_DELETE:
    //   return deleteExam(state, action);
    case actionTypes.EXAMS_GET:
      return ([state], action);
    case actionTypes.EXAM_FAIL:
      return examFail(state, action);
    case actionTypes.EXAM_SUCCESS:
      return examSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;