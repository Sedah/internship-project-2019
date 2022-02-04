import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
} from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/AssignListActions";
import _ from "lodash";
import moment from "moment";
import EditAssignForm from "./EditAssignForm";
import { AssignedExamListView } from "../ExamView";

class AssignedView extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      data: [],
      visible: false,
      targetAssign: {},
      limit: null,
      startValue: null,
      endValue: null
    };
  }
  componentDidMount() {
    this.props.getAllAssigns();
  }

  //--------------------------------------------------EditAssignForm Function---------------------------------

  handleFormSubmit = event => {
    event.preventDefault();
    const { form } = this.formRef.current.props;

    const { updateAssign } = this.props;
    if (this.formRef.current) {
      form.validateFields((err, values) => {
        if (values.start_date && values.end_date !== null) {
          values.start_date = moment(values.start_date).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          values.end_date = moment(values.end_date).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }

        console.log("Received values of form: ", values);
        if (!err) {
          const { targetAssign } = this.state;
          const dataToSave = {
            ...targetAssign,
            ...values
          };
          updateAssign(dataToSave);
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
    console.log(record.start_date);
    this.setState({
      targetAssign: record,
      limit: record.limit,
      startValue: record.start_date,
      endValue: record.end_date
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

  //--------------------------------------------------Modal Function---------------------------------
  handleClose = () => {
    const { form } = this.formRef.current.props;
    form.resetFields();
    this.setState({
      visible: false,
      targetAssign: {},
      limit: null,
      startValue: null,
      endValue: null
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    const {
      visible,
      targetAssign,
      limit,
      startValue,
      endValue,
    } = this.state;
    console.log(this.props.assigned_list);

    return (
      <div>
        <Row>
          <Col span={19}>
            <h2>All Assign List</h2>
          </Col>
            <div>
              <AssignedExamListView
                assigned_list={this.props.assigned_list}
                handleEdit={this.handleEdit}
                deleteAssign={this.deleteAssign}
              />
              <EditAssignForm
                //form
                wrappedComponentRef={this.formRef}
                onCreate={this.handleFormSubmit}
                //modal
                visible={visible}
                onCancel={this.handleClose}
                //datetime
                disabledStartDate={this.disabledStartDate}
                onStartChange={this.onStartChange}
                disabledEndDate={this.disabledEndDate}
                onEndChange={this.onEndChange}
                startValue={startValue}
                endValue={endValue}
                //data
                data={targetAssign}
                limit={limit}
              />
            </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { assigned_list: state.assigned_list };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllAssigns: () => dispatch(actions.getAllAssigns()),
    updateAssign: value => dispatch(actions.updateAssign(value)),
    deleteAssign: value => dispatch(actions.deleteAssign(value))
  };
};

AssignedView.defaultProps = {
  data: []
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignedView);
