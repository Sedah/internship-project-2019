import React from "react";
import { List, Button, Radio, Form, Checkbox } from "antd";
import TextArea from "antd/lib/input/TextArea";

class Exam_Detail extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    const { onSubmit, data, value, onChange } = this.props;
    console.log(data)

    return (
      <div>
        <Form onSubmit={event => onSubmit(event)}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item key={`list${item.question_id}`}>
                <div className="question-class">
                  <List.Item.Meta title={`${index + 1}. ${item.question}`} />
                  {item.image.map(
                    image =>
                      image.question == item.question_id && (
                        <div key={image.id}>
                          <img
                            alt="question"
                            src={image.image}
                            style={{
                              height: "auto",
                              width: "auto",
                              display: "flex",
                              margin: "auto",
                              maxWidth: "500px",
                              maxHeight: "500px",
                              overflow: "hidden",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          />
                          <br></br>
                        </div>
                      )
                  )}
                  <div className="answer-box">
                    {item.question_type === "Free Text" && (
                      <Form.Item label="Answer" key={`ans${item.question_id}`}>
                        {getFieldDecorator(`answer.q${item.question_id}`, {
                          rules: [
                            {
                              required: true,
                              message: "Please input your answer"
                            }
                          ]
                        })(
                          <TextArea
                            answer={value}
                            onChange={onChange}
                            rows="5"
                            cols="100"
                          />
                        )}
                      </Form.Item>
                    )}
                  </div>
                  <div className="answer-box">
                    {item.question_type === "Essay" && (
                      <Form.Item label="Answer" key={`ans${item.question_id}`}>
                        {getFieldDecorator(`answer.q${item.question_id}`, {
                          rules: [
                            {
                              required: true,
                              message: "Please input your answer"
                            }
                          ]
                        })(
                          <TextArea
                            answer={value}
                            onChange={onChange}
                            rows="5"
                            cols="100"
                          />
                        )}
                      </Form.Item>
                    )}
                  </div>
                  {item.question_type === "Multiple Choice - One answer" && (
                    <div key={`div${item.question_id}`} className="answer-box">
                      <div>
                        <Form.Item key={`ans${item.question_id}`}>
                          {getFieldDecorator(`answer.q${item.question_id}`, {
                            rules: [
                              {
                                required: true,
                                message: "Please input your answer"
                              }
                            ]
                          })(
                            <Radio.Group
                              options={item.choice.map(choice => ({
                                label: choice.choice,
                                value: choice.choice_id
                              }))}
                            ></Radio.Group>
                          )}
                        </Form.Item>
                      </div>
                    </div>
                  )}
                  {item.question_type ===
                    "Multiple Choice - Multiple answer" && (
                    <div key={`div${item.question_id}`} className="idk-class">
                      <Form.Item key={`ans${item.question_id}`}>
                        {getFieldDecorator(`answer.q${item.question_id}`, {
                          rules: [
                            {
                              required: true,
                              message: "Please input your answer"
                            }
                          ]
                        })(
                          <Checkbox.Group
                            options={item.choice.map(choice => ({
                              label: choice.choice,
                              value: choice.choice_id
                            }))}
                            onChange={this.onChange}
                          />
                        )}
                      </Form.Item>
                    </div>
                  )}
                  {item.question_type === "True False" && (
                    <div key={`div${item.question_id}`} className="answer-box">
                      <ul className="display-linebreak">
                        <div>
                          <Form.Item key={`ans${item.question_id}`}>
                            {getFieldDecorator(`answer.q${item.question_id}`, {
                              rules: [
                                {
                                  required: true,
                                  message: "Please input your answer"
                                }
                              ]
                            })(
                              <Radio.Group
                                options={item.choice.map(choice => ({
                                  label: choice.choice,
                                  value: choice.choice_id
                                }))}
                              ></Radio.Group>
                            )}
                          </Form.Item>
                        </div>
                      </ul>
                    </div>
                  )}
                </div>
              </List.Item>
            )}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

// Exam_Detail.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired,
//   value: PropTypes.object,
//   onSubmit: PropTypes.func,
//   onChange: PropTypes.func,
// };

Exam_Detail.defaultProps = {
  data: null,
  value: {},
  images: [],
  onSubmit: () => {
    return;
  },
  onChange: () => {
    return;
  }
};

export default Exam_Detail;
