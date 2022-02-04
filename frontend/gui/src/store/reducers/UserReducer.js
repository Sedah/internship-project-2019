import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../utils/utillity';


const initialState = {
    error: null,
    loading: false,
    data: [],
  };
  
  const userStart = (state, action) => {
    return updateObject(state, {
      error: null,
      loading: true,
    });
  };
  
  const userFail = (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    };
  };
  
  const userSuccess = (state, action) => {
    return {
      ...state,
      error: null,
      loading: false
    };
  };
 
  const deleteUser = (state, action) => {
    // console.log(state);
    // console.log(action);
    return {
      ...state,
      data: state.data.filter(item => {
        return item.id != action.data;
      })
    };
  };
  
  const updateUser = (state, action) => {
    console.log("state",state.data)
    console.log("action",action.data)
    return {
      ...state,
      data: state.data.map(
        (data, i) => data.id===action.data.id ? {...data, ...action.data}
                                : data
      )
    };
  };

  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.USER_START:
        return userStart(state, action);
      case actionTypes.USER_UPDATE:
        return updateUser(state, action);
      case actionTypes.USER_DELETE:
        return deleteUser(state, action);
      case actionTypes.USERS_GET:
        return ([state], action);
      case actionTypes.USER_FAIL:
        return userFail(state, action);
      case actionTypes.USER_SUCCESS:
        return userSuccess(state, action);
      default:
        return state;
    }
  };
  
  export default reducer;