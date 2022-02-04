import React from "react";
import { Icon, Table, Input, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/HistoryActions";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";

//add field total_question in model

class ExamHistoryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    if (this.props.auth.role === "admin") {
      this.props.getHistorys();
    } else {
      this.props.getHistory(userId);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.historys.data != this.props.historys.data) {
      let historyList = [];
      this.props.historys.data.map((item) => {
        let history = {
          attempt_id: item.attempt_id,
          name: item.full_name,
          attempt: item.attempt,
          exam_title: item.exam_title,
          total_attempted: item.total_attempted,
          total_correct: item.total_correct,
          total_question: item.current_total_question,
          score: item.score.toFixed(2),
          created_on: moment(item.created_on).format("YYYY-MM-DD HH:mm:ss"),
          update_on: moment(item.update_on).format("YYYY-MM-DD HH:mm:ss"),
        };
        historyList.push(history);
      });

      // console.log(historyList)
      this.setState({ data: historyList });
    }
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
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
    filterIcon: (filtered) => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  //column for user
  getUserColumns = () => [
    {
      title: "Id.",
      dataIndex: "attempt_id",
      key: "attempt_id",
      sorter: (a, b) => a.attempt_id - b.attempt_id,
      sortDirections: ["descend", "ascend"],
      // render: (value, item, index) => (this.state.page - 1) * 10 + index +1
    },
    {
      title: "Exam",
      dataIndex: "exam_title",
      sorter: (a, b) => a.exam_title.localeCompare(b.exam_title),
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("exam_title"),
      render: (text, record) => (
        <span>
          <Link
            to={{
              pathname: "/history/result/" + record.attempt_id,
            }}
          >
            {record.exam_title}
          </Link>
        </span>
      ),
    },
    {
      title: "Total Question",
      dataIndex: "total_question",
      key: "total_question",
      sorter: (a, b) => a.total_question - b.total_question,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total Correct",
      dataIndex: "total_correct",
      key: "total_correct",
      sorter: (a, b) => a.total_correct - b.total_correct,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      sorter: (a, b) => a.score - b.score,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <div>
          {record.score >= 50 && (
            <div style={{ color: "#3f8600" }}>{record.score}</div>
          )}
          {record.score < 50 && (
            <div style={{ color: "#cf1322" }}>{record.score}</div>
          )}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "created_on",
      key: "created_on",
      ...this.getColumnSearchProps("created_on"),
    },
  ];

  //column for admin
  getAdminColumns = () => [
    {
      title: "Id",
      dataIndex: "attempt_id",
      key: "attempt_id",
      sorter: (a, b) => a.attempt_id - b.attempt_id,
      sortDirections: ["descend", "ascend"],
      // render: (value, item, index) => (this.state.page - 1) * 10 + index +1
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "auto",
      ...this.getColumnSearchProps("name"),
    },
    {
      title: "Exam",
      dataIndex: "exam_title",
      key: "exam_title",
      width: "auto",
      sorter: (a, b) => a.exam_title.localeCompare(b.exam_title),
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("exam_title"),
      render: (text, record) => (
        <span>
          <Link
            to={{
              pathname: "/history/result/" + record.attempt_id,
            }}
          >
            {record.exam_title}
          </Link>
        </span>
      ),
    },
    {
      title: "Total Question",
      dataIndex: "total_question",
      key: "total_question",
      sorter: (a, b) => a.total_question - b.total_question,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Total Correct",
      dataIndex: "total_correct",
      key: "total_correct",
      sorter: (a, b) => a.total_correct - b.total_correct,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      sorter: (a, b) => a.score - b.score,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <div style={{ color: "#3f8600" }}>
          {record.score >= 50 && <div>{record.score}</div>}
          {record.score < 50 && (
            <div style={{ color: "#cf1322" }}>{record.score}</div>
          )}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "created_on",
      key: "created_on",
      sorter: (a, b) => a.created_on.localeCompare(b.created_on),
      sortDirections: ["descend", "ascend"],
      ...this.getColumnSearchProps("created_on"),
    },
  ];

  render() {
    const { data } = this.state;
    return (
      <div>
        <h2>Attempt History</h2>
        <Table
          // scroll= {{ x:"max-content" }}
          size={"small"}
          className="table"
          rowKey={(record) => record.attempt_id}
          dataSource={data}
          columns={
            this.props.auth.role === "admin"
              ? this.getAdminColumns()
              : this.getUserColumns()
          }
          pagination={{
            pageSize: 10,
            onChange: (page) => {
              this.setState({
                page: page,
              });
            },
          }}
          bordered={false}
          loading={this.props.historys.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { historys: state.historys, auth: state.auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHistorys: () => dispatch(actions.getHistorys()),
    getHistory: (userId) => dispatch(actions.getHistory(userId)),
  };
};

ExamHistoryView.propTypes = {
  data: PropTypes.object.isRequired,
};

ExamHistoryView.defaultProps = {
  data: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamHistoryView);
