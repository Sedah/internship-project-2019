import React from "react";
import { Form, Icon, Input, Button, Alert, Checkbox } from "antd";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../store/actions/AuthActions";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const { username, password, employee } = values;
      if (!err) {
        this.props.onAuth(username, password, employee);
        // this.props.history.push("/subject");
      }
    });
  };

  render() {
    let errorMessage = null;
    if (this.props.auth.error) {
      errorMessage = (
        <Alert
          style={{ marginBottom: "10px" }}
          message={
            this.props.auth.error.message !== undefined
              ? this.props.auth.error.message
              : this.props.auth.error
          }
          type="error"
          showIcon
        />
      );
    }

    const { getFieldDecorator } = this.props.form;
    return localStorage.getItem("token") !== null ? (
      <Redirect to="/subject" />
    ) : (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator("employee", {
            valuePropName: "checked",
            initialValue: false
          })(<Checkbox>Employee</Checkbox>)}
        </Form.Item>

        {errorMessage}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password, employee) =>
      dispatch(actions.authLogin(username, password, employee))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
