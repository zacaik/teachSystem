import React, { memo } from "react";
import { StudentWrapper } from "./style";
import { Select, Card, Button, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";

const Student = memo(() => {
  const navigate = useNavigate();
  const { Search } = Input;

  const columns = [
    {
      title: "openId",
      dataIndex: "openId",
    },
    {
      title: "姓名",
      dataIndex: "name",
      render: (text) => <a onClick={(e) => e.defaultPrevented()}>{text}</a>,
    },
    {
      title: "性别",
      dataIndex: "sex",
    },
    {
      title: "班级",
      dataIndex: "class",
    },
    {
      title: "学号",
      dataIndex: "studentId",
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            className="btn"
            onClick={() => navigate("./detail/1")}
          >
            查看学生详情
          </Button>
        </>
      ),
    },
  ];

  const data = [
    {
      openId: "08123",
      name: "李俊燃",
      class: "计算机二班",
      sex: "男",
      studentId: "1806010228",
    },
    {
      openId: "08123",
      name: "李俊燃",
      class: "计算机二班",
      sex: "男",
      studentId: "1806010228",
    },
    {
      openId: "08123",
      name: "李俊燃",
      sex: "男",
      class: "计算机二班",
      studentId: "1806010228",
    },
    {
      openId: "08123",
      name: "李俊燃",
      sex: "男",
      class: "计算机二班",
      studentId: "1806010228",
    },
    {
      openId: "08123",
      name: "李俊燃",
      sex: "男",
      class: "计算机二班",
      studentId: "1806010228",
    },
    {
      openId: "08123",
      name: "李俊燃",
      sex: "男",
      class: "计算机二班",
      studentId: "1806010228",
    },
    {
      openId: "08123",
      name: "李俊燃",
      sex: "男",
      class: "计算机二班",
      studentId: "1806010228",
    },
    {
      openId: "08123",
      name: "李俊燃",
      sex: "男",
      class: "计算机二班",
      studentId: "1806010228",
    },
    {
      openId: "08123",
      name: "李俊燃",
      sex: "男",
      class: "计算机二班",
      studentId: "1806010228",
    },
  ];

  return (
    <StudentWrapper>
      <div className="studentSummary">
        <div className="actionHeader">
          <div className="selector">
            选择课程：
            <Select style={{ width: 200, margin: 10 }} />
          </div>
          <div className="search">
            <Search
              placeholder="按学号或姓名搜索学生"
              onSearch={handleSearch}
              enterButton
              style={{ width: 250, margin: 10 }}
            />
          </div>
        </div>
        <div className="tableWrapper">
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 8 }}
          />
        </div>
      </div>
    </StudentWrapper>
  );

  function handleSearch() {}
});

export default Student;
