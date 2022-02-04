import React from "react";
import {
  Icon,
  Table,
  Input,
  Button,
  Tooltip,
  Divider,
  Popconfirm,
  message,
  Row,
  Col,
  Descriptions
} from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/HistoryActions";
import * as subject_actions from "../../store/actions/SubjectActions";
import * as user_actions from "../../store/actions/UserActions";
import * as topic_actions from "../../store/actions/TopicActions";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import _ from "lodash";
import { ExamForm } from "../../components/Exam";

class ManageExam extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visible: false,
      targetExam: {},
      data: [],
      filterTopic: [],
      disabled: null,
      topicDisabled: true,
      initialSubject: {},
      initialTopic: {},
      checked: null,
      startValue: null,
      endValue: null,
      type: null,
      type_disabled: null
    };
  }

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.props.getSubjects();
    this.props.getTopics();
    this.props.getUsers();
    if (this.props.auth.role === "admin") {
      this.props.getExamHistorys();
    } else {
      this.props.getExamHistory(userId);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.historys.data != this.props.historys.data) {
      let examHistoryList = [];
      this.props.historys.data.map(item => {
        let history = {
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
          start_date:
            item.start_date != null ? moment(item.start_date).utc() : null,
          end_date: item.end_date != null ? moment(item.end_date).utc() : null,
          timer: item.timer,
          created_on: moment(item.created_on).format("YYYY-MM-DD HH:mm:ss"),
          update_on: moment(item.update_on).format("YYYY-MM-DD HH:mm:ss")
        };
        examHistoryList.push(history);
      });
      for (let i = 0; i < examHistoryList.length; i++) {
        examHistoryList[i].index = i + 1;
      }
      //  console.log(examHistoryList);
      this.setState({ data: examHistoryList });
    }
  }

  removeExam = record => {
    this.props.deleteExam(record);
    const title = record.title;
    message.success(`Delete ${title} success`);
  };

  //--------------------------------------------------Table Function---------------------------------

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

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  mapColumns = () => {
    let columns = [
      {
        title: "์Id.",
        dataIndex: "exam_id",
        width: 100,
        sorter: (a, b) => a.exam_id - b.exam_id,
        sortDirections: ["descend", "ascend"]
      }
    ];
    if (this.props.auth.role == "admin") {
      columns.push({
        title: "Creater",
        dataIndex: "name",
        width: "auto",
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ["descend", "ascend"],
        ...this.getColumnSearchProps("name")
      });
    }
    columns.push(
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: "auto",
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
        sorter: (a, b) => a.total_question - b.total_question,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Type",
        dataIndex: "is_public",
        key: "is_public",
        render: (text, record) => (
          <div>
            {record.is_public === true && <span>Public</span>}
            {record.is_public === false && <span>Private</span>}
          </div>
        ),
        filters: [
          {
            text: "Public",
            value: true
          },
          {
            text: "Private",
            value: false
          }
        ],
        onFilter: (value, record) => record.role.indexOf(value) === 0
      },
      {
        title: "Date",
        dataIndex: "created_on",
        key: "created_on",
        width: "auto",
        ...this.getColumnSearchProps("created_on")
      },
      {
        title: "Action",
        key: "action",
        width: "auto",
        render: (text, record) => (
          <span>
            <Tooltip placement="top" title="Edit">
              <Button
                type="link"
                size="small"
                onClick={() => this.handleEdit(record)}
              >
                <Icon
                  type="edit"
                  theme="outlined"
                  style={{ fontSize: "16px" }}
                />
              </Button>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="top" title="Delete">
              <Popconfirm
                placement="bottom"
                title="Are you sure to delete this exam?"
                onConfirm={e => this.removeExam(record)}
                okText="Yes"
                cancelText="No"
              >
                <Icon type="delete" text="Delete" style={{ color: "red" }} />{" "}
              </Popconfirm>
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="top" title="Add Question">
              <Link
                to={{
                  pathname: "/exam/view/" + record.exam_id
                }}
              >
                <Icon
                  type="plus"
                  theme="outlined"
                  style={{ fontSize: "16px" }}
                />
              </Link>
            </Tooltip>
          </span>
        )
      }
    );
    return columns;
  };

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

  //--------------------------------------------------Modal Function---------------------------------
  handleClose = () => {
    const { form } = this.formRef.current.props;
    form.resetFields();
    this.setState({
      visible: false,
      disabled: null,
      targetExam: {},
      filterTopic: [],
      initialSubject: {},
      initialTopic: {},
      topicDisabled: true,
      checked: null,
      startValue: null,
      endValue: null,
      type_disabled: null
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  //--------------------------------------------------ExamForm Function---------------------------------

  handleFormSubmit = event => {
    event.preventDefault();
    const { form } = this.formRef.current.props;

    const { createExam, updateExam } = this.props;
    if (this.formRef.current) {
      form.validateFields((err, values) => {
        if (values.start_date && values.end_date !== null) {
          values.start_date = moment(values.start_date)
            .utc()
            .format("YYYY-MM-DD HH:mm:ss");
          values.end_date = moment(values.end_date)
            .utc()
            .format("YYYY-MM-DD HH:mm:ss");
        }

        console.log("Received values of form: ", values);
        if (!err) {
          const { targetExam } = this.state;
          const dataToSave = {
            ...targetExam,
            ...values
          };
          if (_.isEmpty(targetExam)) {
            createExam(dataToSave);
          } else {
            updateExam(dataToSave);
          }
          setTimeout(() => {
            this.handleClose();
          }, 0);
        }
      });
    }
  };

  handleEdit = record => {
    // console.log("handleedit >>.", record);
    this.showModal();
    this.setState({
      targetExam: record,
      disabled: record.is_random,
      checked: record.is_random,
      type: record.type,
      startValue: record.start_date,
      endValue: record.end_date
    });
  };

  handleSubjectChange = (value, initialSubject) => {
    const { form } = this.formRef.current.props;
    const topics = this.props.topics.data;
    let filterTopic = topics.filter(topic => {
      return topic.subject == value;
    });
    // console.log(filterTopic);

    this.setState({
      filterTopic: filterTopic,
      initialSubject: initialSubject,
      topicDisabled: false
    });
    form.resetFields("topic");
  };

  handleTopicChange = initialTopic => {
    this.setState({
      initialTopic: initialTopic
    });
    // console.log(initialTopic);
  };

  onCheckboxChange = e => {
    this.setState({
      disabled: !this.state.disabled,
      checked: !this.state.checked
    });
  };

  onTypeChange = e => {
    this.setState({
      type: e.target.value,
      type_disabled: e.target.value
    });
  };

  //start date and end date function

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };
  onStartChange = value => {
    this.onChange("startValue", value);
  };

  onEndChange = value => {
    this.onChange("endValue", value);
  };

  render() {
    const {
      data,
      visible,
      disabled,
      targetExam,
      filterTopic,
      initialSubject,
      initialTopic,
      topicDisabled,
      checked,
      startValue,
      endValue,
      type,
      type_disabled
    } = this.state;
    const { subjects, topics } = this.props;

    return (
      <div>
        <Row>
          <Col span={19}>
            <h2>Exam</h2>
          </Col>
          <Col span={5}>
            <div>
              <Button
                type="primary"
                onClick={this.showModal}
                style={{ position: "absolute", right: 0 }}
              >
                Add Exam
              </Button>
              {this.props.subjects.data.length !== 0 &&
                this.props.topics.data.length !== 0 && (
                  <ExamForm
                    //form
                    wrappedComponentRef={this.formRef}
                    onCreate={this.handleFormSubmit}
                    //modal
                    visible={visible}
                    onCancel={this.handleClose}
                    //disable checkbox
                    disabled={disabled}
                    checked={checked}
                    onChange={this.onCheckboxChange}
                    //disable when type change
                    type={type}
                    type_disabled={type_disabled}
                    onTypeChange={this.onTypeChange}
                    //subject
                    handleSubjectChange={this.handleSubjectChange}
                    initialSubject={initialSubject}
                    subjects={subjects}
                    //topic
                    handleTopicChange={this.handleTopicChange}
                    filterTopic={filterTopic}
                    topics={topics}
                    initialTopic={initialTopic}
                    topicDisabled={topicDisabled}
                    //datetime
                    disabledStartDate={this.disabledStartDate}
                    onStartChange={this.onStartChange}
                    disabledEndDate={this.disabledEndDate}
                    onEndChange={this.onEndChange}
                    startValue={startValue}
                    endValue={endValue}
                    //data
                    data={targetExam}
                  />
                )}
            </div>
          </Col>
        </Row>
        <Table
          rowKey={record => record.exam_id}
          expandedRowRender={this.expandedRowRender}
          size={"small"}
          // scroll={{ x: "max-content" }}
          dataSource={data}
          columns={this.mapColumns()}
          pagination={{ pageSize: 10 }}
          bordered={false}
          loading={this.props.historys.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    historys: state.historys,
    auth: state.auth,
    subjects: state.subjects,
    users: state.users,
    topics: state.topics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getExamHistorys: () => dispatch(actions.getExamHistorys()),
    getExamHistory: userId => dispatch(actions.getExamHistory(userId)),
    getSubjects: () => dispatch(subject_actions.getSubjects()),
    getTopics: () => dispatch(topic_actions.getTopics()),
    getUsers: () => dispatch(user_actions.getUsers()),
    createExam: (values, subject_id) =>
      dispatch(actions.createExam(values, subject_id)),
    updateExam: values => dispatch(actions.updateExam(values)),
    deleteExam: values => dispatch(actions.deleteExam(values))
  };
};

ManageExam.propTypes = {
  data: PropTypes.object.isRequired
};

ManageExam.defaultProps = {
  data: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageExam);
