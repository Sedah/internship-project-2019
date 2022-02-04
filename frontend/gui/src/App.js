import React, { Component } from "react";
import "antd/dist/antd.css";
import { BaseRouter } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions/AuthActions";

class App extends Component {
  componentWillMount() {
    this.props.onTryAutoLogin();
  }
  render() {
    return (
      <div className="App">
        <Router>
          <BaseRouter {...this.props} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.token !== null,
  role: state.auth.role };
};

const mapDispatchToProps = dispatch => {
  return { onTryAutoLogin: () => dispatch(authCheckState) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
