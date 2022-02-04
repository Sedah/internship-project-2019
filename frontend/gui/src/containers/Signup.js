import React from "react";
import { Form, Icon, Input, Button, Card } from "antd";
import { connect } from "react-redux";
import * as actions from "../store/actions/AuthActions";


const FormItem = Form.Item;


class RegistrationForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if (!err) {
        this.props.onAuth(
          values.username,
          values.firstname,
          values.lastname,
          values.email,
          values.password
        );
        this.props.history.push("/subject");
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="input your Username"
            />
          )}
        </FormItem>

        <FormItem >
          {getFieldDecorator("firstname", {
            rules: [{ required: true, message: "Please input your firstname!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="input your Firstname"
            />
          )}
        </FormItem>

        <FormItem >
          {getFieldDecorator("lastname", {
            rules: [{ required: true, message: "Please input your lastname!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="input your Lastname"
            />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="input your Email"
            />
          )}
        </FormItem>

        <FormItem >
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message:
                  "Password must be at least 8 characters, no more than 16 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.",
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="input your Password"
            />
          )}
        </FormItem>

        <FormItem >
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please input your Password again!"
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="input your password again"
            />
          )}
        </FormItem>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, firstname, lastname, email, password) =>
      dispatch(
        actions.authSignup(
          username,
          firstname,
          lastname,
          email,
          password
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
