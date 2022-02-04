import React from "react";
import { Layout, Menu, Icon, Dropdown, Badge } from "antd";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/AuthActions";
import * as badge_actions from "../store/actions/AssignActions";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const logo = {
  color: "white",
  display: "inline",
  float: "left",
  fontSize: "20px",
  fontWeight: "550"
};

const username = {
  position: "absolute",
  right: 70,
  display: "inline",
  color: "white",
  fontSize: "16px"
};

class CustomLayout extends React.Component {
  state = {
    collapsed: false
  };
  componentDidMount() {
    const userId = this.props.auth.user_id;
    this.props.getAssigns(userId);
  }
  menu = (
    <Menu theme="dark">
      <Menu.Item key="profile">
        <NavLink to={`/profile/${this.props.auth.user_id}`}>
          <Icon type="profile" style={{ marginRight: "8px" }} />
          <span>Profile</span>
        </NavLink>
      </Menu.Item>
      <Menu.Item key="logout" onClick={this.props.logout}>
        <Icon type="logout" style={{ marginRight: "8px" }} />
        <span>Log out</span>
      </Menu.Item>
    </Menu>
  );
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const { location } = this.props;
    const badge_count = this.props.badge.data.length;
    // console.log(this.props.isAuthenticated);
    return (
      <Layout>
        <Header
          className="header"
          style={{ position: "sticky", zIndex: 1, width: "100%" }}
        >
          {/* <Header className="header" > */}
          <div style={logo}>ONLINE EXAMINATION</div>
          <Menu theme="dark" mode="inline" style={{ lineHeight: "64px" }}>
            {this.props.isAuthenticated === true && (
              <Dropdown
                overlay={this.menu}
                trigger={["click"]}
                overlayStyle={{}}
              >
                <span style={username}>
                  {this.props.auth.role}, {this.props.auth.username}{" "}
                  <Icon type="down" />
                </span>
              </Dropdown>
            )}
          </Menu>
        </Header>

        <Layout>
          <Sider
            width={290}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "sticky",
              top: 0,
              left: 0
            }}
            breakpoint="sm"
          >
            <div className="logo" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["/"]}
              selectedKeys={[location.pathname]}
            >
              <Menu.Item key="/subject">
                <NavLink to="/subject">
                  <Icon type="home" />
                  <span>Home</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`/history/attempt/${this.props.auth.user_id}`}>
                <NavLink to={`/history/attempt/${this.props.auth.user_id}`}>
                  <Icon type="calculator" />
                  <span>Attempt History</span>
                </NavLink>
              </Menu.Item>
              {this.props.auth.role !== "admin" && (
                <Menu.Item key={`/assigned_exam/${this.props.auth.user_id}`}>
                  <NavLink to={`/assigned_exam/${this.props.auth.user_id}`}>
                    <Icon type="form" />
                    <span>Assigned Exam</span>
                    <span style={{ marginLeft: "10px" }}>
                      <Badge count={badge_count} overflowCount={10} />{" "}
                    </span>
                  </NavLink>
                </Menu.Item>
              )}
              {(this.props.auth.role == "admin" ||
                this.props.auth.role == "instructor") && (
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="schedule" />
                      <span>{"Manage Subject & Exam"}</span>
                    </span>
                  }
                >
                  <Menu.Item key={`/manage/subject/${this.props.auth.user_id}`}>
                    <NavLink to={`/manage/subject/${this.props.auth.user_id}`}>
                      <Icon type="read" />
                      <span>{"Subject & Topic List"}</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key={`/manage/exam/${this.props.auth.user_id}`}>
                    <NavLink to={`/manage/exam/${this.props.auth.user_id}`}>
                      <Icon type="read" />
                      <span>Exam List</span>
                    </NavLink>
                  </Menu.Item>
                </SubMenu>
              )}
              {(this.props.auth.role == "admin" ||
                this.props.auth.role == "instructor") && (
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="audit" />
                      <span>{"Assign Exam"}</span>
                    </span>
                  }
                >
                  <Menu.Item key={`/assign/`}>
                    <NavLink to={`/assign/`}>
                      <Icon type="file-done" />
                      <span>Assign Exam</span>
                    </NavLink>
                  </Menu.Item>
                  <Menu.Item key={`/assigned/`}>
                    <NavLink to={`/assigned/`}>
                      <Icon type="file-done" />
                      <span>All Assigned List</span>
                    </NavLink>
                  </Menu.Item>
                </SubMenu>
              )}
              {(this.props.auth.role == "admin") && (
                <Menu.Item key={`/marking/exam/admin`}>
                  <NavLink to={`/marking/exam/admin`}>
                    <Icon type="check" />
                    <span>Marking</span>
                  </NavLink>
                </Menu.Item>
              )}
              {(this.props.auth.role == "instructor") && (
                <Menu.Item key={`/marking/exam/instructor`}>
                  <NavLink to={`/marking/exam/instructor`}>
                    <Icon type="check" />
                    <span>Marking</span>
                  </NavLink>
                </Menu.Item>
              )}
              {this.props.auth.role == "admin" && (
                <Menu.Item key={`/user/`}>
                  <NavLink to={`/user/`}>
                    <Icon type="user" />
                    <span> Manage User</span>
                  </NavLink>
                </Menu.Item>
              )}
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 12px 12px", background: "#fff"}}>
            <Content style={{ padding: "35px" }}>
              <div
                style={{ background: "#fff",minHeight: "100vh" }}
              >
                {this.props.children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth,
    badge: state.assigned_exams
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    getAssigns: userId => dispatch(badge_actions.getAssigns(userId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
