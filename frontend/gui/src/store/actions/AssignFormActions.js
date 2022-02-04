import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as message from "../../utils/message"

const assignStart = () => {
  return {
    type: actionTypes.ASSIGN_EXAM_START
  };
};

const assignsFail = error => ({
  type: actionTypes.ASSIGN_EXAM_FAIL,
  error: error
});

const assignsSuccess = values => {
  return {
    type: actionTypes.ASSIGN_EXAM_SUCCESS
  };
};

export const setStep = step => {
  return {
    type: actionTypes.SET_STEP,
    payload: step
  };
};

export const updateForm = (stateType, value) => {
  return {
    type: actionTypes.UPDATE_FORM,
    payload: {
      stateType,
      value
    }
  };
};

export const resetForm = () => {
  return {
    type: actionTypes.RESET_FORM
  };
};

export const createAssign = (exams, users, limit, startValue, endValue) => dispatch => {
  dispatch(assignStart());
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/assign/`, {
      exam: exams,
      user: users,
      limit: limit,
      start_date: startValue,
      end_date: endValue
    })
    .then(res => {
      dispatch({
        type: actionTypes.ASSIGN_EXAM_CREATE,
        data: res.data
      });
      message.successMessage()
      dispatch(assignsSuccess());
    })
    .catch(err => {
      message.errorMessage()
      dispatch(assignsFail(err));
    });
};

