import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as message from "../../utils/message"
const userStart = () => {
  return {
    type: actionTypes.USER_START
  };
};

const userFail = error => (
  {
  type: actionTypes.USER_FAIL,
  error: error
});

const userSuccess = users => {
  return {
    users: users,
    type: actionTypes.USER_SUCCESS
  };
};

export const getUsers = () => dispatch => {
    dispatch(userStart());
    axios
      .get(`${process.env.REACT_APP_API_URL}/api-user/profile/`)
      .then(res => {
        dispatch({
          type: actionTypes.USERS_GET,
          data: res.data
        });
        const users = res.data;
        dispatch(userSuccess(users));
      })
      .catch(err => {
        console.log(err);
        dispatch(userFail(err));
      });
  };
  
  export const updateUser = (record, role) => dispatch => {
    const { id } = record;
    console.log(record)
    dispatch(userStart());
    axios
      .patch(`${process.env.REACT_APP_API_URL}/api-user/profile/${id}/`, {
        role: role
      })
      .then(res => {
        dispatch({
          type: actionTypes.USER_UPDATE,
          data: res.data
        });
        dispatch(userSuccess());
        console.log(res.data)
      })
      .catch(err => {
        console.log(err);
        message.errorMessage()
        dispatch(userFail(err));
      });
  };

  export const deleteUser = values => dispatch => {
    const { id } = values;
    dispatch(userStart());
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api-user/profile/${id}/`)
      .then(res => {
        dispatch({
          type: actionTypes.USER_DELETE,
          data: id
        });
        dispatch(userSuccess());
      })
      .catch(err => {
        message.errorMessage()
        console.log(err);
        dispatch(userFail(err));
      });
  };

