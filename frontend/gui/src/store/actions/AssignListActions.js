import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as message from "../../utils/message"

const assignStart = () => {
  return {
    type: actionTypes.ASSIGN_EXAMS_LIST_START
  };
};

const assignsFail = error => ({
  type: actionTypes.ASSIGN_EXAMS_LIST_FAIL,
  error: error
});

const assignsSuccess = assigns => {
  return {
    assigns: assigns,
    type: actionTypes.ASSIGN_EXAMS_LIST_SUCCESS
  };
};


export const getAllAssigns = () => dispatch => {
    dispatch(assignStart());
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/assign/`)
      .then(res => {
        dispatch({
          type: actionTypes.ASSIGN_EXAMS_LIST_GET,
          data: res.data
        });
        const assigns = res.data;
        dispatch(assignsSuccess(assigns));
      })
      .catch(err => {
        console.log(err);
        dispatch(assignsFail(err));
      });
  };

  export const updateAssign = (values) => dispatch => {
    const {
      id
    } = values;
    dispatch(assignStart());
    axios
      .patch(`${process.env.REACT_APP_API_URL}/api/assign/${id}/`, {
        ...values
      })
      .then(res => {
        dispatch({
          type: actionTypes.ASSIGN_EXAM_UPDATE,
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
  
  export const deleteAssign = values => dispatch => {
    const { id } = values;
    dispatch(assignStart());
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/assign/${id}/`)
      .then(res => {
        dispatch({
          type: actionTypes.ASSIGN_EXAM_DELETE,
          data: id
        });
        dispatch(assignsSuccess());
      })
      .catch(err => {
        console.log(err);
        dispatch(assignsFail(err));
      });
  };