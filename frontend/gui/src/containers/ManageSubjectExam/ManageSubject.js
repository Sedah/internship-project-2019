import React from "react";
import {
  Icon,
  Row,
  Col,
  Button,
  message,
  Collapse,
  List,
  Tooltip,
  Popconfirm
} from "antd";
import { connect } from "react-redux";
import * as subject_actions from "../../store/actions/SubjectActions";
import * as topic_actions from "../../store/actions/TopicActions";
import PropTypes from "prop-types";
import moment from "moment";
import _ from "lodash";
import { SubjectForm } from "../../components/Subject";
import TopicTag from "./TopicTag";

const customPanelStyle = {
  background: "#f7f7f7",
  borderRadius: 4,
  marginBottom: 24,
  border: 0
};

const { Panel } = Collapse;

class ManageSubject extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      visible: false,
      targetSubject: {},
      targetTopic: {},
      data: [],
      subjectList: [],
      topicList: [],
    };
  }


  componentDidMount() {
    this.props.getSubjects();
    this.props.getTopics();
    this.setState({
      subjectList: this.props.subjects.data,
      topicList: this.props.topics.data
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subjects.data != this.props.subjects.data) {
      this.setState({
        subjectList: this.props.subjects.data
      });
    }
    if (prevProps.topics.data !== this.props.topics.data) {

      this.setState({
        topicList: this.props.topics.data
      });
  }
}

  handleSubjectChange = value => {
    this.setState({
      selectedSubject: value,
    });
  };
  handleCloseModal = () => {
    // console.log(this);
    const { form } = this.formRef.current.props;
    form.resetFields();
    this.setState({ visible: false, targetSubject: {} });
  };

  handleEditSubject = record => {
    // console.log('handleedit >>.', record);
    this.showModal();
    this.setState({
      targetSubject: record
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { form } = this.formRef.current.props;
    const { createSubject, updateSubject } = this.props;
    if (this.formRef.current) {
      form.validateFields((err, values) => {
        // console.log('Received values of form: ', values);
        if (!err) {
          const { targetSubject } = this.state;
          const dataToSave = {
            ...targetSubject,
            ...values
          };
          if (_.isEmpty(targetSubject)) {
            createSubject(dataToSave);
          } else {
            updateSubject(dataToSave);
          }
          setTimeout(() => {
            this.handleCloseModal();
          }, 0);
        }
      });
    }
  };

    


  handleTopicSubmit = event => {
    event.preventDefault();
    const { form } = this.formRef.current.props;
    const { createTopic } = this.props;
    if (this.formRef.current) {
      form.validateFields((err, values) => {
        // console.log('Received values of form: ', values);
        if (!err) {
          const { targetTopic } = this.state;
          const dataToSave = {
            ...targetTopic,
            ...values
          };
          if (_.isEmpty(targetTopic)) {
            createTopic(dataToSave);
          } 
          setTimeout(() => {
            this.handleCloseModal();
          }, 0);
        }
      });
    }
  };

  removeSubject = record => {
    this.props.deleteSubject(record);
    if (this.props.subjects.error === null) {
      const title = record.title;
      message.success(`Delete ${title} success`);
    } 
  };

  genExtra = itemlist => (
    (
      <div>
        <Tooltip placement="top" title="Edit Title">
          <Button
            type="link"
            size="small"
            onClick={() => this.handleEditSubject(itemlist)}
          >
            <Icon type="edit" theme="outlined" style={{ fontSize: "16px" }} />
          </Button>
        </Tooltip>
        <Tooltip placement="top" title="Delete">
          <Popconfirm
            placement="bottom"
            title="Are you sure to delete this subject?"
            onConfirm={e => this.removeSubject(itemlist)}
            okText="Yes"
            cancelText="No"
          >
            <Icon type="delete" text="Delete" style={{ color: "red" }} />{" "}
          </Popconfirm>
        </Tooltip>
      </div>
    )
  );

  render() {
    const {
      visible,
      targetSubject,
      subjectList,
      topicList,
    } = this.state;
    const { subjects, topics } = this.props
    console.log(topicList)
    return (
      <div>
        <Row>
          <Col span={19}>
            <h2>{"Manage Subject & Topic"}</h2>
          </Col>
          <Col span={5}>
            <div>
              <Button
                type="primary"
                onClick={this.showModal}
                style={{ position: "absolute", right: 0 }}
              >
                Add Subject
              </Button>
              <SubjectForm
                wrappedComponentRef={this.formRef}
                visible={visible}
                onCancel={this.handleCloseModal}
                onCreate={this.handleFormSubmit}
                data={targetSubject}
              />
            </div>
          </Col>
          
        </Row>
        <div>
          <List
            itemLayout="horizontal"
            dataSource={subjectList}
            pagination={{
              pageSize: 6,
            }}
            loading={subjects.loading===true && topics.loading===true ? true : false}
            renderItem={itemlist => (
              <Collapse bordered={false} className="subject">
                <Panel
                  header={<b>Subject Name: {itemlist.title}</b>}
                  key={itemlist.subject_id}
                  extra={this.genExtra(itemlist)}
                  style={customPanelStyle}
                >
                  <div className="topic-tag">
                    <TopicTag
                      topicList={topicList}
                      visible={visible}
                      subject={itemlist}
                      subject_id={itemlist.subject_id}
                      handleRemoveTopic={this.handleRemoveTopic}
                    />
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
    topics: state.topics,
    auth: state.auth,
    subjects: state.subjects
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSubjects: () => dispatch(subject_actions.getSubjects()),
    getTopics: () => dispatch(topic_actions.getTopics()),
    createTopic: values => dispatch(topic_actions.createTopic(values)),
    deleteTopic: values => dispatch(topic_actions.deleteTopic(values)),
    createSubject: values => dispatch(subject_actions.createSubject(values)),
    updateSubject: values => dispatch(subject_actions.updateSubject(values)),
    deleteSubject: values => dispatch(subject_actions.deleteSubject(values))
  };
};

ManageSubject.propTypes = {
  data: PropTypes.object.isRequired
};

ManageSubject.defaultProps = {
  data: {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageSubject);
