import React from "react";
import { Form, Input, Button, Modal } from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import get from "lodash/get";

class SubjectForm extends React.Component {

  
  render() {
    const { visible, data, form, onCancel, onCreate } = this.props;
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
          title={_.isEmpty(data) ? "Create New Subject" : `Edit ${data.title}`}
          visible={visible}
          onCancel={onCancel}
          onOk={onCreate}
          footer={[
            <Button key="back" onClick={onCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={onCreate}>
              Add
            </Button>,
          ]}
          width="50%"
        >
          <Form {...formItemLayout} onSubmit={onCreate} >
              <React.Fragment>
                <Form.Item label="Title">
                  {getFieldDecorator("title", {
                    rules: [{ required: true, message: "Please enter title" }],
                    initialValue: get(data, "title")
                  })(<Input placeholder="Please enter title" />)}
                </Form.Item>
              </React.Fragment>
          </Form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ subjects }) => {

  const title = subjects.data.title;

  return {
    title,
  };
};


export default connect(mapStateToProps)(Form.create()(SubjectForm));
