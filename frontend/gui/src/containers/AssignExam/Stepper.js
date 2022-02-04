import React, { Component } from "react";
import { Steps } from "antd";
import { connect } from "react-redux";

const stepTitle = ["Select Exam", "Select User", "Set Condition"];
const { Step } = Steps;

class Stepper extends Component {
  render() {
    const { step } = this.props;
    return (
      <div className="stepper-container">
        <div>
          <Steps current={step-1}>
            {stepTitle.map((item) => (
              <Step key={item} title={item} />
            ))}
          </Steps>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  step: state.FormReducer.step
});

export default connect(mapStateToProps)(Stepper);
