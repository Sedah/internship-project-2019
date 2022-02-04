import axios from "axios";
import * as actions from "./actionTypes";

export const authStart = () => {
  return {
    type: actions.AUTH_START
  };
};
export const authSuccess = (token, user_id, username, role) => {
  // console.log("user_id>>>>", user_id);
  return {
    type: actions.AUTH_SUCCESS,
    token: token,
    user_id: user_id,
    username: username,
    role: role
  };
};

export const authFail = error => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  return {
    type: actions.AUTH_LOGOUT
  };
};
export const checkAuthTimeOut = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authCheckState = dispatch => {
  const token = localStorage.getItem("token");
  if (token === undefined) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    // console.log("expirationDate >>", expirationDate);
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const user_id = localStorage.getItem("user_id");
      const username = localStorage.getItem("username");
      const role = localStorage.getItem("role");
      // console.log(user_id, username);
      dispatch(authSuccess(token, user_id, username, role.toLowerCase()));
      dispatch(
        checkAuthTimeOut(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
};

export const authLogin = (username, password, employee) => {
  return dispatch => {
    dispatch(authStart());
    // console.log("authLogin >>", username);
    if (employee === true) {
      axios
        .post(process.env.REACT_APP_API_AUTH_URL + `/rest-auth/login/`, {
          username: username,
          password: password,
          role: "Employee"
        })
        .then(res => {
          const token = res.data.key;
          const firstName = res.data.firstname;
          const lastName = res.data.lastname;
          const email = res.data.email;
          const contact_id = res.data.user;
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000); // 1 hour
          axios
            .get(
              process.env.REACT_APP_API_URL +
                `/api-user/profile/employee/${contact_id}`
            )
            .then(res => {
              if (res.data.length === 0) {
                console.log("Not found user");
                axios
                  .post(
                    process.env.REACT_APP_API_URL +
                      "/api-user/rest-auth/registration/",
                    {
                      username: username,
                      first_name: firstName,
                      last_name: lastName,
                      email: email,
                      role: "Employee",
                      password1: password,
                      password2: password,
                      contact_id: contact_id
                    }
                  )
                  .then(res => {
                    console.log(res.data);
                    localStorage.setItem("token", token);
                    localStorage.setItem("expirationDate", expirationDate);
                    localStorage.setItem("role", res.data.role);
                    localStorage.setItem("user_id", res.data.id);
                    localStorage.setItem("username", username);
                    dispatch(
                      authSuccess(
                        token,
                        res.data.id,
                        username,
                        res.data.role.toLowerCase()
                      )
                    );
                    dispatch(checkAuthTimeOut(3600));
                  });
              } else {
                console.log("Found on Profile");
                localStorage.setItem("token", token);
                localStorage.setItem("role", res.data[0].role);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem("user_id", res.data[0].id);
                localStorage.setItem("username", username);
                dispatch(
                  authSuccess(
                    token,
                    res.data[0].id,
                    username,
                    res.data[0].role.toLowerCase()
                  )
                );
                dispatch(checkAuthTimeOut(3600));
              }
            })
            .catch(err => {
              console.log(err);
              dispatch(authFail(err));
            });
          // console.log(res.data);
          // console.log("token>>>", token);
          // console.log("user_id>>>", user_id);
          // console.log("expirationDate>>>", expirationDate);
          // console.log("username>>>>", username);
        })
        .catch(err => {
          console.log(err);
          dispatch(authFail(err));
        });
    } else {
      console.log(username, password, employee);
      axios
        .post(process.env.REACT_APP_API_URL + `/api-user/rest-auth/login/`, {
          username: username,
          password: password,
          role: "Guest"
        })
        .then(res => {
          if (res.data.user.role !== "Guest") {
            console.log(res.data.user.role)
            dispatch(authFail("Username or Password or Role not correct"));
          } else {
            console.log(res.data);
            const token = res.data.key;
            // const firstName = res.data.user.firstname;
            // const lastName = res.data.user.lastname;
            // const email = res.data.user.email;
            const user_id = res.data.user.id;
            const role = res.data.user.role;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000); // 1 hour
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("user_id", user_id);
            localStorage.setItem("username", username);
            dispatch(authSuccess(token, user_id, username, role.toLowerCase()));
            dispatch(checkAuthTimeOut(3600));
          }
        })
        .catch(err => {
          console.log(err);
          dispatch(authFail(err));
        });
    }
  };
};

export const authSignup = (username, firstname, lastname, email, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(
        process.env.REACT_APP_API_URL + "/api-user/rest-auth/registration/",
        {
          username: username,
          first_name: firstname,
          last_name: lastname,
          email: email,
          password1: password,
          password2: password,
          role: "Guest"
        }
      )
      .then(res => {
        console.log(res.data);
        const token = res.data.key;
        const user_id = res.data.id;
        const role = res.data.role;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000); //1 hour
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("username", username);
        localStorage.setItem("role", "Guest");
        dispatch(authSuccess(token, user_id, username, role));
        dispatch(checkAuthTimeOut(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authChangePassword = values => {
  return dispatch => {
    dispatch(authStart());
    axios
      .patch(
        process.env.REACT_APP_API_URL + "/api-user/rest-auth/password/change/",
        {
          new_password: values.new_password1,
          new_password2: values.new_password2,
          old_password: values.old_password
        },
        {
          headers: { Authorization: "Token " + localStorage.getItem("token") }
        }
      )
      .then(res => {
        dispatch({
          type: actions.AUTH_UPDATE,
          data: res.data
        });
        dispatch(authSuccess());
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};
