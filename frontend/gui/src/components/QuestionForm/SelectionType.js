import React, { Component } from "react";
import { Radio } from "antd";
import MultipleChoiceForm from "./MultipleChoiceForm";
import TrueFalseForm from "./TrueFalseForm";
import FreeTextForm from "./FreeTextForm";
import EssayForm from "./EssayForm";
class SelectionType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionType: "Multiple Choice"
    };
    this.onChange = this.onChange.bind(this);
    this.onType = this.onType.bind(this);
  }
  onChange(event) {
    const value = event.target.value;
    console.log("value:" + value);

    switch (value) {
      case "Multiple Choice":
        this.setState({
          questionType: "Multiple Choice"
        });
        break;
      case "True False":
        this.setState({
          questionType: "True False"
        });
        break;
      case "Free Text":
        this.setState({
          questionType: "Free Text"
        });
        break;
      case "Essay":
        this.setState({
          questionType: "Essay"
        });
        break;
      default:
    }
  }

  onType() {
    const examId = this.props.match.params.examId;
    console.log("type:" + this.state.questionType);
    switch (this.state.questionType) {
      case "Multiple Choice":
        //multiple choice
        return <MultipleChoiceForm data={examId} requestType="post" />;
      case "True False":
        //true false
        return <TrueFalseForm data={examId} requestType="post" />;
      case "Free Text":
        //free text
        return <FreeTextForm data={examId} requestType="post" />;
      case "Essay":
        //essay
        return <EssayForm data={examId} requestType="post" />;
      default:
    }
  }

  render() {
    return (
      <div className="form-container">
        <Radio.Group defaultValue="Multiple Choice" buttonStyle="solid">
          <Radio.Button value="Multiple Choice" onChange={this.onChange}>
            Multiple Choice
          </Radio.Button>
          <Radio.Button value="True False" onChange={this.onChange}>
            True False
          </Radio.Button>
          <Radio.Button value="Free Text" onChange={this.onChange}>
            Free Text
          </Radio.Button>
          <Radio.Button value="Essay" onChange={this.onChange}>
            Essay
          </Radio.Button>
        </Radio.Group>
        {this.onType()}{" "}
      </div>
    );
  }
}

export default SelectionType;
