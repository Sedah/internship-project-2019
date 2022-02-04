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

const assignsSuccess = assigns => {
  return {
    assigns: assigns,
    type: actionTypes.ASSIGN_EXAM_SUCCESS
  };
};

export const getAssigns = (userId) => dispatch => {
    dispatch(assignStart());
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/private/assign/${userId}`)
      .then(res => {
        dispatch({
          type: actionTypes.ASSIGN_EXAM_GET,
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

  
  

