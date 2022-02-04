import React from "react";
import { Form, Input, Button } from "antd";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../store/actions/QuestionActions";
import TextArea from "antd/lib/input/TextArea";
import ImageUpload from "../ImageUpload";
import { Redirect } from "react-router-dom";
class EssayForm extends React.Component {
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
    let examId = null;
    if (this.props.data.exam !== undefined) {
      examId = this.props.data.exam;
    } else {
      examId = this.props.data;
    }
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log("Received values of form: ", values);
      if (!err) {
        switch (requestType) {
          case "post":
            this.props.essayPost(values, examId, this.state.new_imagelist);
            this.props.form.resetFields();
            this.setState({
              new_imagelist: [],
              uploadKey: Math.random()
            });
            this.props.history.push(`/exam/questionForm/${examId}`);
            break;
          case "put":
            console.log(this.state.old_imagelist)
            console.log(this.state.new_imagelist)
            const { data } = this.props;
            this.props.essayPut(
              values,
              questionId,
              data.exam,
              this.state.old_imagelist,
              this.state.new_imagelist
            );
            this.props.form.resetFields();
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

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </div>
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
    essayPost: (values, examId, imagelist) =>
      dispatch(actions.essayPost(values, examId, imagelist)),
    essayPut: (values, questionId, exam, old_image_list, new_image_list) =>
      dispatch(
        actions.essayPut(
          values,
          questionId,
          exam,
          old_image_list,
          new_image_list
        )
      ),
  };
};
export default Form.create()(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(EssayForm))
);
