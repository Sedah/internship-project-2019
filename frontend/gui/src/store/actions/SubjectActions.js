import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as message from "../../utils/message"

const subjectStart = () => {
  return {
    type: actionTypes.SUBJECT_START
  };
};

const subjectFail = error => (
  {
  type: actionTypes.SUBJECT_FAIL,
  error: error
});

const subjectSuccess = subjects => {
  return {
    subjects: subjects,
    type: actionTypes.SUBJECT_SUCCESS
  };
};

export const getSubjects = () => dispatch => {
  dispatch(subjectStart());
  axios
    .get(process.env.REACT_APP_API_URL + `/api/subject/`)
    
    .then(res => {
      dispatch({
        type: actionTypes.SUBJECTS_GET,
        data: res.data
      });
      const subjects = res.data;
      dispatch(subjectSuccess(subjects));
    })
    .catch(err => {
      console.log(err);
      dispatch(subjectFail(err));
    });
};

export const updateSubject = values => dispatch => {
  const { subject_id } = values;
  dispatch(subjectStart());
  axios
    .put(`${process.env.REACT_APP_API_URL}/api/subject/${subject_id}/`, {
      ...values,
      user: localStorage.getItem("user_id")
    })
    .then(res => {
      dispatch({
        type: actionTypes.SUBJECT_UPDATE,
        data: res.data
      });
      message.successMessage()
      dispatch(subjectSuccess());
    })
    .catch(err => {
      console.log(err);
      message.errorMessage()
      dispatch(subjectFail(err));
    });
};

export const createSubject = values => dispatch => {
  dispatch(subjectStart());
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/subject/`, {
      user: localStorage.getItem("user_id"),
      title: values.title
    })
    .then(res => {
      dispatch({
        type: actionTypes.SUBJECT_CREATE,
        data: res.data
      });
      message.successMessage()
      dispatch(subjectSuccess());
    })
    .catch(err => {
      console.log(err);
      message.errorMessage()
      dispatch(subjectFail(err));
    });
};

export const deleteSubject = values => dispatch => {
  const { subject_id } = values;
  dispatch(subjectStart());
  axios
    .delete(`${process.env.REACT_APP_API_URL}/api/subject/${subject_id}/`)
    .then(res => {
      dispatch({
        type: actionTypes.SUBJECT_DELETE,
        data: subject_id
      });
      dispatch(subjectSuccess());
    })
    .catch(err => {
      console.log(err);
      message.errorMessage()
      dispatch(subjectFail(err));
    });
};

