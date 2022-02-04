import React from "react";
import { Col, Row, Select, Table, Popconfirm, Input, Icon, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../../store/actions/UserActions";

const { Option } = Select;

class ManageUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRole: null,
      visible: false,
      targetUser: null
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
  showConfirm = id => {
    // console.log(id,this.state.targetUser)
    if (id === this.state.targetUser) return true;
    return false;
  };

  handleVisibleChange = (visible) => {
    if (visible === false){
      this.handleCancel();
    }
  }

  handleChange = (value, record) => {
    this.setState({
      selectedRole: value,
      visible: true,
      targetUser: record.id
    });
    console.log(value, record.id);
  };

  handleOk = record => {
    const role = this.state.selectedRole;
    console.log(role)
    console.log(record)
    this.props.updateUser(record, role);
    this.setState({
      // selectedRole: null,
      visible: false,
      targetUser: null
    });
  };

  handleCancel = () => {
    this.setState({
      // selectedRole: null,
      visible: false,
      targetUser: null
    });
  };

  render() {
    const { data } = this.props.users;
    const { auth } = this.props;
    
    return (
      <React.Fragment>
        <Row>
          <Col span={19}>
            <h2>User</h2>
          </Col>
        </Row>
        <Table 
          columns={[
            {
              title: "Id.",
              dataIndex: "id",
              key: "id",
              width: 100,
              sorter: (a, b) => a.id - b.id,
              sortDirections: ['descend', 'ascend'],
              ...this.getColumnSearchProps("id")
            },
            {
              title: "Contact Id",
              dataIndex: "contact_id",
              key: "contact_id",
              width: "auto",
              sorter: (a, b) => a.contact_id - b.contact_id,
              sortDirections: ['descend', 'ascend'],
              ...this.getColumnSearchProps("contact_id")
            },
            {
              title: "First Name",
              dataIndex: "first_name",
              key: "first_name",
              width: "auto",
              sorter: (a, b) => a.first_name.localeCompare(b.first_name),
              sortDirections: ['descend', 'ascend'],
              ...this.getColumnSearchProps("first_name")
            },
            {
              title: "Last Name",
              dataIndex: "last_name",
              key: "last_name",
              width: "auto",
              sorter: (a, b) => a.last_name.localeCompare(b.last_name),
              sortDirections: ['descend', 'ascend'],
              ...this.getColumnSearchProps("last_name")
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
              width: "auto",
              sorter: (a, b) => a.email.localeCompare(b.email),
              sortDirections: ['descend', 'ascend'],
              ...this.getColumnSearchProps("email")
            },
            {
              title: "Role",
              dataIndex: "role",
              align: "center",
              width: "auto",
              filters: [
                {
                  text: "Admin",
                  value: "Admin"
                },
                {
                  text: "Instructor",
                  value: "Instructor"
                },
                {
                  text: "Employee",
                  value: "Employee"
                },
                {
                  text: "Guest",
                  value: "Guest"
                }
              ],
              onFilter: (value, record) => record.role.indexOf(value) === 0,

              render: (role, record) =>
                record.id == auth.user_id ? (
                  <b>{role}</b>
                ) : (
                  <Popconfirm
                    title={
                      this.state.selectedRole !== null
                        ? `Change to ${this.state.selectedRole.toLowerCase()} ?`
                        : null
                    }
                    
                    visible={this.showConfirm(record.id)}
                    onConfirm={e => this.handleOk(record)}
                    onCancel={this.handleCancel}
                    okText="Yes"
                    cancelText="No"
                    onVisibleChange={this.handleVisibleChange}
                  >
                    <Select
                      value={role}
                      onChange={value => this.handleChange(value, record)}
                      style={{ width: "100%", textAlign: "center" }}
                    >
                      <Option value="Admin">Admin</Option>
                      <Option value="Employee">Employee</Option>
                      <Option value="Instructor">Instructor</Option>
                      <Option value="Guest">Guest</Option>
                    </Select>
                  </Popconfirm>
                )
            }
          ]}
          className="table"
          dataSource={data}
          size={"small"}
          // scroll= {{ x:"max-content" }}
          pagination={{ pageSize: 10 }}
          rowKey={record => record.id}
          loading={this.props.users.loading}
          // style={{
          //   background: "#e6fffb"
          // }}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users, auth: state.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(actions.getUsers()),
    updateUser: (values,role) => dispatch(actions.updateUser(values, role)),
    deleteUser: values => dispatch(actions.deleteUser(values))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUser);
