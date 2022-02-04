import React from "react";
import {
  Form,
  Input,
  Button,
  Modal,
  Radio,
  Col,
  Select,
  InputNumber,
  Checkbox,
  DatePicker
} from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import get from "lodash/get";

class EditAssignForm extends React.Component {
  render() {
    const {
      visible,
      data,
      form,
      onCancel,
      onCreate,
      limit,
      disabledStartDate,
      disabledEndDate,
      onStartChange,
      onEndChange,
      startValue,
      endValue
    } = this.props;
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
          title={`Edit Assign`}
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
          width="50%"
        >
          <Form {...formItemLayout} onSubmit={onCreate}>
            <Form.Item label="Attempt Limit">
              {getFieldDecorator("limit", {
                initialValue: limit
              })(
                <InputNumber
                  min={0}
                  max={10}
                  style={{ width: 75 }}
                  onChange={this.onLimitChange}
                />
              )}
              <span style={{ marginLeft: "10px" }}>
                {"*Max 10 *blank if no attempt limit*"}
              </span>
            </Form.Item>

            <div style={{ textAlign: "center" }}>
                  {"*blank start date and end date if no expire*"}
                </div>

            <Form.Item label="Start Date">
              {getFieldDecorator("start_date", {
                initialValue: startValue
              })(
                <DatePicker
                  disabledDate={disabledStartDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Start"
                  onChange={onStartChange}
                />
              )}
            </Form.Item>

            <Form.Item label="End Date">
              {getFieldDecorator("end_date", {
                initialValue: endValue
              })(
                <DatePicker
                  disabledDate={disabledEndDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="End"
                  onChange={onEndChange}
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default connect()(Form.create()(EditAssignForm));
