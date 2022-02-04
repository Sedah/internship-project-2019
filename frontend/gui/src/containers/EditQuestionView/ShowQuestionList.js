import React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/QuestionListActions";
import * as exam_actions from "../../store/actions/ExamActions";
import { ShowQuestion } from "../../components/Exam";
import { Link } from "react-router-dom";
import { Button, Form } from "antd";
import _ from "lodash";


class ShowQuestionList extends React.Component {
  componentDidMount() {
    const examId = this.props.match.params.examId;
    this.props.questionListFetch(examId);
    this.props.getExam(examId);
  }


  render() {
    const examId = this.props.match.params.examId;
    return (
      <div>

        <Link to={`/exam/questionForm/${examId}`}>
          <Button type="primary" className="btn btn-info">
            Add Question
          </Button>
        </Link>
        <ShowQuestion data={this.props.questionList.data} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { questionList: state.questionList };
};

const mapDispatchToProps = dispatch => {
  return {
    questionListFetch: examId => dispatch(actions.questionListFetch(examId)),
    getExam: examId => dispatch(exam_actions.getExam(examId)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ShowQuestionList));
