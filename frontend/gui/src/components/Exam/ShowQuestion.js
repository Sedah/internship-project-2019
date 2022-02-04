import React from "react";
import { List, Collapse, Icon, Tooltip, Popconfirm, Divider, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/QuestionListActions";

class ShowQuestion extends React.Component {
  removeQuestion = QuestionID => {
    this.props.exam_detailDelete(QuestionID);
  };

  render() {
    const { Panel } = Collapse;
    const { data } = this.props
    const customPanelStyle = {
      background: "#f7f7f7",
      borderRadius: 4,
      marginBottom: 24,
      border: 0,
      overflow: "hidden"
    };
    return (
      <div style={{ whiteSpace: "pre-wrap" }}>
                  {/* <Form {...formItemLayout} onSubmit={onCreate}>
            <React.Fragment>
              <Form.Item label="Title">
                {getFieldDecorator("title", {
                  rules: [{ required: true, message: "Please enter title" }],
                  initialValue: get(data, "title")
                })(<Input placeholder="Please enter title" />)}
              </Form.Item>
            </React.Fragment>
          </Form> */}
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 10
          }}
          dataSource={data}
          renderItem={item => (
            <List.Item
              key={item.question_id}
              actions={[
                <div>
                  <Tooltip placement="top" title="Edit">
                    <Link
                      to={{
                        pathname: "/exam/edit/" + item.question_id,
                        params: {
                          question_id: item.question_id,
                          question_type: item.question_type
                        }
                      }}
                    >
                      <Icon type="edit" style={{ marginRight: 8 }} />
                    </Link>
                  </Tooltip>
                  <Divider type="vertical" />
                  <Tooltip placement="top" title="Delete">
                    <Popconfirm
                      placement="bottom"
                      title="Are you sure to delete this question?"
                      onConfirm={e => this.removeQuestion(item.question_id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Icon
                        type="delete"
                        text="Delete"
                        style={{ color: "red" }}
                      />{" "}
                    </Popconfirm>
                  </Tooltip>
                </div>
              ]}
            >
              <List.Item.Meta title={item.question} />
              <Collapse
                bordered={false}
                expandIcon={({ isActive }) => (
                  <Icon type="caret-right" rotate={isActive ? 90 : 0} />
                )}
              >
                <Panel header="Answer" style={customPanelStyle}>
                  {item.choice.map((choice,index) => (
                    <div key={choice.choice_id}>
                      {" "}
                      {choice.correct_answer ? (
                        <div>
                          <b>{"Choice "+(index+1)+": "}</b>{choice.choice}
                          <Icon
                            type="check"
                            style={{ color: "green", marginLeft: "10px" }}
                          />
                        </div>
                      ) : (
                        <div><b>{"Choice "+(index+1)+": "}</b>{choice.choice}</div>
                      )}
                    </div>
                  ))}
                  <br></br>
                  <p>Question Type: {item.question_type}</p>
                </Panel>
              </Collapse>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { exam_detail: state.exam_detail };
}
const mapDispatchToProps = dispatch => {
  return {
    exam_detailDelete: QuestionID =>
      dispatch(actions.exam_detailDelete(QuestionID))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ShowQuestion));
