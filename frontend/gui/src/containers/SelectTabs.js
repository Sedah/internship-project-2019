import React from "react";
import { Form, Icon, Input, Button, Select, Alert, Card, Tabs } from "antd";
import Login from "./Login";
import Signup from "./Signup";
import styled from "styled-components";
import logo from "../assets/img/logo.svg";

const { TabPane } = Tabs;

const ImageWrap = styled.div`
  flex: 1;
  text-align: center;
  img {
    max-width: 45%;
  }
`;

const CardStyle = styled.div`
  height: 100vh;
  background: rgb(0, 102, 204);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Paper = styled.div`
  width: 65vw;
  height: 80vh;
  background: #fff;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

class SelectTabs extends React.Component {
  render() {
    return (
      <CardStyle>
        <Paper>
          <ImageWrap>
            <img src={logo} alt="logo" />
          </ImageWrap>

          <Card
            style={{ flex: 1 }}
            bordered={false}
          >
            <div className="card-container">
              <Tabs type="card">
                <TabPane tab="Login" key="1">
                  <Login />
                </TabPane>
                <TabPane tab="Sign Up" key="2">
                  <Signup />
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </Paper>
      </CardStyle>
    );
  }
}

export default SelectTabs;
