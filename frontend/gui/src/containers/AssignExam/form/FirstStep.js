import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Table, Icon, Input, Descriptions } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/ExamActions";
import * as assign_actions from "../../../store/actions/AssignFormActions";
import PrevNextPageButton from "../PrevNextPageButton";
import * as subject_actions from "../../../store/actions/SubjectActions";
import * as topic_actions from "../../../store/actions/TopicActions";

import _ from "lodash";
import moment from "moment";

class FirstStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedExams: this.props.selectedExams
    };
  }
  componentDidMount() {
    this.props.getSubjects();
    this.props.getTopics();
    this.props.getPrivateExams();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.exams.data != this.props.exams.data) {
      let examList = [];
      this.props.exams.data.map(item => {
        let exam = {
          exam_id: item.exam_id,
          topic: item.topic,
          subject: item.subject,
          name: item.full_name,
          title: item.title,
          total_people_try: item.total_people_try,
          total_question: item.total_question,
          is_public: item.is_public,
          is_random: item.is_random,
          show_question: item.show_question,
          limit: item.limit,
          start_date: item.start_date != null ? moment(item.start_date).utc() : null,
          end_date: item.end_date != null ? moment(item.end_date).utc() : null,
          timer: item.timer,
          created_on: moment(item.created_on).format("YYYY-MM-DD HH:mm:ss"),
          update_on: moment(item.update_on).format("YYYY-MM-DD HH:mm:ss")
        };
        examList.push(exam);
      });
      for (let i = 0; i < examList.length; i++) {
        examList[i].index = i + 1;
      }
      // console.log(examList);
      this.setState({
        data: examList
      });
    }
  }
  // column for admin
  getAdminColumns = () => [
    {
      title: "Id..",
      dataIndex: "exam_id",
      key: "exam_id",
      sorter: (a, b) => a.exam_id - b.exam_id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Exam",
      dataIndex: "title",
      key: "title",
      color: "#e6fffb",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("title"),
      // render: (text, record) => (
      //   <span>
      //     <Link
      //       to={{
      //         pathname: "/exam/" + record.exam_id
      //       }}
      //     >
      //       {record.title}
      //     </Link>
      //   </span>
      // )
    },
    {
      title: "Total People Try",
      dataIndex: "total_people_try",
      key: "total_people_try",
      sorter: (a, b) => a.total_people_try - b.total_people_try,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total Question",
      dataIndex: "total_question",
      key: "total_question",
      sorter: (a, b) => a.total_question.length - b.total_question.length,
      sortDirections: ["descend", "ascend"],
    }
  ];

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  });

  expandedRowRender = record => (
    <div>
      <Descriptions title="Description" column={5}>
        <Descriptions.Item label="Subject">
          {this.props.subjects.data.map(subject =>
            subject.subject_id == record.subject ? subject.title : null
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Topic">
          {this.props.topics.data.map(topic =>
            topic.topic_id == record.topic ? topic.topic : null
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Random">
          {record.is_random === true ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item label="Display Question">
          {record.show_question}
        </Descriptions.Item>
        <Descriptions.Item label="Total Question">
          {record.total_question}
        </Descriptions.Item>
        <Descriptions.Item label="Limit">
          {record.limit === null ? "No Attempt Limit " : record.limit}
        </Descriptions.Item>
        <Descriptions.Item label="Timer">
          {record.timer === null ? "No Timer" : record.timer + " Minutes"}
        </Descriptions.Item>
        <Descriptions.Item label="Open">
          {record.start_date === null || record.end_date === null
            ? " Open: Permanently"
            : `${moment(record.start_date)
                .utc()
                .format("YYYY-MM-DD HH:mm:ss")} - ${moment(record.end_date)
                .utc()
                .format("YYYY-MM-DD HH:mm:ss")}`}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  onSelectChange = (stateType, selectedExams) => {
    this.setState({ selectedExams });
    this.props.updateForm(stateType, selectedExams);
  };

  render() {
    const { selectedExams, data } = this.state;
    const rowSelection = {
      selectedRowKeys: selectedExams,
      onChange: this.onSelectChange.bind(this, "selectedExams"),
      
    };

    return (
      <div>
        <Row>
          <Col span={19}>
            <h2>Select Exam (Show private exam only)</h2>
          </Col>
        </Row>
        <Table
          // columns={this.props.auth.role === "admin" ? this.getAdminColumns() : this.getUserColumns()}
          rowSelection={rowSelection}
          columns={this.getAdminColumns()}
          size={"small"}
          expandedRowRender={this.expandedRowRender}
          // scroll= {{ x:"max-content" }}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          rowKey={record => record.exam_id}
          loading={this.props.exams.loading}
          // style={{
          //   background: "#e6fffb"
          // }}
        />
        <PrevNextPageButton next={2} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    exams: state.exams,
    subjects: state.subjects,
    topics: state.topics,
    auth: state.auth,
    selectedExams: state.FormReducer.selectedExams
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPrivateExams: () => dispatch(actions.getPrivateExams()),
    getSubjects: () => dispatch(subject_actions.getSubjects()),
    getTopics: () => dispatch(topic_actions.getTopics()),
    updateForm: (stateType, value) =>
      dispatch(assign_actions.updateForm(stateType, value))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstStep);
