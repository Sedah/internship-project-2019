import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, List } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/SubjectActions";
import * as topic_actions from "../../store/actions/TopicActions";
import _ from "lodash";
import moment from "moment";
import styled from "styled-components";
import { LeaderBoard } from "../ExamView";

const CardStyle = styled.div`
  max-width: auto;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 15px;
`;

const Paper = styled.div`
  padding: 15px;
  box-sizing: border-box;
  flex-basis: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  min-width: 20vw
  max-width: 20vw
`;

class SubjectList extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      data: [],
      topicList: [],
      selectedSubject: null,
    };
  }
  componentDidMount() {
    this.props.getSubjects();
    this.props.getTopics();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subjects.data != this.props.subjects.data) {
      let subjectList = [];
      this.props.subjects.data.map(item => {
        let subject = {
          subject_id: item.subject_id,
          title: item.title,
          total_exam: item.total_exam,
          created_on: moment(item.created_on).format("YYYY-MM-DD HH:mm:ss"),
          updated_on: moment(item.updated_on).format("YYYY-MM-DD HH:mm:ss")
        };
        subjectList.push(subject);
      });
      for (let i = 0; i < subjectList.length; i++) {
        subjectList[i].index = i + 1;
      }
      // console.log("List>>>>",subjectList);
      this.setState({
        data: subjectList
      });
    }
    if (prevProps.topics.data != this.props.topics.data) {
      let topicList = [];
      this.props.topics.data.map(item => {
        let topic = {
          topic_id: item.topic_id,
          subject_id: item.subject,
          topic: item.topic
        };
        topicList.push(topic);
      });
      for (let i = 0; i < topicList.length; i++) {
        topicList[i].index = i + 1;
      }
      // console.log("List>>>>",subjectList);
      this.setState({
        topicList: topicList
      });
    }
  }

  render() {
    const { data, topicList, selectedSubject } = this.state;
    const { subjects, topics } = this.props;
    return (
      <div>
        <Row>
          <Col span={19}>
            <h2>Topic List</h2>

            <List
              itemLayout="horizontal"
              dataSource={data}
              loading={
                subjects.loading === true && topics.loading === true
                  ? true
                  : false
              }
              pagination={{
                pageSize: 9
              }}
              renderItem={itemlist => (
                <CardStyle>
                  <Paper>
                    <List
                      header={
                        <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                          {itemlist.title}
                        </div>
                      }
                      locale={{ emptyText: " " }}
                      dataSource={topicList.filter(topic => {
                        return topic.subject_id === itemlist.subject_id;
                      })}
                      renderItem={topic => (
                        <List.Item>
                          <span>
                            <Link
                              to={{
                                pathname: "/topic/" + topic.topic_id
                              }}
                            >
                              {topic.topic}
                            </Link>
                          </span>
                        </List.Item>
                      )}
                    />
                  </Paper>
                </CardStyle>
              )}
            />
          </Col>
          <Col span={5}><LeaderBoard check={true} selectedSubject={selectedSubject}></LeaderBoard></Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { subjects: state.subjects, auth: state.auth, topics: state.topics };
};

const mapDispatchToProps = dispatch => {
  return {
    getSubjects: () => dispatch(actions.getSubjects()),
    getTopics: () => dispatch(topic_actions.getTopics())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SubjectList);
