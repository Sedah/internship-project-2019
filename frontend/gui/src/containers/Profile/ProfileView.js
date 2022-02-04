import React from "react";
import { Form, Input, Button, Modal } from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import get from "lodash/get";
import * as actions from "../../store/actions/ProfileActions";
import * as auth_actions from "../../store/actions/AuthActions";
import moment from "moment";

const successMessage = () => {
  let secondsToGo = 3;
  const modal = Modal.success({
    title: "Successfully save",
    content: `This modal will be destroyed after ${secondsToGo} second.`
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `This modal will be destroyed after ${secondsToGo} second.`
    });
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
};
class ProfileForm extends React.Component {
  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.props.getProfile(userId);
  }
  handleEditProfile = event => {
    event.preventDefault();
    const { userId } = this.props.match.params;
    const { validateFieldsAndScroll } = this.props.form;
    validateFieldsAndScroll((err, values) => {
      console.log(err);
      if (!err) {
        this.props.updateProfile(values, userId);
      }
    });
  };

  handleChangePassword = event => {
    event.preventDefault();
    const { validateFieldsAndScroll } = this.props.form;
    validateFieldsAndScroll((err, values) => {
      console.log(err);
      if (!err) {
        this.props.authChangePassword(values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("new_password1")) {
      callback(`Two passwords fields didn't match!`);
    } else {
      callback();
    }
  };

  render() {
    console.log(this.props.profile);
    const { form } = this.props;
    const { data } = this.props.profile;
    const date_join = get(data, "created_on");
    const { getFieldDecorator } = form;
    return (
      <div>
        {data.role === "Guest" && (
          <React.Fragment>
            <Form>
              <b style={{ fontSize: "24px" }}>Profile</b>
              <Form.Item label="First Name">
                {getFieldDecorator("first_name", {
                  rules: [{ required: true }],
                  initialValue: get(data, "first_name")
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Last Name">
                {getFieldDecorator("last_name", {
                  rules: [{ required: true }],
                  initialValue: get(data, "last_name")
                })(<Input />)}
              </Form.Item>
              <Form.Item label="Email">
                {getFieldDecorator("email", {
                  rules: [{ required: true }],
                  initialValue: get(data, "email")
                })(<Input />)}
              </Form.Item>
              
              <div
                style={{
                  fontSize: "18px",
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block"
                }}
              >
                <b
                  style={{
                    marginRight: "10px"
                  }}
                >
                  Date Join:
                </b>
                {moment(date_join).format("YYYY-MM-DD HH:mm:ss")}
              </div>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  float: "right",
                  right: "80px"
                }}
                onClick={this.handleEditProfile}
              >
                Save
              </Button>
            </Form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            {/* <Form>
              <b style={{ fontSize: "24px" }}>Change Password</b>
              <Form.Item label="Old Password">
                {getFieldDecorator("old_password", {
                  rules: [{ required: true }]
                })(<Input.Password
                  placeholder="Input your old password"
                />)}
              </Form.Item>
              <Form.Item label="New Password">
                {getFieldDecorator("new_password1", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Password must be at least 8 characters, no more than 16 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.",
                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
                    }
                  ]
                })(<Input.Password placeholder="Input your new password"/>)}
              </Form.Item>
              <Form.Item label="Confirm New Password">
                {getFieldDecorator("new_password2", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Password must be at least 8 characters, no more than 16 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.",
                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(<Input.Password placeholder="Input your new password again"/>)}
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  float: "right",
                  right: "80px"
                }}
                onClick={this.handleChangePassword}
              >
                Save
              </Button>
            </Form> */}
          </React.Fragment>
        )}
        {(data.role === "Employee" || data.role === "Admin") && (
          <React.Fragment>
            <b style={{ fontSize: "24px" }}>Profile</b> <br></br>
            <br></br>
            <b style={{ fontSize: "18px", marginRight: "10px" }}>
              First Name:
            </b>{" "}
            {get(data, "first_name")} <br></br>
            <b style={{ fontSize: "18px", marginRight: "10px" }}>
              Last Name:
            </b>{" "}
            {get(data, "last_name")} <br></br>
            <b style={{ fontSize: "18px", marginRight: "10px" }}>Email:</b>{" "}
            {get(data, "email")} <br></br>
            <b style={{ fontSize: "18px", marginRight: "10px" }}>Role:</b>{" "}
            {get(data, "role")} <br></br>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { profile: state.profile };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: userId => dispatch(actions.getProfile(userId)),
    updateProfile: (values, userId) =>
      dispatch(actions.updateProfile(values, userId)),
    authChangePassword: values =>
      dispatch(auth_actions.authChangePassword(values))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ProfileForm));
