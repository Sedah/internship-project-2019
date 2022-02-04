import React from "react";
import { Form, Button, Col, Row, Icon } from "antd";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";
import * as actions from "../../store/actions/QuestionActions";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";
import _ from "lodash";
import PropTypes from "prop-types";
import ImageUpload from "../ImageUpload";

let keyId = 0;
class FreeTextForm extends React.Component {
  constructor(props) {
    super(props);
    const { requestType, data } = this.props;
    this.state = {
      new_imagelist: [],
      old_imagelist: [],
      uploadKey: Math.random(),
      choicesValue: [],
    };
    // console.log(typeof(requestType), typeof(question));
    if (requestType === "post") {
      this.state = {
        choicesValue: []
      };
    } else {
      const choicesValue = data.choice.map(choice => {
        return {
          key: keyId++,
          choice_id: choice.choice_id,
          choice: choice.choice,
          explaination: choice.explaination
        };
      });
      this.state = {
        choicesValue: choicesValue
      };
    }
  }

  addChoice = () => {
    const { getFieldValue, setFieldsValue } = this.props.form;
    const keys = getFieldValue("choiceKeys");
    const incKey = keyId++;
    const nextKeys = keys.concat(incKey);
    setFieldsValue({
      choiceKeys: nextKeys
    });
  };

  removeChoice = k => {
    const { getFieldValue, setFieldsValue } = this.props.form;
    const choiceKeys = getFieldValue("choiceKeys");
    if (choiceKeys.length < 1) {
      return;
    }

    setFieldsValue({
      choiceKeys: choiceKeys.filter(key => key !== k)
    });
  };

  handleFormSubmit = (event, requestType) => {
    event.preventDefault();
    const { questionId } = this.props.match.params;
    let examId = null;
    if (this.props.data.exam !== undefined) {
      examId = this.props.data.exam;
    } else {
      examId = this.props.data;
    }
    const { validateFieldsAndScroll, resetFields } = this.props.form;
    validateFieldsAndScroll((err, values) => {
      const { choiceKeys, choice } = values;
      console.log("Received values of form: ", values);
      if (!err) {
        switch (requestType) {
          case "post":
            this.props.freeTextPost(
              values,
              choiceKeys,
              examId,
              choice,
              this.state.new_imagelist
            );
            resetFields();
            this.setState({
              new_imagelist: [],
              uploadKey: Math.random()
            });
            this.props.history.push(`/exam/questionForm/${examId}`);
            break;
          case "put":
            const { data } = this.props;
            this.props.freeTextPut(
              values,
              choiceKeys,
              data.exam,
              choice,
              questionId,
              this.state.old_imagelist,
              this.state.new_imagelist
            );
            resetFields();
            this.props.history.push(`/exam/view/${examId}`);
            break;
          default:
        }
      }
    });
  };

  uploadImage = (action, filelist) => {
    if (action === "ok") {
      this.setState({
        new_imagelist: filelist
      });
    }
  };

  setImageList = old_imagelist => {
    this.setState({ old_imagelist });
  };

  mapData = () => {
    this.setState({
      new_imagelist: [],
      old_imagelist: []
    });
  };

  componentDidMount() {
    this.mapData();
    this.refreshChoiceValues();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.requestType !== prevProps.requestType) {
      this.refreshChoiceValues();
    }

    if (this.props.data !== prevProps.data) {
      this.refreshChoiceValues();
    }
  }

  refreshChoiceValues(){
    const { requestType, data } = this.props;
    const { setFieldsValue  } = this.props.form;

    if (requestType === "post") {
      this.setState({
        choicesValue: []
      });
    } else {
      const choicesValue = [];
      data.choice.map(choice => {
        const nextKey = keyId++;

        choicesValue[nextKey] = {
          key: nextKey,
          choice_id: choice.choice_id,
          choice: choice.choice,
          correct_answer: choice.correct_answer,
          explaination: choice.explaination
        };
      });
      setFieldsValue ({'choiceKeys': choicesValue.filter(v => !!v).map(v => v.key)});

      this.setState({
        choicesValue: choicesValue
      });
    }
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { requestType, data } = this.props;
    const { questionId } = this.props.match.params;
    const { new_imagelist } = this.state;
    getFieldDecorator("choiceKeys", {
      initialValue: this.state.choicesValue.filter(v => !!v).map(v => v.key)
    });
    const choiceKeys = getFieldValue("choiceKeys");
    const choiceData = {choice: this.state.choicesValue};
    let choiceForm = [];
    choiceForm = choiceKeys.map((k, index) => {
      return (
        <div key={k}>
          <React.Fragment key={`choiceform${k}`}>
            <Row>
              <h3>Choice {`${index + 1}`}</h3>
              <Col span={23}>
                {
                  <Form.Item label="Choice" key={`ch${k}`}>
                    {getFieldDecorator(`choice[${k}].choice`, {
                      initialValue: _.get(choiceData, `choice[${k}].choice`, ""),
                      rules: [
                        {
                          required: true,
                          message: "Please input something"
                        }
                      ]
                    })(<TextArea rows="5" cols="100" />)}
                  </Form.Item>
                }
              </Col>
              <Col span={1}>
                {choiceKeys.length > 0 ? (
                  <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.removeChoice(k)}
                  />
                ) : null}
              </Col>
            </Row>

            {getFieldDecorator(`choice[${k}].correct_answer`, {
              initialValue: true
            })}

            <Row>
              <Col span={23}>
                <Form.Item label="Explaination" key={`ex${k}`}>
                  {" "}
                  Explain why this choice correct/false
                  {getFieldDecorator(`choice[${k}].explaination`, {
                    initialValue: _.get(choiceData, `choice[${k}].explaination`, ""),
                    rules: [
                      {
                        required: false
                      }
                    ]
                  })(<TextArea rows="5" cols="100" />)}
                </Form.Item>
              </Col>
            </Row>
          </React.Fragment>
        </div>
      );
    });
    return (
      <div>
        <React.Fragment>
          <Form
            layout="vertical"
            onSubmit={event =>
              this.handleFormSubmit(event, requestType, questionId)
            }
          >
            <h2>Question</h2>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("question", {
                  initialValue: data.question,
                  rules: [
                    {
                      required: true,
                      message: "Please enter something"
                    }
                  ]
                })(<TextArea rows="5" cols="100" />)}
              </Form.Item>
            </Col>
            <h2>Image(Optional)</h2>
            <Form.Item>
              {getFieldDecorator(
                "photoset",
                {}
              )(
                <ImageUpload
                  uploadKey={this.state.uploadKey}
                  setImageList={this.setImageList}
                  uploadImage={this.uploadImage}
                  question_id={questionId}
                  requestType={this.props.requestType}
                />
              )}
            </Form.Item>
            <h2>Answer</h2>
            {choiceForm}
            <Form.Item>
              <Button
                type="dashed"
                onClick={this.addChoice}
                style={{ width: "100%" }}
                htmlType="button"
              >
                <Icon type="plus" /> Add more choice
              </Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </React.Fragment>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    freeTextPost: (values, choiceKeys, examId, choice, imagelist) =>
      dispatch(
        actions.freeTextPost(values, choiceKeys, examId, choice, imagelist)
      ),
    freeTextPut: (
      values,
      choiceKeys,
      examId,
      choice,
      questionId,
      old_image_list,
      new_image_list
    ) =>
      dispatch(
        actions.freeTextPut(
          values,
          choiceKeys,
          examId,
          choice,
          questionId,
          old_image_list,
          new_image_list
        )
      ),
  };
};

export default Form.create()(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(FreeTextForm))
);
