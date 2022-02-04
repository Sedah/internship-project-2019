import React from "react";

import {
  MultipleChoiceForm,
  TrueFalseForm,
  FreeTextForm,
  EssayForm
} from "../../components/QuestionForm";

import * as actions from "../../store/actions/QuestionActions";
import { connect } from "react-redux";

class EditQuestionFormView extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }
  componentDidMount() {
    const questionId = this.props.match.params.questionId;
    this.props.questionFetch(questionId);
  }
  render() {
    console.log(this.props.question.data)
    const type = this.props.question.data.question_type;
    if (
      type === "Multiple Choice - One answer" ||
      type === "Multiple Choice - Multiple answer"
    ) {
      return (
        <div>
          <h2>Multiple Choice Edit</h2>
          <MultipleChoiceForm
            requestType="put"
            ref={this.formRef}
            data={this.props.question.data}
            btnText="Edit"
          />
        </div>
      );
    } else if (type === "True False") {
      return (
        <div>
          <h2>True False Edit</h2>
          <TrueFalseForm
            requestType="put"
            ref={this.formRef}
            data={this.props.question.data}
            btnText="Edit"
          />
        </div>
      );
    } else if (type === "Free Text") {
      return (
        <div>
          <h2>Free Text Edit</h2>
          <FreeTextForm
            requestType="put"
            ref={this.formRef}
            data={this.props.question.data}
            btnText="Edit"
          />
        </div>
      );
    } else if (type === "Essay") {
      return (
        <div>
          <h2>Essay Edit</h2>
          <EssayForm
            requestType="put"
            ref={this.formRef}
            data={this.props.question.data}
            btnText="Edit"
          />
        </div>
      );
    } else {
      return null;
    }

  }
}
const mapStateToProps = (state) => { 
  return { question: state.question };
}

const mapDispatchToProps = dispatch => {
  return {
    questionFetch: (questionId) => dispatch(actions.questionFetch(questionId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditQuestionFormView);
