import React from "react";
import { Tag, Input, Icon, List, Tooltip } from "antd";
import { connect } from "react-redux";
import * as topic_actions from "../../store/actions/TopicActions";

const color = ["magenta", "purple", "cyan", "geekblue", "green"];
// const color = '#' + Math.random().toString(16).substr(-6)

class TopicTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: ""
    };
  }

  showInput = () => {
    this.setState(
      {
        inputVisible: true
      },
      () => this.input.focus()
    );
  };

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handleInputCancel = e => {
    this.setState({
      inputValue: "",
      inputVisible: false
    });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    const { createTopic, subject_id } = this.props;
    console.log(subject_id);
    let { topicList } = this.props;
    if (inputValue && topicList.indexOf(inputValue) === -1) {
      topicList = [...topicList, inputValue];
      createTopic(inputValue, subject_id);
    }

    this.setState({
      topicList,
      inputVisible: false,
      inputValue: ""
    });
  };

  saveInputRef = input => (console.log(input), (this.input = input));

  handleRemoveTopic = removedTopic => {
    const { deleteTopic } = this.props;
    const topics = this.props.topicList.filter(
      topic => topic.topic_id !== removedTopic.topic_id
    );
    deleteTopic(removedTopic);
    this.setState({
      topicList: topics
    });
  };

  render() {
    const { topicList, subject } = this.props;
    const { inputVisible, inputValue } = this.state;
    return (
      <div>
        <List
          locale={{
            emptyText: " "
          }}
          dataSource={topicList.filter(topic => {
            return topic.subject === subject.subject_id;
          })}
          renderItem={topic => (
            <List.Item>
              <div
                style={{
                  marginBottom: 16,
                  display: "inline-block"
                }}
              >
                <Tag
                  key={topic.topic_id}
                  color={
                    topic.topic_id % 5 === 0
                      ? color[0]
                      : topic.topic_id % 5 === 1
                      ? color[1]
                      : topic.topic_id % 5 === 2
                      ? color[2]
                      : topic.topic_id % 5 === 3
                      ? color[3]
                      : topic.topic_id % 5 === 4
                      ? color[4]
                      : null
                  }
                  closable
                  onClose={e => {
                    e.preventDefault();
                    this.handleRemoveTopic(topic);
                  }}
                >
                  {topic.topic.length > 10 ? (
                    <Tooltip title={topic.topic} key={topic.topic_id}>
                      {" "}
                      {topic.topic.slice(0, 10)}...
                    </Tooltip>
                  ) : (
                    topic.topic
                  )}{" "}
                </Tag>{" "}
              </div>{" "}
            </List.Item>
          )}
        />{" "}
        {inputVisible && (
          <div>
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{
                width: 78
              }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputCancel}
              onPressEnter={this.handleInputConfirm}
            />{" "}
          </div>
        )}{" "}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{
              background: "palegreen",
              borderStyle: "dashed"
            }}
          >
            <Icon type="plus" /> New Topic{" "}
          </Tag>
        )}{" "}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    topics: state.topics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTopic: (inputValue, subject_id) =>
      dispatch(topic_actions.createTopic(inputValue, subject_id)),
    deleteTopic: values => dispatch(topic_actions.deleteTopic(values))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicTag);
