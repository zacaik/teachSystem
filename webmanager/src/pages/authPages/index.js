import React, { useState, memo } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  BulbOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { ManageWrapper } from "./style";
import { Link, Routes, Route } from "react-router-dom";
import MyHeader from "../../components/MyHeader";
import Brief from "../Brief";
import Course from "../Course";
import Student from "../Student";
import ClassInteraction from "../ClassInteraction";
import StudentDetail from "../Student/details";
import ClassTest from '../ClassTest';
import ClassTestDetails from '../ClassTest/ClassTestDetails';

const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

export default function AuthPage(props) {
  const [collapsed, setCollapsed] = useState(false);
  const { currentClass, setCurrentClass, classList } = props;
  console.log(currentClass);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <ManageWrapper>
      <Layout style={{ minHeight: "100vh" }} className="layout">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          className="sider"
        >
          <div className="logo">
            <img
              src={
                "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              }
              alt=""
            />
            <div className="title">
              <h3>SmartClass</h3>
              <h3>后台管理系统</h3>
            </div>
          </div>
          <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/brief">总览</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/course">课程管理</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              <Link to="/student">学生管理</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<BulbOutlined />}>
              <Link to="/classInteraction">课堂互动</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<EditOutlined />}>
              <Link to="/classTest">课堂测验</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <MyHeader
              currentClass={currentClass}
              setCurrentClass={setCurrentClass}
              classList={classList}
            ></MyHeader>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Routes>
              <Route
                path="/brief"
                element={<Brief currentClass={currentClass} />}
              />
              <Route path="/course" element={<Course />} />
              <Route
                path="/student"
                element={<Student currentClass={currentClass} />}
                exact
              />
              <Route path="/student/detail/:id" element={<StudentDetail currentClass={currentClass} />} />
              <Route
                path="/classInteraction"
                element={<ClassInteraction currentClass={currentClass} />}
              />
              <Route
                path="/classTest"
                element={<ClassTest currentClass={currentClass} />}
                exact
              />
              <Route
                path="/classTest/detail/:id"
                element={<ClassTestDetails currentClass={currentClass} />}
                exact
              />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            SmartClass Management ©2022 Created by HHU
          </Footer>
        </Layout>
      </Layout>
    </ManageWrapper>
  );
}
