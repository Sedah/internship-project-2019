import React from "react";
import {
  Form,
  Input,
  Button,
  Modal,
  Radio,
  Row,
  Col,
  Select,
  InputNumber,
  Checkbox,
  DatePicker
} from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import get from "lodash/get";

class ExamForm extends React.Component {
  componentWillReceiveProps(nextProps) {
    const subjectList = this.props.subjects.data;
    const topicsList = this.props.topics.data;
    const { handleSubjectChange, handleTopicChange } = this.props;

    if (nextProps.data != this.props.data) {
      subjectList.map(subject => {
        if (subject.subject_id === nextProps.data.subject) {
          handleSubjectChange(subject.subject_id, subject);
        }
      });
      topicsList.map(topic => {
        if (topic.topic_id === nextProps.data.topic) {
          handleTopicChange(topic);
        }
      });
    }
  }
  render() {
    const {
      visible,
      disabled,
      data,
      form,
      onCancel,
      onCreate,
      onChange,
      filterTopic,
      handleSubjectChange,
      initialSubject,
      initialTopic,
      topicDisabled,
      checked,
      disabledStartDate,
      onStartChange,
      disabledEndDate,
      onEndChange,
      startValue,
      endValue,
      type_disabled,
      onTypeChange
    } = this.props;
    const subjectList = this.props.subjects.data;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      }
    };
    return (
      <div>
        <Modal
          title={_.isEmpty(data) ? "Create New Exam" : `Edit ${data.title}`}
          visible={visible}
          onCancel={onCancel}
          onOk={onCreate}
          footer={[
            <Button key="back" onClick={onCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={onCreate}>
              Submit
            </Button>
          ]}
          width="75%"
        >
          <Form {...formItemLayout} onSubmit={onCreate}>
            <React.Fragment>
              <Row>
              <Col span={12}>
                <Form.Item label="Subject">
                  {getFieldDecorator("subject", {
                    initialValue: initialSubject.subject_id,
                    rules: [
                      { required: true, message: "Please select subject" }
                    ]
                  })(
                    <Select
                      placeholder="Select Subject"
                      onChange={handleSubjectChange}
                    >
                      {subjectList.map(subject => (
                        <Select.Option
                          key={subject.subject_id}
                          value={subject.subject_id}
                        >
                          {subject.title}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>

                <Form.Item label="Topic">
                  {getFieldDecorator("topic", {
                    initialValue: initialTopic.topic_id,
                    rules: [
                      { required: true, message: "Please select subject" }
                    ]
                  })(
                    filterTopic.length > 0 ? (
                      <Select placeholder="Select Topic">
                        {filterTopic.map(topic => (
                          <Select.Option
                            key={topic.topic_id}
                            value={topic.topic_id}
                          >
                            {topic.topic}
                          </Select.Option>
                        ))}
                      </Select>
                    ) : (
                      <Select
                        placeholder="Select Topic"
                        disabled={topicDisabled}
                      ></Select>
                    )
                  )}
                </Form.Item>

                <Form.Item label="Title">
                  {getFieldDecorator("title", {
                    rules: [{ required: true, message: "Please enter title" }],
                    initialValue: get(data, "title")
                  })(<Input placeholder="enter title" />)}
                </Form.Item>

                <Form.Item style={{ float: "center" }}>
                  {getFieldDecorator("is_random", {
                    initialValue: get(data, "is_random")
                  })(
                    <Checkbox checked={checked} onChange={onChange}>
                      Random Question
                    </Checkbox>
                  )}
                </Form.Item>

                <div style={{ textAlign: "left", color: "red" }}>
                  If "Random Question" field is checked, system will show random
                  question in amount number that you input in "Display Question"
                  field. If it not check, system will show all question arrange
                  by the input sequence
                </div>

                <Form.Item label="Display Question">
                  {getFieldDecorator("show_question", {
                    initialValue: get(data, "show_question")
                  })(
                    <InputNumber
                      min={1}
                      disabled={disabled === true ? false : true}
                      // max={get(data, "total_question")}
                      style={{ width: 75 }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Timer">
                  {getFieldDecorator("timer", {
                    initialValue: get(data, "timer")
                  })(<InputNumber min={1} max={1440} style={{ width: 75 }} />)}
                  <span style={{ marginLeft: "10px" }}>
                    {"Minutes"}
                    
                  </span>
                  <div>{"*blank if no time limit*"}</div>
                </Form.Item>

                <Form.Item label="Type">
                  {getFieldDecorator("is_public", {
                    rules: [{ required: true, message: "Please select type" }],
                    initialValue: get(data, "is_public")
                      ? true
                      : get(data, "is_public")
                  })(
                    <Radio.Group name={`q_type`} onChange={onTypeChange}>
                      <Col>
                        <Radio value={false}>Private</Radio>
                        <Radio value={true}>Public</Radio>
                      </Col>
                    </Radio.Group>
                  )}
                </Form.Item>

                <Form.Item label="Attempt Limit">
                  {getFieldDecorator("limit", {
                    initialValue: get(data, "limit")
                  })(
                    <InputNumber
                      min={1}
                      max={10}
                      style={{ width: 75 }}
                      disabled={type_disabled === false ? true : false}
                    />
                  )}
                  <span style={{ marginLeft: "10px" }}>
                    {"*Max 10"}
                  </span>
                  <div>{"*blank if no limit*"}</div>
                </Form.Item>
                

                <Form.Item label="Start Date">
                  {getFieldDecorator("start_date", {
                    initialValue: startValue
                  })(
                    <DatePicker
                      disabledDate={disabledStartDate}
                      disabled={type_disabled === false ? true : false}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="Start"
                      onChange={onStartChange}
                    />
                  )}
                  <div style={{ textAlign: "center" }}>
                  {"*blank start date and end date if no expire*"}
                </div>
                </Form.Item>

                <Form.Item label="End Date">
                  {getFieldDecorator("end_date", {
                    initialValue: endValue
                  })(
                    <DatePicker
                      disabledDate={disabledEndDate}
                      disabled={type_disabled === false ? true : false}
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="End"
                      onChange={onEndChange}
                    />
                  )}
                </Form.Item>
              </Col>
              </Row>
            </React.Fragment>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect()(Form.create()(ExamForm));
