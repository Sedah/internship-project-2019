import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as message from "../../utils/message"

const topicStart = () => {
  return {
    type: actionTypes.TOPIC_START
  };
};

const topicFail = error => (
  {
  type: actionTypes.TOPIC_FAIL,
  error: error
});

const topicSuccess = topics => {
  return {
    topics: topics,
    type: actionTypes.TOPIC_SUCCESS
  };
};

export const getTopics = () => dispatch => {
  dispatch(topicStart());
  axios
    .get(process.env.REACT_APP_API_URL + `/api/topic/`)
    
    .then(res => {
      dispatch({
        type: actionTypes.TOPICS_GET,
        data: res.data
      });
      const topics = res.data;
      dispatch(topicSuccess(topics));
    })
    .catch(err => {
      console.log(err);
      dispatch(topicFail(err));
    });
};

export const updateTopic = values => dispatch => {
  const { topic_id } = values;
  dispatch(topicStart());
  axios
    .put(`${process.env.REACT_APP_API_URL}/api/topic/${topic_id}/`, {
      ...values,
      user: localStorage.getItem("user_id")
    })
    .then(res => {
      dispatch({
        type: actionTypes.TOPIC_UPDATE,
        data: res.data
      });
      message.successMessage()
      dispatch(topicSuccess());
    })
    .catch(err => {
      console.log(err);
      message.errorMessage()
      dispatch(topicFail(err));
    });
};

export const createTopic = (inputValue,subject_id) => dispatch => {
  console.log(inputValue,subject_id)
  dispatch(topicStart());
  axios
    .post(`${process.env.REACT_APP_API_URL}/api/topic/`, {
      user: localStorage.getItem("user_id"),
      topic: inputValue,
      subject: subject_id
    })
    .then(res => {
      dispatch({
        type: actionTypes.TOPIC_CREATE,
        data: res.data
      });
      message.successMessage()
      dispatch(topicSuccess());
    })
    .catch(err => {
      console.log(err);
      message.errorMessage()
      dispatch(topicFail(err));
    });
};

export const deleteTopic = values => dispatch => {
  console.log(values)
  const { topic_id } = values;

  dispatch(topicStart());
  axios
    .delete(`${process.env.REACT_APP_API_URL}/api/topic/${topic_id}/`)
    .then(res => {
      dispatch({
        type: actionTypes.TOPIC_DELETE,
        data: topic_id
      });
      dispatch(topicSuccess());
    })
    .catch(err => {
      console.log(err);
      message.errorMessage()
      dispatch(topicFail(err));
    });
};

