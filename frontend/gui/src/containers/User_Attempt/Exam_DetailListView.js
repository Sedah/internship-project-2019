import React from "react";
import { Exam_Detail } from "../../components/User_Attempt";
import { connect } from "react-redux";
import * as exam_detail_actions from "../../store/actions/QuestionListActions";
import * as actions from "../../store/actions/AttemptActions";
import { Form, Button, Result, Icon, Typography, Spin } from "antd";
import Countdown from "react-countdown-now";
import * as exam_actions from "../../store/actions/ExamActions";
import _ from "lodash";

//profile
//login

const { Paragraph, Text } = Typography;

class Exam_DetailListView extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      answer: {},
      data: [],
      countdown: Date.now(),
    };
  }
  componentDidMount() {
    const { form } = this.props;
    form.resetFields();
    const examId = this.props.match.params.examId;
    const userId = this.props.user.user_id;
    console.log(userId);
    this.props.questionsFetch(examId, userId);
    this.props.getExam(examId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user_attempt.data != this.props.user_attempt.data) {
      console.log(prevProps.user_attempt.data);
      console.log(this.props.user_attempt.data);
      this.props.history.push({
        pathname: `/resultview/${this.props.user_attempt.data.attempt_id}`
      });
    }
    if (prevProps.exam != this.props.exam) {
      // console.log(nextProps.exam.data.timer)
      this.setState({
        countdown: Date.now() + this.props.exam.data.timer * 60000
      });
    }

    if (prevProps.questionList != this.props.questionList) {
      // console.log(nextProps.exam.data.timer)
      this.setState({
        data: this.props.questionList
      });
    }


  }

  handleChange(e) {
    this.setState({
      answer: e.target.value
    });
  }

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const examId = this.props.match.params.examId;
      const answerObj = values.answer;
      const answerList = [];
      // console.log(values.answer);

      //console.log(this.props.exam_details)
      // eslint-disable-next-line array-callback-return
      Object.keys(answerObj).map(key => {
        const id = key.replace("q", "");
        const questions = this.props.questionList.data;

        // let cur_correct_answer = "";
        let cur_answerObj = {};

        var cur_question = questions.find(question => {
          //console.log(question, id);
          return question.question_id == id;
        });

        // Object.keys(cur_question.choice).map(check => {
        //   if (cur_question.choice[check].correct_answer === true) {
        //     // cur_correct_answer = cur_question.choice[check].choice;
        //     // console.log(cur_correct_answer);
        //   }
        // });
        const answer_choice_id = answerObj[key];
        var cur_answer = cur_question.choice.find(choice => {
          //console.log(choice, answer_choice_id);
          return choice.choice_id == answer_choice_id;
        });

        // console.log(cur_question, cur_answer);
        if (cur_answer != undefined) {
          cur_answerObj = {
            q: id,
            question_text: cur_question.question,
            choose_answer: cur_answer.choice
            // correct_answer: cur_correct_answer
          };
        } else {
          var cur_answer_list = [];
          if (typeof answer_choice_id !== "string") {
            cur_question.choice.map(choice => {
              answer_choice_id.map(answer => {
                if (choice.choice_id == answer) {
                  cur_answer_list.push(choice.choice);
                }
              });
            });
          } else {
            cur_answer_list.push(answer_choice_id);
          }

          // console.log(cur_answer_list);
          var cur_answer_list_JSON = JSON.stringify(cur_answer_list);
          cur_answerObj = {
            q: id,
            question_text: cur_question.question,
            choose_answer: cur_answer_list_JSON
            // correct_answer: cur_correct_answer
          };
        }

        answerList.push(cur_answerObj);
      });

      if (!err) {
        const { data } = this.props.exam;
        console.log(data);
        if (data.is_random === true) {
          this.props.attemp_detailPost(answerList, examId, data.show_question);
        } else {
          console.log(data.total_question);
          this.props.attemp_detailPost(answerList, examId, data.total_question);
        }

        this.props.form.resetFields();
      }
    });
  };

  autoSubmitForm = () => {
    const examId = this.props.match.params.examId;
    const values = this.props.form.getFieldsValue();
    const answerList = [];
    let answerValue = {};

    console.log(JSON.stringify(values));
    Object.keys(values.answer).map(answer => {
      const answer_choice_id = values.answer[answer];
      if (answer_choice_id != undefined) {
        answerValue = {
          ...answerValue,
          [answer]: answer_choice_id
        };
      }
    });
    // console.log(answerValue);
    //console.log(this.props.exam_details)
    // eslint-disable-next-line array-callback-return
    Object.keys(answerValue).map(key => {
      const id = key.replace("q", "");
      const questions = this.props.questionList.data;

      // let cur_correct_answer = "";
      let cur_answerObj = {};

      var cur_question = questions.find(question => {
        // console.log(question, id);
        return question.question_id == id;
      });
      const answer_choice_id = answerValue[key];
      console.log(answer_choice_id);
      var cur_answer = cur_question.choice.find(choice => {
        //console.log(choice, answer_choice_id);
        return choice.choice_id == answer_choice_id;
      });

      console.log(cur_question, cur_answer);
      if (cur_answer != undefined) {
        cur_answerObj = {
          q: id,
          question_text: cur_question.question,
          choose_answer: cur_answer.choice
          // correct_answer: cur_correct_answer
        };
      } else {
        var cur_answer_list = [];
        if (typeof answer_choice_id !== "string") {
          cur_question.choice.map(choice => {
            answer_choice_id.map(answer => {
              if (choice.choice_id == answer) {
                cur_answer_list.push(choice.choice);
              }
            });
          });
        } else {
          cur_answer_list.push(answer_choice_id);
        }
        // console.log(cur_answer_list);
        var cur_answer_list_JSON = JSON.stringify(cur_answer_list);
        cur_answerObj = {
          q: id,
          question_text: cur_question.question,
          choose_answer: cur_answer_list_JSON
          // correct_answer: cur_correct_answer
        };
      }

      answerList.push(cur_answerObj);
    });
    // console.log("answer", answerList);
    this.props.attemp_detailPost(answerList, examId);

    this.props.form.resetFields();
  };

  renderer = ({ hours, minutes, seconds }) => {
    const { data } = this.state;
    const examId = this.props.match.params.examId;
    console.log(data);
    // Render a countdown
    if (!_.isEmpty(data.data) && data.loading === false) {
      return (
        <span>
          {minutes < 5 ? (
            <Button
              style={{
                background: "#ffdd42",
                position: "fixed",
                bottom: 0,
                right: 0
              }}
            >
              {hours}:{minutes}:{seconds}
              <Icon
                type="exclamation-circle"
                theme="twoTone"
                twoToneColor="red"
              />
            </Button>
          ) : (
            <Button style={{ position: "fixed", bottom: 0, right: 0 }}>
              {hours}:{minutes}:{seconds}
            </Button>
          )}

          {/* eslint-disable-next-line react/jsx-pascal-case */}
          <Exam_Detail
            form={this.props.form}
            onSubmit={this.handleFormSubmit}
            onChange={this.handleChange}
            value={this.state.answer}
            data={data.data}
            examId={examId}
          />
        </span>
      );
    } else if (_.isEmpty(data.data) && data.loading === false){
      return (
        <Result
          status="error"
          title="Error"
          subTitle="Please check and modify the following information before entering."
        >
          <div className="desc" style={{ textAlign: "center" }}>
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16
                }}
              >
                This error canbe occur by this following:
              </Text>
            </Paragraph>
            <Paragraph>
              <Icon style={{ color: "red" }} type="close-circle" /> Currently no
              question for this exam
            </Paragraph>
            <Paragraph>
              <Icon style={{ color: "red" }} type="close-circle" /> You already
              used all limit attempt in this exam
            </Paragraph>
          </div>
        </Result>
      );
    }
    else {
      return <Spin spinning={data.loading}> </Spin>
    }
  };

  render() {
    // 1 min = 60000 millisec
    const { timer } = this.props.exam.data;
    const { data } = this.state
    const { questionList } = this.props;
    const examId = this.props.match.params.examId;
    console.log(data)
    return timer !== null ? (
      <Countdown
        date={this.state.countdown}
        renderer={this.renderer}
        onComplete={this.autoSubmitForm}
      />
    ) : !_.isEmpty(data.data) && data.loading === false ? (
      /* eslint-disable-next-line react/jsx-pascal-case */
      <Exam_Detail
        form={this.props.form}
        onSubmit={this.handleFormSubmit}
        onChange={this.handleChange}
        value={this.state.answer}
        data={data.data}
        examId={examId}
      />
    ) : _.isEmpty(data.data) && data.loading === false ? (
      <Result
        status="error"
        title="Error"
        subTitle="Please check and modify the following information before entering."
      >
        <div className="desc" style={{ textAlign: "center" }}>
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16
              }}
            >
              This error canbe occur by this following:
            </Text>
          </Paragraph>
          <Paragraph>
            <Icon style={{ color: "red" }} type="close-circle" /> Currently no
            question for this exam
          </Paragraph>
          <Paragraph>
            <Icon style={{ color: "red" }} type="close-circle" /> You already
            used all limit attempt in this exam
          </Paragraph>
        </div>
      </Result>
    ) : <Spin spinning={data.loading}> </Spin>
  }
}

const mapStateToProps = state => {
  return {
    questionList: state.questionList,
    user: state.auth,
    exam: state.exams,
    user_attempt: state.user_attempt
  };
};

const mapDispatchToProps = dispatch => {
  return {
    questionsFetch: (examId, userId) =>
      dispatch(exam_detail_actions.questionsFetch(examId, userId)),
    attemp_detailPost: (answerList, examId, total_question) =>
      dispatch(actions.attemp_detailPost(answerList, examId, total_question)),
    getExam: examId => dispatch(exam_actions.getExam(examId))
  };
};
export default Form.create()(
  connect(mapStateToProps, mapDispatchToProps)(Exam_DetailListView)
);
