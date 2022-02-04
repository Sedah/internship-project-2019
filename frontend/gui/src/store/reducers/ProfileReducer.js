import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils/utillity";
import { updateProfile } from "../actions/ProfileActions";

const initialState = {
  error: null,
  loading: false,
  data: []
};

const profileStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const profileFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const profileSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_START:
      return profileStart(state, action);
    case actionTypes.PROFILE_UPDATE:
      return (state, action);
    case actionTypes.PROFILE_GET:
      return ([state], action);
    case actionTypes.PROFILE_FAIL:
      return profileFail(state, action);
    case actionTypes.PROFILE_SUCCESS:
      return profileSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
