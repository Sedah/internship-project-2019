import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as message from "../../utils/message"

const leaderBoardStart = () => {
  return {
    type: actionTypes.LEADERBOARD_START
  };
};

const leaderBoardFail = error => ({
  type: actionTypes.LEADERBOARD_FAIL,
  error: error
});

const leaderBoardSuccess = leaderBoard => {
  return {
    leaderBoard: leaderBoard,
    type: actionTypes.LEADERBOARD_SUCCESS
  };
};

export const getLeaderBoard = (exam_id) => dispatch => {
    dispatch(leaderBoardStart());
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/leaderboard/${exam_id}`)
      .then(res => {
        dispatch({
          type: actionTypes.LEADERBOARD_GET,
          data: res.data
        });
        const leaderBoard = res.data;
        dispatch(leaderBoardSuccess(leaderBoard));
      })
      .catch(err => {
        console.log(err);
        dispatch(leaderBoardFail(err));
      });
  };

  export const getTop10 = (subject_id) => dispatch => {
    dispatch(leaderBoardStart());
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/scoreboard/${subject_id}`)
      .then(res => {
        dispatch({
          type: actionTypes.LEADERBOARD_GET,
          data: res.data
        });
        const leaderBoard = res.data;
        dispatch(leaderBoardSuccess(leaderBoard));
      })
      .catch(err => {
        console.log(err);
        dispatch(leaderBoardFail(err));
      });
  };

  
  

