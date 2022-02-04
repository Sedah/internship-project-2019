import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../utils/utillity';

const initialState = {
  error: null,
  loading: false,
  data: []
};

const topicStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const topicFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const topicSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false
  };
};

const createTopic = (state, action) => {
  //  console.log(state);
  // console.log(action);
  return {
    ...state,
    data: [...state.data, action.data]
  };
};

const deleteTopic = (state, action) => {
  // console.log(state);
  // console.log(action);
  return {
    ...state,
    data: state.data.filter(item => {
      return item.topic_id != action.data;
    })
  };
};

const updateTopic = (state, action) => {
  console.log(state);
  console.log(action);
  return {
    ...state,
    data: state.data.map(
      (data, i) => i === 0 ? {...data, topic: action.data.topic}
                              : data
    )
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOPIC_START:
      return topicStart(state, action);
    case actionTypes.TOPIC_CREATE:
      // return createTopic([state], action);
      return createTopic(state, action);
    case actionTypes.TOPIC_UPDATE:
      return updateTopic(state, action);
    case actionTypes.TOPIC_DELETE:
      return deleteTopic(state, action);
    case actionTypes.TOPICS_GET:
      return ([state], action);
    case actionTypes.TOPIC_FAIL:
      return topicFail(state, action);
    case actionTypes.TOPIC_SUCCESS:
      return topicSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
