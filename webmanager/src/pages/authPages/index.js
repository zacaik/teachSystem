import React, { useState, memo } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { ManageWrapper } from "./style";
import { Link, Routes, Route } from "react-router-dom";
import MyHeader from "../../components/MyHeader";
import Brief from "../Brief";
import Course from "../Course";
import Grade from "../Grade";
import ClassInteraction from "../ClassInteraction";

const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

export default memo(function AuthPage (props) {
  const [collapsed, setCollapsed] = useState(false);

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
            <img src={'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'} alt="" />
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
              <Link to="/grade">成绩管理</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<TeamOutlined />}>
              <Link to="/classInteraction">课堂互动</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <MyHeader></MyHeader>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Routes>
              <Route path="/brief" element={<Brief />} key={1}/>
              <Route path="/course" element={<Course />} key={2}/>
              <Route path="/grade" element={<Grade />} key={3}/>
              <Route path="/classInteraction" element={<ClassInteraction />} key={4}/>
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            SmartClass Management ©2022 Created by HHU
          </Footer>
        </Layout>
      </Layout>
    </ManageWrapper>
  );
});
