import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as message from "../../utils/message"

const markingStart = () => {
  return {
    type: actionTypes.MARKING_START
  };
};

const markingFail = error => ({
  type: actionTypes.MARKING_FAIL,
  error: error
});

const markingSuccess = exams => {
  return {
    exams: exams,
    type: actionTypes.MARKING_SUCCESS
  };
};

export const getAnsweredEssay = (exam_id) => dispatch => {
    dispatch(markingStart());
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/marking/exam/${exam_id}`)
      .then(res => {
        dispatch({
          type: actionTypes.MARKINGS_GET,
          data: res.data
        });
        const marking = res.data;
        dispatch(markingSuccess(marking));
      })
      .catch(err => {
        console.log(err);
        dispatch(markingFail(err));
      });
  };
  
  
  export const updateAnswer = (values) => dispatch => {
    const {
        attempt_detail_id
    } = values;
    console.log(values)
    dispatch(markingStart());
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user_attempt_detail/${attempt_detail_id}/`, {
        ...values,
        q: values.q_id,
      })
      .then(res => {
        dispatch({
          type: actionTypes.MARKING_UPDATE,
          data: res.data
        });
        dispatch(markingSuccess());
      })
      .catch(err => {
        console.log(err);
        message.errorMessage()
        dispatch(markingFail(err));
      });
  };

