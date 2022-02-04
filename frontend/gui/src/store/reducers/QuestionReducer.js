import * as actionTypes from "../actions/actionTypes";
import {
  updateObject
} from '../../utils/utillity';

const initialState = {
  error: null,
  loading: false,
  data: []
};

const questionStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const questionFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const questionSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false
  };
};


// const updateQuestion = (state, action) => {
//   console.log(state);
//   console.log(action);
//   return {
//     ...state,
//     data:  state.data.choice.map(
//       (data) => data.choice_id == action.data.choice.choice_id ? {
//         ...data,
//         ...action.data
//       } :
//       action.data
//     )
//   };
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUESTION_START:
      return questionStart(state, action);
    case actionTypes.QUESTION_GET:
      return ([state], action);
    case actionTypes.QUESTION_CREATE:
      return ([state], action);
    case actionTypes.QUESTION_FAIL:
      return questionFail(state, action);
    case actionTypes.QUESTION_SUCCESS:
      return questionSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;