import React from "react";
import { Form, Button, Checkbox } from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import * as actions from "../../store/actions/QuestionActions";
import * as actionTypes from "../../store/actions/actionTypes";
import ImageUpload from "../ImageUpload";
import _ from "lodash"

class TrueFalseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_imagelist: [],
      old_imagelist: [],
      uploadKey: Math.random()
    };
  }

  handleFormSubmit = (event, requestType) => {
    event.preventDefault();
    const { questionId } = this.props.match.params;
    const { validateFieldsAndScroll, resetFields } = this.props.form;
    let examId = null;
    if (this.props.data.exam !== undefined) {
      examId = this.props.data.exam;
    } else {
      examId = this.props.data;
    }
    validateFieldsAndScroll((err, values) => {
      console.log("Received values of form: ", values);
      if (!err) {
        switch (requestType) {
          case "post":
            this.props.trueFalsePost(values, examId, this.state.new_imagelist);
            resetFields();
            this.setState({
              new_imagelist: [],
              uploadKey: Math.random()
            });
            this.props.history.push(`/exam/questionForm/${examId}`);
            break;
          case "put":
            const { data } = this.props;
            this.props.trueFalsePut(
              values,
              questionId,
              data.exam,
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const { requestType, data } = this.props;
    const { questionId } = this.props.match.params;
    const { uploadKey } = this.state;
    console.log(this.props)
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
            <div>
              <Form.Item>
                <div>
                  <Form.Item>
                    {getFieldDecorator("question", {
                      initialValue: data.question,
                      
                    })(<TextArea rows="5" cols="100" />)}
                  </Form.Item>
                  <h2>Image(Optional)</h2>
                  <Form.Item>
                    {getFieldDecorator(
                      "photoset",
                      {}
                    )(
                      <ImageUpload
                        uploadKey={uploadKey}
                        setImageList={this.setImageList}
                        uploadImage={this.uploadImage}
                        question_id={questionId}
                        requestType={requestType}
                      />
                    )}
                  </Form.Item>
                  <h2>Answer</h2>

                  <Form.Item>
                    {getFieldDecorator(`choice[0].choice_id`, {
                      initialValue: _.get(data, `choice[0].choice_id`, undefined),
                      rules: [
                        {
                          required: false
                        }
                      ]
                    })(<input type="hidden" />)}
                  </Form.Item>
                  <Form.Item label="Choice 1">
                    {getFieldDecorator(`choice[0].choice`, {
                      initialValue:_.get(data, `choice[0].choice`, ""),
                      rules: [
                        {
                          required: true,
                          message: "Please enter something"
                        }
                      ]
                    })(<TextArea rows="5" cols="100" />)}
                  </Form.Item>

                  <Form.Item>
                    {getFieldDecorator(`choice[0].correct_answer`, {
                      valuePropName: "checked",
                      initialValue: _.get(data, `choice[0].correct_answer`, false),
                    })(<Checkbox>Correct Answer</Checkbox>)}
                  </Form.Item>
                  <Form.Item label="Explanation">
                    Explain why this choice correct/false
                    {getFieldDecorator(`choice[0].explaination`, {
                      initialValue: _.get(data, `choice[1].explaination`, ""),
                      rules: [
                        {
                          required: false
                        }
                      ]
                    })(<TextArea rows="5" cols="100" />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator(`choice[1].choice_id`, {
                      initialValue: _.get(data, `choice[1].choice_id`, undefined),
                      rules: [
                        {
                          required: false
                        }
                      ]
                    })(<input type="hidden" />)}
                  </Form.Item>

                  <Form.Item label="Choice 2">
                    {getFieldDecorator("choice[1].choice", {
                      initialValue: _.get(data, `choice[1].choice`, ""),
                      rules: [
                        {
                          required: true,
                          message: "Please enter something"
                        }
                      ]
                    })(<TextArea rows="5" cols="100" />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator(`choice[1].correct_answer`, {
                      valuePropName: "checked",
                      initialValue: _.get(data, `choice[1].correct_answer`, false),
                    })(<Checkbox>Correct Answer</Checkbox>)}
                  </Form.Item>
                  <Form.Item label="Explanation">
                    Explain why this choice correct/false
                    {getFieldDecorator(`choice[1].explaination`, {
                      initialValue: _.get(data, `choice[1].explaination`, ""),
                      rules: [
                        {
                          required: false
                        }
                      ]
                    })(<TextArea rows="5" cols="100" />)}
                  </Form.Item>
                </div>
              </Form.Item>
            </div>
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
    trueFalsePost: (values, examId, imagelist) =>
      dispatch(actions.trueFalsePost(values, examId, imagelist)),
    trueFalsePut: (
      values,
      questionId,
      examId,
      old_image_list,
      new_image_list
    ) =>
      dispatch(
        actions.trueFalsePut(
          values,
          questionId,
          examId,
          old_image_list,
          new_image_list
        )
      ),
  };
};

export default Form.create()(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(TrueFalseForm))
);
