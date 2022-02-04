import React from "react";
import { Form, Button, InputNumber, DatePicker, Icon, Input } from "antd";
import { connect } from "react-redux";
import * as assign_actions from "../../../store/actions/AssignFormActions";
import * as user_actions from "../../../store/actions/UserActions";
import PrevNextPageButton from "../PrevNextPageButton";

import _ from "lodash";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

class ThirdStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      limit: this.props.limit,
      startValue: this.props.startValue,
      endValue: this.props.endValue
    };
  }
  componentDidMount() {
    this.props.getUsers();
  }

  handleSubmit = () => {
    const {
      createAssign,
      selectedExams,
      selectedUsers,
      resetForm,
      limit,
      startValue,
      endValue
    } = this.props;
    createAssign(selectedExams, selectedUsers, limit, startValue, endValue);
    resetForm();
  };

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
    this.props.updateForm(field, value);
  };

  onLimitChange = value => {
    this.onChange("limit", value);
  };

  onStartChange = value => {
    this.onChange("startValue", value);
  };

  onEndChange = value => {
    this.onChange("endValue", value);
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { limit, startValue, endValue } = this.state;

    return (
      <div>
        <div style={{ display: "table", margin: "auto" }}>
          <Form {...formItemLayout}>
            <Form.Item label="Limit">
              {getFieldDecorator("limit", {
                initialValue: limit
              })(
                <InputNumber
                  min={0}
                  max={10}
                  style={{ width: 75 }}
                  onChange={this.onLimitChange}
                />
              )}
              {/* <span style={{ marginLeft: "10px" }}>{"*Max 10"}</span> */}
            </Form.Item>

            <Form.Item label="Start Date">
              {getFieldDecorator("start_date", {
                initialValue: startValue
              })(
                <DatePicker
                  disabledDate={this.disabledStartDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="Start"
                  onChange={this.onStartChange}
                />
              )}
            </Form.Item>

            <Form.Item label="End Date">
              {getFieldDecorator("end_date", {
                initialValue: endValue
              })(
                <DatePicker
                  disabledDate={this.disabledEndDate}
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="End"
                  onChange={this.onEndChange}
                />
              )}
            </Form.Item>
          </Form>
        </div>
        <PrevNextPageButton prev={2} submit={() => this.handleSubmit()} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    selectedExams: state.FormReducer.selectedExams,
    selectedUsers: state.FormReducer.selectedUsers,
    limit: state.FormReducer.limit,
    startValue: state.FormReducer.startValue,
    endValue: state.FormReducer.endValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(user_actions.getUsers()),
    updateForm: (stateType, value) =>
      dispatch(assign_actions.updateForm(stateType, value)),
    createAssign: (exams, users, limit, startValue, endValue) =>
      dispatch(
        assign_actions.createAssign(exams, users, limit, startValue, endValue)
      ),
    resetForm: () => dispatch(assign_actions.resetForm())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ThirdStep));
