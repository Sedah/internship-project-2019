import React from "react";
import { Button, Row, Col, Table, Icon, Input } from "antd";
import { connect } from "react-redux";
import * as assign_actions from "../../../store/actions/AssignFormActions";
import * as user_actions from "../../../store/actions/UserActions";
import PrevNextPageButton from "../PrevNextPageButton";

import _ from "lodash";


class SecondStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      selectedUsers: this.props.selectedUsers
    };
  }
  componentDidMount() {
    this.props.getUsers();
  }

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

  onSelectChange = (stateType, selectedUsers) => {
    this.setState({ selectedUsers });
    this.props.updateForm(stateType, selectedUsers);
  };

  render() {
    const { data } = this.props.users;
    const { selectedUsers } = this.state;
    const rowSelection = {
      selectedRowKeys: selectedUsers,
      onChange: this.onSelectChange.bind(this, "selectedUsers")
    };

    return (
      <div>
        <Row>
          <Col span={19}>
            <h2>Select User</h2>
          </Col>
        </Row>
        <Table
          rowSelection={rowSelection}
          columns={[
            {
              title: "Id..",
              dataIndex: "id",
              key: "id",
              width: 100,
              sorter: (a, b) => a.id - b.id,
              sortDirections: ["descend", "ascend"],
              ...this.getColumnSearchProps("id")
            },
            {
              title: "Contact Id",
              dataIndex: "contact_id",
              key: "contact_id",
              width: 100,
              sorter: (a, b) => a.contact_id - b.contact_id,
              sortDirections: ["descend", "ascend"],
              ...this.getColumnSearchProps("contact_id")
            },
            {
              title: "First Name",
              dataIndex: "first_name",
              key: "first_name",
              width: 200,
              sorter: (a, b) => a.first_name.localeCompare(b.first_name),
              sortDirections: ["descend", "ascend"],
              ...this.getColumnSearchProps("first_name")
            },
            {
              title: "Last Name",
              dataIndex: "last_name",
              key: "last_name",
              width: 200,
              sorter: (a, b) => a.last_name.localeCompare(b.last_name),
              sortDirections: ["descend", "ascend"],
              ...this.getColumnSearchProps("last_name")
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
              width: 150,
              sorter: (a, b) => a.email.localeCompare(b.email),
              sortDirections: ["descend", "ascend"],
              ...this.getColumnSearchProps("email")
            }
          ]}
          dataSource={data}
          // scroll= {{ x:"max-content" }}
          pagination={{ pageSize: 10 }}
          className="table"
          size={"small"}
          rowKey={record => record.id}
          loading={this.props.users.loading}
        />
        <PrevNextPageButton prev={1} next={3} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    selectedExams: state.FormReducer.selectedExams,
    selectedUsers: state.FormReducer.selectedUsers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(user_actions.getUsers()),
    updateForm: (stateType, value) =>
      dispatch(assign_actions.updateForm(stateType, value)),
    createAssign: (exam, user) =>
      dispatch(assign_actions.createAssign(exam, user)),
      resetForm: () => dispatch(assign_actions.resetForm())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondStep);
