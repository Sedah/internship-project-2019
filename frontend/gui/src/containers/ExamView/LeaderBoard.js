import React from "react";
import { Link } from "react-router-dom";
import { Icon, Select, Table } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/LeaderBoardAction";
import _ from "lodash";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const data = [
//   {
//     index: 1,
//     full_name: "testter",
//     score: 25
//   },
//   {
//     index: 2,
//     full_name: "testter",
//     score: 25
//   },
//   {
//     index: 3,
//     full_name: "testter",
//     score: 25
//   },
//   {
//     index: 4,
//     full_name: "testter",
//     score: 25
//   },
//   {
//     index: 5,
//     full_name: "testter",
//     score: 25
//   },
//   {
//     index: 6,
//     full_name: "testter",
//     score: 25
//   },
//   {
//     index: 7,
//     full_name: "testter",
//     score: 25
//   },
//   {
//     index: 8,
//     full_name: "testter",
//     score: 25
//   },
//   {
//     index: 9,
//     full_name: "testter",
//     score: 25
//   },
//   {
//     index: 10,
//     full_name: "testter",
//     score: 25
//   }
// ];

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      data: [],
      subject_id: null
    };
  }
  componentDidMount() {
    const { exam_id } = this.props;
    if (exam_id) {
      this.props.getLeaderBoard(exam_id);
    }
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.leaderBoard.data != this.props.leaderBoard.data) {
      let userList = [];
      this.props.leaderBoard.data.map(item => {
        console.log(item.total_correct)
        let user = {
          full_name: item.full_name,
          score: item.total_correct !== undefined ? item.total_correct : item.high_score
        };
        userList.push(user);
      });
      for (let i = 0; i < userList.length; i++) {
        userList[i].index = i + 1;
      }
      this.setState({
        data: userList
      });
      console.log(userList);
    }
    if (prevProps.subjects.data != this.props.subjects.data) {
      const subject_id = this.props.subjects.data[0].subject_id;
      console.log(this.props.subjects.data);
      this.props.getTop10(subject_id);
      this.setState({
        subject_id: subject_id
      });
    }
  }

  getColumns = () => [
    {
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (text, record, index) =>
        index + 1 === 1 ? (
          <FontAwesomeIcon icon={faTrophy} size="lg" color="gold" />
        ) : index + 1 === 2 ? (
          <FontAwesomeIcon icon={faTrophy} size="lg" color="silver" />
        ) : index + 1 === 3 ? (
          <FontAwesomeIcon icon={faTrophy} size="lg" color="#cd7f32" />
        ) : (
          index + 1
        )
    },
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name"
    },
    {
      title: "High Score",
      dataIndex: "score",
      key: "score"
    }
  ];

  handleSubjectChange = value => {
    console.log(value);
    this.props.getTop10(value);
  };

  render() {
    const { data, subject_id } = this.state;
    console.log(subject_id);
    const { leaderBoard, check } = this.props;
    const subjects = this.props.subjects.data;

    return (
      <div>
        {check && (
          <Select
            placeholder="Select Subject"
            defaultValue={subject_id}
            onChange={this.handleSubjectChange}
            style={{ width: 150 }}
            key={subject_id}
          >
            {subjects.map(subject => (
              <Select.Option
                key={subject.subject_id}
                value={subject.subject_id}
              >
                {subject.title}
              </Select.Option>
            ))}
          </Select>
        )}
        <Table
          columns={this.getColumns()}
          pagination={false}
          size="middle"
          dataSource={data}
          rowKey={record => record.index}
          loading={leaderBoard.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { leaderBoard: state.leaderBoard, subjects: state.subjects };
};

const mapDispatchToProps = dispatch => {
  return {
    getLeaderBoard: exam_id => dispatch(actions.getLeaderBoard(exam_id)),
    getTop10: subject_id => dispatch(actions.getTop10(subject_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
