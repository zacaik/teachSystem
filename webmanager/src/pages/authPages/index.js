import React, { useState, memo } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import manageLogo from "../../assets/img/manage-logo.png";
import { ManageWrapper } from "./style";
import { NavLink, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import MyHeader from "../../components/MyHeader";
import Recruit from "../Recruit";
import Brief from "../Breif";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default memo(function AuthPage(props) {
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
              <Link to="/breif">总览</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/recruit">员工管理</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              {/* <NavLink to="/management/task">任务管理</NavLink> */}
            </Menu.Item>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="任务分配">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<TeamOutlined />}>
              {/* <NavLink to="/management/recruit">招聘广场</NavLink> */}
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <MyHeader></MyHeader>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Routes>
              <Route path="/breif" element={<Brief />} />
              <Route path="/recruit" element={<Recruit />} />
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
