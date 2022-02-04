import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../utils/utillity';

const initialState = {
  error: null,
  loading: false,
  data: []
};

const subjectStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const subjectFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const subjectSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false
  };
};

const createSubject = (state, action) => {
  //  console.log(state);
  // console.log(action);
  return {
    ...state,
    data: [action.data, ...state.data]
  };
};

const deleteSubject = (state, action) => {
  // console.log(state);
  // console.log(action);
  return {
    ...state,
    data: state.data.filter(item => {
      return item.subject_id != action.data;
    })
  };
};

const updateSubject = (state, action) => {
  console.log(state);
  console.log(action);
  return {
    ...state,
    data: state.data.map(
      (data, i) => i === 0 ? {...data, title: action.data.title}
                              : data
    )
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBJECT_START:
      return subjectStart(state, action);
    case actionTypes.SUBJECT_CREATE:
      // return createSubject([state], action);
      return createSubject(state, action);
    case actionTypes.SUBJECT_UPDATE:
      return updateSubject(state, action);
    case actionTypes.SUBJECT_DELETE:
      return deleteSubject(state, action);
    case actionTypes.SUBJECTS_GET:
      return ([state], action);
    case actionTypes.SUBJECT_FAIL:
      return subjectFail(state, action);
    case actionTypes.SUBJECT_SUCCESS:
      return subjectSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
