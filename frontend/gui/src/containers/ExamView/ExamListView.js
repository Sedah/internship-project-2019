import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Icon, List, Divider, Empty } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/ExamActions";
import _ from "lodash";
import moment from "moment";

class ExamList extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    console.log(this.props.marking);
    const { auth } = this.props
    if (this.props.marking === undefined) {
      const topic_id = this.props.match.params.topicId;
      this.props.getPublicExams(topic_id);
    } else {
      if (auth.role === "admin") {
        this.props.getAnsweredExam();
      }
      else {
        this.props.getAnsweredExam2(auth.user_id);
      }
      
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.exams.data != this.props.exams.data) {
      let examList = [];
      this.props.exams.data.map(item => {
        let exam = {
          exam_id: item.exam_id,
          title: item.title,
          total_people_try: item.total_people_try,
          total_question: item.total_question,
          show_question: item.show_question,
          total_essay_answer: item.total_essay_answer,
          is_random: item.is_random,
          full_name: item.full_name,
          timer: item.timer,
          limit: item.limit,
          start_date:
            item.start_date != null
              ? moment(item.start_date)
                  .utc()
                  .format("YYYY-MM-DD HH:mm:ss")
              : null,
          end_date:
            item.end_date != null
              ? moment(item.end_date)
                  .utc()
                  .format("YYYY-MM-DD HH:mm:ss")
              : null,
          created_on: moment(item.created_on).format("YYYY-MM-DD HH:mm:ss"),
          updated_on: moment(item.updated_on).format("YYYY-MM-DD HH:mm:ss")
        };
        examList.push(exam);
      });
      for (let i = 0; i < examList.length; i++) {
        examList[i].index = i + 1;
      }
      console.log(examList);
      this.setState({
        data: examList
      });
    }
  }

  render() {
    const { data } = this.state;
    const { marking, exams } = this.props;

    return (
      <div>
        <Row>
          <Col span={19}>
            <h2>Exam</h2>
          </Col>
        </Row>

        <List
          itemLayout="horizontal"
          dataSource={data}
          locale={{
            emptyText: <Empty />
          }}
          pagination={{
            pageSize: 10
          }}
          loading={exams.loading}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={
                  marking == true ? (
                    <Link
                      to={{
                        pathname: "/marking/exam/" + item.exam_id
                      }}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    // <Link
                    //   to={{
                    //     pathname: "/exam/" + item.exam_id
                    //   }}
                    // >
                    //   {item.title}
                    // </Link>
                    <Link
                      to={{
                        pathname: "/exam/detail/" + item.exam_id
                      }}
                    >
                      {item.title}
                    </Link>
                  )
                }
                description={
                  <div>
                    {marking == true ? (
                      <div>
                        <Icon type="book" style={{ color: "blue" }} /> Total
                        Answer {item.total_essay_answer}{" "}
                      </div>
                    ) : (
                      <div>
                        <div>
                          <Icon type="schedule" style={{ color: "blue" }} />
                          {item.start_date === null || item.end_date === null
                            ? " Open: Permanently"
                            : ` Open: ${item.start_date} - ${item.end_date}`}
                          <Divider type="vertical" />
                          <Icon type="user" style={{ color: "blue" }} />
                          {` Owner: ${item.full_name}`}
                        </div>
                      </div>
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { exams: state.exams, auth: state.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    getPublicExams: subjectId => dispatch(actions.getPublicExams(subjectId)),
    getAnsweredExam: () => dispatch(actions.getAnsweredExam()),
    getAnsweredExam2: (user_id) => dispatch(actions.getAnsweredExam2(user_id))
  };
};

ExamList.defaultProps = {
  data: []
};
export default connect(mapStateToProps, mapDispatchToProps)(ExamList);
