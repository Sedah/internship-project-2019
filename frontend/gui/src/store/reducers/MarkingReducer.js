import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utillity";

const initialState = {
  error: null,
  loading: false,
  data: []
};

const markingStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const markingFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const markingSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false
  };
};

const updateAnswer = (state, action) => {
  console.log(state)
  console.log(action)
  return {
    ...state,
    data: state.data.map(
      (data, i) => data.attempt_detail_id===action.data.attempt_detail_id ? {...data, ...action.data}
                              : data
    )
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MARKING_START:
      return markingStart(state, action);
    case actionTypes.MARKINGS_GET:
      return ([state], action);
    case actionTypes.MARKING_UPDATE:
      return updateAnswer(state, action);
    case actionTypes.MARKING_FAIL:
      return markingFail(state, action);
    case actionTypes.MARKING_SUCCESS:
      return markingSuccess(state, action);

    default:
      return state;
  }
};
export default reducer;
