import * as actions from "../actions/actionTypes";

import { updateObject } from '../../utils/utillity';

const initialState = {
    token: null,
    user_id: null,
    error: null,
    loading: false,
    username: null,
    role: null,
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: true
    })
}

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        user_id: action.user_id,
        username: action.username,
        role: action.role,
        error: null,
        loading: false,
    }
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        user_id: null,
        username: null,
        role: null,
    }
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actions.AUTH_START: 
            return authStart(state, action);
        case actions.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actions.AUTH_FAIL:
            return authFail(state, action);
        case actions.AUTH_LOGOUT:
            return authLogout(state, action);

        default:
            return state;
    }
}

export default reducer;
