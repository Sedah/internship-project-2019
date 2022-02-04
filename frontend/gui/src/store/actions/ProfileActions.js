import axios from "axios";
import * as actionTypes from "./actionTypes";
import * as message from "../../utils/message"

const profileStart = () => {
    return {
      type: actionTypes.PROFILE_START
    };
  };
  
  const profileFail = error => (
    {
    type: actionTypes.PROFILE_FAIL,
    error: error
  });
  
  const profileSuccess = profile => {
    return {
      profile: profile,
      type: actionTypes.PROFILE_SUCCESS
    };
  };

export const getProfile = userId => dispatch => {
    dispatch(profileStart());
    axios
      .get(`${process.env.REACT_APP_API_URL}/api-user/profile/${userId}/`)
      .then(res => {
        dispatch({
          type: actionTypes.PROFILE_GET,
          data: res.data
        });
        const profile = res.data;
        console.log(profile);
        dispatch(profileSuccess(profile));
      })
      .catch(err => {
        console.log(err);
        dispatch(profileFail(err));
      });
  };

export const updateProfile = (values, userId) => dispatch => {
  dispatch(profileStart());
    axios
      .put(`${process.env.REACT_APP_API_URL}/api-user/profile/${userId}/`, {
        id: userId,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
      })
      .then(res => {
        dispatch({
          type: actionTypes.PROFILE_UPDATE,
          data: res.data
        });
        message.successMessage()
        dispatch(profileSuccess());
      })
      .catch(err => {
        message.errorMessage()
        console.log(err);
        dispatch(profileFail(err));
      });
  };