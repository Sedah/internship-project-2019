import React from "react";
import {
  Icon,
  Row,
  Col,
  Collapse,
  List,
  Divider,
  Popconfirm,
  Input,
  Select,
} from "antd";
import { connect } from "react-redux";
import * as marking_actions from "../../store/actions/MarkingActions";
import moment from "moment";
import _ from "lodash";
import classNames from "classnames";

const { Search } = Input;
const { Option } = Select;

const customPanelStyle = {
  borderRadius: 4,
  marginBottom: 24,
  border: 0
};

const { Panel } = Collapse;

//Fix Search Pls

class MarkingAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visible: false,
      targetMarking: {},
      data: [],
      answerList: [],
      filteredData: []
    };
  }

  handleChange = value => {
    const { filteredData, answerList } = this.state;
    console.log(this.refs);
    console.log(filteredData);
    switch (value) {
      case "all":
        return this.setState({
          filteredData: answerList.filter(item => {
            // console.log(item)
            return item;
          })
        });
      case "wait":
        return this.setState({
          filteredData: answerList.filter(item => {
            // console.log(item)
            return item.is_correct == null;
          })
        });
      case "correct":
        this.setState({
          filteredData: answerList.filter(item => {
            // console.log(item)
            return item.is_correct == true;
          })
        });
        break;
      case "wrong":
        this.setState({
          filteredData: answerList.filter(item => {
            // console.log(item)
            return item.is_correct == false;
          })
        });
        break;
      default:
        return this.setState({
          filteredData: answerList.filter(item => {
            // console.log(item)
            return item;
          })
        });
    }
  };

  handleSearch = event => {
    const { answerList, filteredData } = this.state;
    const filter = event.target.value;
    const lowercasedFilter = filter.toLowerCase();
    this.setState({
      filteredData: answerList.filter(item => {
        console.log(item)
        return Object.keys(item).some(
          key =>
            typeof item[key] === "string" &&
            item[key].toLowerCase().includes(lowercasedFilter)
        );
      })
    });
  };

  componentDidMount() {
    const exam_id = this.props.match.params.examId;
    this.props.getAnsweredEssay(exam_id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.marking.data != this.props.marking.data) {
      console.log(this.props.marking.data)
      let answerList = [];
      this.props.marking.data.map(item => {
        let answer = {
          attempt_user: item.attempt_user,
          attempt_detail_id: item.attempt_detail_id,
          attempt_id: item.attempt,
          q_id: item.q,
          full_name: item.full_name,
          examm_id: item.examm,
          is_correct: item.is_correct,
          question_text: item.question_text,
          choose_answer: item.choose_answer,
          created_on: moment(item.created_on).format("YYYY-MM-DD HH:mm:ss"),
          updated_on: moment(item.updated_on).format("YYYY-MM-DD HH:mm:ss")
        };
        answerList.push(answer);
      });
      for (let i = 0; i < answerList.length; i++) {
        answerList[i].index = i + 1;
      }
      // console.log("List>>>>",answerList);
      this.setState({
        answerList: answerList,
        filteredData: answerList
      });
    }
  }

  handleMarking = (answer, marking) => {
    const { updateAnswer } = this.props;
    answer.is_correct = marking;
    console.log("handleMarking >>.", answer);
    updateAnswer(answer);
  };

  genExtra = item => (
    <div>
      <Popconfirm
        placement="top"
        title="Correct ?"
        onConfirm={e => this.handleMarking(item, true)}
        okText="Yes"
        cancelText="No"
      >
        <Icon type="check" text="Correct" style={{ color: "green" }} />{" "}
      </Popconfirm>
      <Divider type="vertical" />
      <Popconfirm
        placement="top"
        title="Wrong ?"
        onConfirm={e => this.handleMarking(item, false)}
        okText="Yes"
        cancelText="No"
      >
        <Icon type="close" text="Wrong" style={{ color: "red" }} />{" "}
      </Popconfirm>
    </div>
  );

  render() {
    const { filteredData } = this.state;
    const { marking } = this.props;

    // const filteredData = answerList.filter(item => {
    //   // console.log(item)
    //   return Object.keys(item).some(
    //     key =>
    //       typeof item[key] === "string" &&
    //       item[key].toLowerCase().includes(lowercasedFilter)
    //   );
    // });

    return (
      <div>
        <Row>
          <Col span={19}>
            <h2>Marking Answer</h2>
          </Col>
        </Row>
        <Row>
          <Search
            placeholder="input search text"
            allowClear 
            style={{
              width: 250,
              marginBottom: "20px",
              marginTop: "20px",
              marginRight: "30px"
            }}
            onChange={this.handleSearch}
          />{" "}
          Filter:
          <Select
            defaultValue="all"
            style={{
              width: 120,
              marginBottom: "20px",
              marginTop: "20px",
              marginLeft: "10px"
            }}
            onChange={this.handleChange}
          >
            <Option value="all">All</Option>
            <Option value="wait">Waiting</Option>
            <Option value="correct">Correct</Option>
            <Option value="wrong">Wrong</Option>
          </Select>

        </Row>

        <div>
          <List
            itemLayout="horizontal"
            pagination={{
              pageSize: 10
            }}
            dataSource={filteredData}
            loading={marking.loading === true ? true : false}
            renderItem={item => (
              <Collapse
                bordered={false}
                className={classNames("default", {
                  correct: item.is_correct === true,
                  wrong: item.is_correct === false
                })}
              >
                <Panel
                  header={<span><b>{item.is_correct===true ? "<Correct>" : item.is_correct===false ? "<Wrong>" : "<Waiting>"} Name: {item.full_name}</b></span>}
                  key={item.attempt_detail_id}
                  extra={this.genExtra(item)}
                  style={customPanelStyle}
                >
                  <div style={{ whiteSpace: "pre-wrap" }}>
                    <b>Date: </b> {item.created_on} <br />
                    <b>Question: </b> {item.question_text} <br />
                    <b>Answer: </b>{" "}
                    {item.choose_answer.split("\\n").map((item, i) => {
                      return (
                        <span key={i}>
                          {item} <br />
                        </span>
                      );
                    })}
                  </div>
                </Panel>
              </Collapse>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    marking: state.marking,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAnsweredEssay: exam_id =>
      dispatch(marking_actions.getAnsweredEssay(exam_id)),
    updateAnswer: (values) => dispatch(marking_actions.updateAnswer(values))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkingAnswer);
