import React from "react";
import { Form, Radio, Button, Col, Row, Checkbox, Icon } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../store/actions/QuestionActions";
import ImageUpload from "../ImageUpload";
import _ from "lodash";
let keyId = 0;


class MultipleChoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_imagelist: [],
      old_imagelist: [],
      uploadKey: Math.random(),
      choicesValue: [],
    };
  }

  addChoice = () => {
    const {
      getFieldValue,
      setFieldsValue,
      getFieldDecorator
    } = this.props.form;
    const keys = getFieldValue("choiceKeys");
    // console.log(keys);
    const incKey = keyId++;
    const nextKeys = keys.concat(incKey);
    setFieldsValue({
      choiceKeys: nextKeys
    });
    getFieldDecorator(`choice[${incKey}].correct_answer`, {
      initialValue: false,
      valuePropName: "checked"
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

    // console.log(examId);
    const { validateFieldsAndScroll, resetFields } = this.props.form;
    validateFieldsAndScroll((err, values) => {
      const { choiceKeys, choice } = values;

      if (!err) {
        // console.log(this.state.new_imagelist);
        switch (requestType) {
          case "post":
            // console.log(examId);
            this.props.multipleChoicePost(
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
            // console.log(examId);
            const { data } = this.props;
            this.props.multipleChoicePut(
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

    // console.log(this.state.choicesValue);
    // console.log(choiceKeys  );
    // console.log(this.props.data);
    // console.log(this.props.form);
    // console.log(choiceKeys);
    let choiceForm = [];

    choiceForm = choiceKeys.map((k, index) => {

      return (
        <div key={k}>
          <React.Fragment key={`choiceform${k}`}>
            <div style={{ whiteSpace: "pre-wrap" }}>
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
            </div>
            <Form.Item>
              {getFieldDecorator(`choice[${k}].choice_id`, {
                initialValue: _.get(choiceData, `choice[${k}].choice_id`, undefined)
              })(<input type="hidden" />)}
            </Form.Item>

            <Row>
              <Col {...{ xs: { span: 24 }, sm: { span: 6 } }}>
                <Form.Item key={`correct_answer${k}`}>
                  {getFieldDecorator(`choice[${k}].correct_answer`, {
                    initialValue: _.get(
                      choiceData,
                      `choice[${k}].correct_answer`,
                      false
                    ),
                    valuePropName: "checked"
                  })(<Checkbox>Correct Answer</Checkbox>)}
                </Form.Item>
              </Col>
            </Row>
            <div>
              <Row>
                <Col span={23}>
                  <Form.Item label="Explaination" key={`ex${k}`}>
                    {" "}
                    Explain why this choice correct/false
                    {getFieldDecorator(`choice[${k}].explaination`, {
                      initialValue: _.get(
                        choiceData,
                        `choice[${k}].explaination`,
                        ""
                      ),
                      rules: [
                        {
                          required: false
                        }
                      ]
                    })(<TextArea rows="5" cols="100" />)}
                  </Form.Item>
                </Col>
              </Row>
            </div>
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
            <div style={{ whiteSpace: "pre-wrap" }}>
              <Col span={24}>
                <Form.Item>
                  {getFieldDecorator("question", {
                    initialValue: data.question
                    // rules: [
                    //   {
                    //     required: true,
                    //     message: "Please enter something"
                    //   }
                    // ]
                  })(<TextArea rows="5" cols="100" />)}
                </Form.Item>
              </Col>
            </div>
            <h2>Image(Optional)</h2>
            <Form.Item>
              {getFieldDecorator(
                "photoset",
                {}
              )(
                <ImageUpload
                  uploadKey={this.state.uploadKey}
                  filelist={new_imagelist}
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
              <div>
                <h2>Answer Selection</h2>
                {getFieldDecorator(`type`, {
                  initialValue: data.question_type,
                  rules: [
                    {
                      required: true,
                      message: "Please select your type"
                    }
                  ]
                })(
                  <Radio.Group name={`q_type`}>
                    <Row>
                      <Radio value="Multiple Choice - One answer">
                        Only one answer can selected
                      </Radio>
                    </Row>
                    <Row>
                      <Radio value="Multiple Choice - Multiple answer">
                        Multiple answer can selected
                      </Radio>
                    </Row>
                  </Radio.Group>
                )}
              </div>
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

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    multipleChoicePost: (values, choiceKeys, examId, choice, imagelist) =>
      dispatch(
        actions.multipleChoicePost(
          values,
          choiceKeys,
          examId,
          choice,
          imagelist
        )
      ),
    multipleChoicePut: (
      values,
      choiceKeys,
      examId,
      choice,
      questionId,
      old_image_list,
      new_image_list
    ) =>
      dispatch(
        actions.multipleChoicePut(
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
  withRouter(connect(mapStateToProps, mapDispatchToProps)(MultipleChoiceForm))
);
