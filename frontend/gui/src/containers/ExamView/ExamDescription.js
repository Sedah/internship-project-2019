import React from "react";
import { Link } from "react-router-dom";
import { Col, Button, Descriptions } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/ExamActions";
import _ from "lodash";
import styled from "styled-components";
import { LeaderBoard } from ".";

const Container = styled.div`
  max-width: auto;
  margin: 0 auto;
  display: flex;
`;

const Column1 = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Description = styled.div`
  flex: 1;
  margin-right: 30px;
`;
const TakeExam = styled.div`
  flex: 1;
  margin-right: 30px;
`;
const ScoreBoard = styled.div`
  flex: 1;
`;

class ExamDescription extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      data: [],
      topicList: []
    };
  }

  componentDidMount() {
    const exam_id = this.props.match.params.examId;
    this.props.getExam(exam_id);
  }

  render() {
    const { data } = this.props.exams;
    const exam_id = this.props.match.params.examId;

    console.log(data);
    return (
      <div>
        <Container>
          <Column1>
            <Description>
              <Col span={19}>
                <h2>Description</h2>
              </Col>
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Random">
                  {data.is_random === true ? "Yes" : "No"}
                </Descriptions.Item>
                <Descriptions.Item label="Limit">
                  {data.limit === null ? "No" : data.limit}
                </Descriptions.Item>
                <Descriptions.Item label="Time(minutes)">
                  {data.timer === null ? "No" : data.timer}
                </Descriptions.Item>
                <Descriptions.Item label="Total Try">
                  {data.total_people_try}
                </Descriptions.Item>
                <Descriptions.Item label="Question">
                  {data.is_random === true
                    ? data.show_question
                    : data.total_question}
                </Descriptions.Item>
              </Descriptions>
            </Description>

            {/* <Divider type="horizontal" /> */}
            <TakeExam>
              <h2>Take Exam</h2>
              <Link
                to={{
                  pathname: "/exam/detail/view/" + data.exam_id
                }}
              >
                <Button type="primary" className="btn btn-info">
                  Take Exam
                </Button>
              </Link>
            </TakeExam>
          </Column1>
          {/* 
        <Divider type="horizontal" /> */}
          <ScoreBoard>
            <h2>Leader Board</h2>
            <LeaderBoard exam_id={exam_id} />
          </ScoreBoard>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { exams: state.exams };
};

const mapDispatchToProps = dispatch => {
  return {
    getExam: exam_id => dispatch(actions.getExam(exam_id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ExamDescription);
