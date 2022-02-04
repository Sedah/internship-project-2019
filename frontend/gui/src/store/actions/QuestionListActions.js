import axios from "axios";
import * as actionTypes from "./actionTypes";
import { message } from "antd"

const questionListStart = () => {
  return {
    type: actionTypes.QUESTION_LIST_START
  };
};

const questionListFail = error => ({
  type: actionTypes.QUESTION_LIST_FAIL,
  error: error
});

const questionListSuccess = questionList => {
  return {
    questionList: questionList,
    type: actionTypes.QUESTION_LIST_SUCCESS
  };
};

//for attempt
export const questionsFetch = (examId, userId) => dispatch => {
  dispatch(questionListStart());
  axios
    .get(process.env.REACT_APP_API_URL + `/api/exam/${examId}/question`, {
      params: {
        user_id: userId
      }
    })
    .then(res => {
      dispatch({
        type: actionTypes.QUESTION_LIST_GET,
        data: res.data
      });
      const questionList = res.data
      dispatch(questionListSuccess(questionList))
    })
    .catch(_ => {
      console.log(_);
      dispatch(questionListFail(_));
    });
};

//for edit
export const questionListFetch = examId => dispatch => {
  dispatch(questionListStart());
  axios
    .get(process.env.REACT_APP_API_URL + `/api/exam/${examId}/edit`)
    .then(res => {
      dispatch({
        type: actionTypes.QUESTION_LIST_GET,
        data: res.data
      });
      const questionList = res.data
      dispatch(questionListSuccess(questionList))
    })
    .catch(_ => {
      console.log(_);
      dispatch(questionListFail(_));
    });
};


export const exam_detailDelete = questionId => dispatch => {
  dispatch(questionListStart());
    axios
      .delete(
        process.env.REACT_APP_API_URL + `/api/exam_question/${questionId}/`
      )
      .then(res => {
        dispatch({
          type: actionTypes.QUESTION_DELETE,
          data: questionId
        });
      dispatch(questionListSuccess())
      message.success('Question Deleted');
      })
      .catch(err => {
        console.log(err);
        dispatch(questionListFail(err))
        message.error('Question delete fail');
      });
  };
