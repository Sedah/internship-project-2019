import * as actionTypes from "../actions/actionTypes";

const initialState = {
    step: 1,

}

const FormReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.SET_STEP:
            return{
                ...state,
                step: action.payload
            }
        case actionTypes.UPDATE_FORM:
            return{
                ...state,
                [action.payload.stateType]: action.payload.value
            }
        case actionTypes.RESET_FORM:
            return{
                ...initialState,
            }
        default:
    }
    return state
}

export default FormReducer