import * as actionTypes from "../actions/actionTypes";

import { updateObject } from '../../utils/utillity';

const initialState = {
  error: null,
  loading: false,
  data: []
};

const leaderBoardStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const leaderBoardFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const leaderBoardSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LEADERBOARD_START:
      return leaderBoardStart(state, action);
    case actionTypes.LEADERBOARD_GET:
      return ([state], action);
    case actionTypes.LEADERBOARD_FAIL:
      return leaderBoardFail(state, action);
    case actionTypes.LEADERBOARD_SUCCESS:
      return leaderBoardSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;