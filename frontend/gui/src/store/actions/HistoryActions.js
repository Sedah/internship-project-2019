import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as message from "../../utils/message";

const historyStart = () => {
  return {
    type: actionTypes.HISTORY_START,
  };
};

const historyFail = (error) => ({
  type: actionTypes.HISTORY_FAIL,
  error: error,
});

const historySuccess = (attempt_historys) => {
  return {
    attempt_historys: attempt_historys,
    type: actionTypes.HISTORY_SUCCESS,
  };
};

const examHistoryStart = () => {
  return {
    type: actionTypes.EXAM_HISTORY_START,
  };
};

const examHistoryFail = (error) => ({
  type: actionTypes.EXAM_HISTORY_FAIL,
  error: error,
});

const examHistorySuccess = (exam_historys) => {
  return {
    type: actionTypes.EXAM_HISTORY_SUCCESS,
  };
};
export const getHistory = (userId) => (dispatch) => {
  console.log(userId);
  dispatch(historyStart());
  axios
    .get(process.env.REACT_APP_API_URL + `/api/history/attempt/${userId}`)
    .then((res) => {
      dispatch({
        type: actionTypes.HISTORYS_GET,
        data: res.data,
      });

      const historys = res.data;
      console.log(historys);
      dispatch(historySuccess(historys));
    })
    .catch((err) => {
      console.log(err);
      dispatch(historyFail);
    });
};

export const getHistorys = () => (dispatch) => {
  dispatch(historyStart());
  axios
    .get(process.env.REACT_APP_API_URL + `/api/user_attempt/`)
    .then((res) => {
      dispatch({
        type: actionTypes.HISTORYS_GET,
        data: res.data,
      });
      const attempt_historys = res.data;
      dispatch(historySuccess(attempt_historys));
    })
    .catch((err) => {
      console.log(err);
      dispatch(historyFail);
    });
};

export const getExamHistorys = () => (dispatch) => {
  dispatch(examHistoryStart());
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/exam`)
    .then((res) => {
      dispatch({
        type: actionTypes.EXAM_HISTORYS_GET,
        data: res.data,
      });
      const exam_historys = res.data;
      dispatch(examHistorySuccess(exam_historys));
    })
    .catch((err) => {
      console.log(err);
      dispatch(examHistoryFail(err));
    });
};

export const getExamHistory = (userId) => (dispatch) => {
  dispatch(examHistoryStart());
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/history/exam/${userId}`)
    .then((res) => {
      dispatch({
        type: actionTypes.EXAM_HISTORYS_GET,
        data: res.data,
      });
      const exam_historys = res.data;
      dispatch(examHistorySuccess(exam_historys));
    })
    .catch((err) => {
      console.log(err);
      dispatch(examHistoryFail(err));
    });
};
export const createExam = (values) => (dispatch) => {
  dispatch(examHistoryStart());
  console.log(values);
  const data = {
    user: localStorage.getItem("user_id"),
    ...values,
  };
  console.log(data);
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/exam/`, {
      ...data,
    })
    .then((res) => {
      dispatch({
        type: actionTypes.EXAM_CREATE,
        data: res.data,
      });
      message.successMessage();
      dispatch(examHistorySuccess());
    })
    .catch((err) => {
      console.log(err);
      message.errorMessage();
      dispatch(examHistoryFail(err));
    });
};

export const updateExam = (values) => (dispatch) => {
  const { exam_id } = values;
  console.log(values);
  dispatch(examHistoryStart());
  axios
    .put(`${process.env.REACT_APP_API_URL}/api/exam/${exam_id}/`, {
      ...values,
    })
    .then((res) => {
      dispatch({
        type: actionTypes.EXAM_UPDATE,
        data: res.data,
      });
      console.log(res.data);
      message.successMessage();
      dispatch(examHistorySuccess());
    })
    .catch((err) => {
      console.log(err);
      message.errorMessage();
      dispatch(examHistoryFail(err));
    });
};
export const deleteExam = (values) => (dispatch) => {
  const { exam_id } = values;
  dispatch(examHistoryStart());
  axios
    .delete(`${process.env.REACT_APP_API_URL}/api/exam/${exam_id}/`)
    .then((res) => {
      dispatch({
        type: actionTypes.EXAM_DELETE,
        data: exam_id,
      });
      dispatch(examHistorySuccess());
    })
    .catch((err) => {
      console.log(err);
      message.errorMessage();
      dispatch(examHistoryFail(err));
    });
};
