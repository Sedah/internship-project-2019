import * as actionTypes from "../actions/actionTypes";

export default function (state = "", action) {
  switch (action.type) {
    case actionTypes.ATTEMPT_DETAIL_CREATE_SUCCESS:
    case actionTypes.ATTEMPT_DETAIL_CREATE_ERROR:
      return action.type;
    
    case actionTypes.ATTEMPT_CLEAR:
      return "";

    default:
      return state;
  }
}