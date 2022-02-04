import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as message from "../../utils/message";


const attemptStart = () => {
  return {
    type: actionTypes.ATTEMPT_START
  };
};

const attemptFail = error => ({
  type: actionTypes.ATTEMPT_FAIL,
  error: error
});

const attemptSuccess = attempts => {
  return {
    attempts: attempts,
    type: actionTypes.ATTEMPT_SUCCESS
  };
};

export const attemptFetch = attemptId => dispatch => {
  dispatch(attemptStart());
    axios
      .get(process.env.REACT_APP_API_URL + `/api/user_attempt/${attemptId}`)
      .then(res => {
        dispatch({
          type: actionTypes.ATTEMPT_GET,
          data: res.data
        })
        const attempts = res.data;
        dispatch(attemptSuccess(attempts));
      })
      .catch(err => {
        console.log(err);
        dispatch(attemptFail(err));
      });
  };

export const attemp_detailPost = (answerList, examId, total_question) => dispatch => {
  dispatch(attemptStart());
    axios
      .post(process.env.REACT_APP_API_URL + `/api/user_attempt/`, {
        user: localStorage.getItem("user_id"),
        attempt_detail: answerList,
        exam: examId,
        current_total_question: total_question
      })
      .then(res => {
        dispatch({
          data: res.data,
          type: actionTypes.ATTEMPT_CREATE
        });
        dispatch(attemptSuccess());
      })
      .catch(err => {
        console.log(err);
        dispatch(attemptFail(err));
        message.errorMessage();
      });
};
