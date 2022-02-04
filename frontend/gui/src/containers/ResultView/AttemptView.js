import React from "react";
import { List, Icon } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/AttemptActions";

class ShowResult extends React.Component {
  componentDidMount() {
    const attemptId = this.props.match.params.attemptId;
    this.props.attemptFetch(attemptId);
  }
  render() {
    const { total_correct, total_question } = this.props.user_attempt.data;
    const data = this.props.user_attempt.data.attempt_detail;
    return (
      <div
        style={{
          textAlign: "center"
        }}
      >
        <h1>Your Score:</h1>
        {total_correct >= total_question / 2 && (
          <div>
            <h2 style={{ color: "#3f8600" }}>
              {((total_correct * 100) / total_question).toFixed(2)}%
            </h2>
            <h2>
              Total Correct {total_correct}/{total_question}
            </h2>
          </div>
        )}

        {total_correct < total_question / 2 && (
          <div>
            <h2 style={{ color: "#cf1322" }}>
              {((total_correct * 100) / total_question).toFixed(2)}%
            </h2>
            <h2>
              Total Correct {total_correct}/{total_question}
            </h2>
          </div>
        )}
        <div
          style={{
            textAlign: "left"
          }}
        >
          <List
            itemLayout="horizontal"
            size="large"
            dataSource={data}
            renderItem={(item, index) => (
              <div>
                <List.Item key={`list${item.attempt_detail_id}`}>
                  {item.is_correct === true ? (
                    <List.Item.Meta
                      title={
                        <div style={{ fontSize: "16px" }}>
                          {index + 1 + ". "}Question: {item.question_text}
                          <Icon
                            type="check"
                            style={{ color: "green", marginLeft: "10px" }}
                          />
                          <p style={{ fontSize: "16px" }}>
                            Type: {item.q_type}
                          </p>
                        </div>
                      }
                      description={
                        <div
                          style={{ fontSize: "16px", display: "inline-block" }}
                        >
                          Your Answer:{" "}
                          {item.choose_answer
                            .split("\\n")
                            .map((paragraph, i) => {
                              return i !==
                                item.choose_answer.split("\\n").length - 1 ? (
                                <span key={i}>
                                  {paragraph} <br />
                                </span>
                              ) : (
                                <span key={i}>{paragraph}</span>
                              );
                            })}
                          <span>
                            <Icon
                              type="check"
                              style={{ color: "green", marginLeft: "10px" }}
                            />
                          </span>
                          <div style={{ fontSize: "16px" }}>
                            Correct Answer: {item.correct_answer}
                          </div>
                          <div>Explaination: {item.explaination}</div>
                        </div>
                      }
                    />
                  ) : (
                    <List.Item.Meta
                      title={
                        <div style={{ fontSize: "16px" }}>
                          {index + 1 + ". "}Question: {item.question_text}
                          <Icon
                            type="close"
                            style={{ color: "red", marginLeft: "10px" }}
                          />
                          <p style={{ fontSize: "16px" }}>
                            Type: {item.q_type}
                          </p>
                        </div>
                      }
                      description={
                        <div
                          style={{ fontSize: "16px", display: "inline-block" }}
                        >
                          <span>
                            Your Answer:{" "}
                            {item.choose_answer
                            .split("\\n")
                            .map((paragraph, i) => {
                              return i !==
                                item.choose_answer.split("\\n").length - 1 ? (
                                <span key={i}>
                                  {paragraph} <br />
                                </span>
                              ) : (
                                <span key={i}>{paragraph}</span>
                              );
                            })}
                          <span>
                            <Icon
                              type="close"
                              style={{ color: "red", marginLeft: "10px" }}
                            />
                          </span>
                          </span>

                          <div style={{ fontSize: "16px" }}>
                            Correct Answer: {item.correct_answer}
                          </div>
                          <div>Explaination: {item.explaination}</div>
                        </div>
                      }
                    />
                  )}
                </List.Item>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { user_attempt: state.user_attempt };
};

const mapDispatchToProps = dispatch => {
  return {
    attemptFetch: attemptId => dispatch(actions.attemptFetch(attemptId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShowResult);
