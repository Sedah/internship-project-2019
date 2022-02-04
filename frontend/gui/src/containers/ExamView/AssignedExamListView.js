import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Table,
  Icon,
  Input,
  Popconfirm,
  Tooltip,
  Divider,
  message
} from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/AssignActions";
import * as manage_assign_actions from "../../store/actions/AssignListActions";
import * as subject_actions from "../../store/actions/SubjectActions";
import * as topic_actions from "../../store/actions/TopicActions";
import _ from "lodash";
import moment from "moment";

class AssignedExamListView extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    if (this.props.match === undefined) {
      console.log("check");
      this.props.getSubjects();
      this.props.getTopics();
    } else {
      console.log("no enter");
      const userId = this.props.match.params.userId;
      this.props.getAssigns(userId);
      this.props.getSubjects();
      this.props.getTopics();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.assigned_exams.data != this.props.assigned_exams.data &&
      this.props.match !== undefined
    ) {
      console.log(prevProps.assigned_exams, this.props.assigned_exams);
      let examList = [];
      this.props.assigned_exams.data.map(item => {
        let exam = {
          id: item.id,
          exam_id: item.assign_exam.exam_id,
          title: item.assign_exam.title,
          topic: item.assign_exam.topic,
          subject: item.assign_exam.subject,
          is_random: item.assign_exam.is_random,
          show_question: item.assign_exam.show_question,
          total_people_try: item.assign_exam.total_people_try,
          limit: item.limit,
          start_date:
            item.start_date != null
              ? moment(item.start_date)
                  .format("YYYY-MM-DD HH:mm:ss")
              : null,
          end_date:
            item.end_date != null
              ? moment(item.end_date)
                  .format("YYYY-MM-DD HH:mm:ss")
              : null,
          total_question: item.assign_exam.total_question,
          created_on: moment(item.assign_exam.created_on).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          updated_on: moment(item.assign_exam.updated_on).format(
            "YYYY-MM-DD HH:mm:ss"
          )
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
    if (
      this.props.match === undefined &&
      prevProps.assigned_list.data != this.props.assigned_list.data
    ) {
      let examList = [];
      this.props.assigned_list.data.map(item => {
        let exam = {
          id: item.id,
          exam_id: item.assign_exam.exam_id,
          title: item.assign_exam.title,
          topic: item.assign_exam.topic,
          subject: item.assign_exam.subject,
          is_random: item.assign_exam.is_random,
          show_question: item.assign_exam.show_question,
          total_people_try: item.assign_exam.total_people_try,
          full_name: item.full_name,
          limit: item.limit,
          start_date:
            item.start_date != null ? moment(item.start_date) : null,
          end_date: item.end_date != null ? moment(item.end_date) : null,
          total_question: item.assign_exam.total_question,
          created_on: moment(item.assign_exam.created_on).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          updated_on: moment(item.assign_exam.updated_on).format(
            "YYYY-MM-DD HH:mm:ss"
          )
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

  removeAssign = record => {
    this.props.deleteAssign(record);
    message.success(`Delete success`);
  };

  //get user column
  getUserColumns = () => [
    {
      title: "Id.",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("index")
    },
    {
      title: "Exam",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("title"),
      render: (text, record) => (
        <span>
          <Link
            to={{
              pathname: "/exam/detail/view/" + record.exam_id
            }}
          >
            {record.title}
          </Link>
        </span>
      )
    },
    {
      title: "Max Attempt",
      dataIndex: "limit",
      key: "limit",
      sorter: (a, b) => a.limit - b.limit,
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("limit"),
      render: limit => (limit !== null ? limit : "Unlimit")
    },
    {
      title: "Expire Date",
      dataIndex: "end_date",
      key: "end_date",
      sorter: (a, b) => a.end_date.localeCompare(b.end_date),
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("end_date"),
      render: end_date => (end_date !== null ? end_date : "Permanent")
    },
    {
      title: "Random",
      dataIndex: "is_random",
      key: "is_random",
      render: (is_random, record) => (record.is_random === true ? "Yes" : "No")
    },
    {
      title: "Total Question",
      dataIndex: "total_question",
      key: "total_question",
      sorter: (a, b) => a.total_question.length - b.total_question.length,
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("total_question"),
      render: (total_question, record) =>
        record.is_random === true ? record.show_question : record.total_question
    }
  ];

  //column for admin and instructor
  getColumns = () => [
    {
      title: "Id.",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Assign To",
      dataIndex: "full_name",
      key: "full_name",
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("full_name")
    },
    {
      title: "Exam",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("title")
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
      title: "Max Attempt",
      dataIndex: "limit",
      key: "limit",
      sorter: (a, b) => a.limit - b.limit,
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("limit"),
      render: limit => (limit !== null ? limit : "Unlimit")
    },
    {
      title: "Expire Date",
      dataIndex: "end_date",
      key: "end_date",
      sorter: (a, b) => a.end_date.localeCompare(b.end_date),
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("end_date"),
      render: end_date =>
        end_date !== null
          ? moment(end_date).format("YYYY-MM-DD HH:mm:ss")
          : "Permanent"
    },
    {
      title: "Total People Try",
      dataIndex: "total_people_try",
      key: "total_people_try",
      sorter: (a, b) => a.total_people_try - b.total_people_try,
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("total_people_try")
    },
    {
      title: "Total Question",
      dataIndex: "total_question",
      key: "total_question",
      sorter: (a, b) => a.total_question.length - b.total_question.length,
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("total_question")
    },
    {
      title: "Display Question",
      dataIndex: "show_question",
      key: "show_question",
      sorter: (a, b) => a.show_question.length - b.show_question.length,
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("show_question")
    },
    {
      title: "Action",
      width: "15%",
      render: (text, record) => (
        <span>
          <Tooltip placement="top" title="Edit">
            <Button
              type="link"
              size="small"
              onClick={() => this.props.handleEdit(record)}
            >
              <Icon type="edit" theme="outlined" style={{ fontSize: "16px" }} />
            </Button>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip placement="top" title="Delete">
            <Popconfirm
              placement="bottom"
              title="Are you sure to delete this exam?"
              onConfirm={() => this.removeAssign(record)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" text="Delete" style={{ color: "red" }} />{" "}
            </Popconfirm>
          </Tooltip>
        </span>
      )
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
      <div>
        {this.props.subjects.data.map(subject =>
          subject.subject_id == record.subject
            ? `Subject : ${subject.title}`
            : null
        )}
        <span style={{ marginLeft: "30px" }}>
          {this.props.topics.data.map(topic =>
            topic.topic_id == record.topic ? `Topic : ${topic.topic}` : null
          )}
        </span>
      </div>
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
  render() {
    const { data } = this.state;

    return (
      <div>
        {this.props.match !== undefined && (
          <Row>
            <Col span={19}>
              <h2>Exam</h2>
            </Col>
          </Row>
        )}

        <Table
          // columns={this.props.auth.role === "admin" ? this.getAdminColumns() : this.getUserColumns()}
          columns={
            this.props.match === undefined
              ? this.getColumns()
              : this.getUserColumns()
          }
          // scroll={{ x: "max-content" }}
          className="table"
          size={"small"}
          expandedRowRender={this.expandedRowRender}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          rowKey={record => record.id}
          loading={
            this.props.match === undefined
              ? this.props.assigned_list.loading
              : this.props.assigned_exams.loading
          }
          // style={{
          //   background: "#e6fffb"
          // }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    assigned_exams: state.assigned_exams,
    subjects: state.subjects,
    topics: state.topics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAssigns: userId => dispatch(actions.getAssigns(userId)),
    getSubjects: () => dispatch(subject_actions.getSubjects()),
    getTopics: () => dispatch(topic_actions.getTopics()),
    deleteAssign: record => dispatch(manage_assign_actions.deleteAssign(record))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignedExamListView);
