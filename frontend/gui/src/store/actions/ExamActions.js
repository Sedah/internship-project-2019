import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as message from "../../utils/message"


const examStart = () => {
  return {
    type: actionTypes.EXAM_START
  };
};

const examFail = error => ({
  type: actionTypes.EXAM_FAIL,
  error: error
});

const examSuccess = exams => {
  return {
    exams: exams,
    type: actionTypes.EXAM_SUCCESS
  };
};


export const getPublicExams = (topic_id) => dispatch => {
  dispatch(examStart());
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/public/${topic_id}`)
    .then(res => {
      dispatch({
        type: actionTypes.EXAMS_GET,
        data: res.data
      });
      const exams = res.data;
      console.log(exams);
      dispatch(examSuccess(exams));
    })
    .catch(err => {
      console.log(err);
      dispatch(examFail(err));
    });
};

export const getPrivateExams = () => dispatch => {
  dispatch(examStart());
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/private/`)
    .then(res => {
      dispatch({
        type: actionTypes.EXAMS_GET,
        data: res.data
      });
      const exams = res.data;
      dispatch(examSuccess(exams));
    })
    .catch(err => {
      console.log(err);
      dispatch(examFail(err));
    });
};

//get exam detail for attempt
export const getExam = examId => dispatch => {
  dispatch(examStart());
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/exam/${examId}`)
    .then(res => {
      dispatch({
        type: actionTypes.EXAMS_GET,
        data: res.data
      });
      const exams = res.data;
      console.log(exams);
      dispatch(examSuccess(exams));
    })
    .catch(err => {
      console.log(err);
      dispatch(examFail(err));
    });
};


//for admin
export const getAnsweredExam = () => dispatch => {
  dispatch(examStart());
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/marking/admin/`)
    .then(res => {
      dispatch({
        type: actionTypes.EXAMS_GET,
        data: res.data
      });
      const exams = res.data;
      console.log(exams);
      dispatch(examSuccess(exams));
    })
    .catch(err => {
      console.log(err);
      dispatch(examFail(err));
    });
};

//for admin
export const getAnsweredExam2 = (user_id) => dispatch => {
  dispatch(examStart());
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/marking/instructor/${user_id}`)
    .then(res => {
      dispatch({
        type: actionTypes.EXAMS_GET,
        data: res.data
      });
      const exams = res.data;
      console.log(exams);
      dispatch(examSuccess(exams));
    })
    .catch(err => {
      console.log(err);
      dispatch(examFail(err));
    });
};
