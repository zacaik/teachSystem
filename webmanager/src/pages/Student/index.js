import React, { memo, useEffect, useState } from "react";
import { StudentWrapper } from "./style";
import { Select, Card, Button, Input, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useHttp } from '../../utils/http';

const Student = (props) => {
  const navigate = useNavigate();
  const request = useHttp();

  const { currentClass } = props;
  console.log(props);
  console.log(currentClass);
  const { Search } = Input;

  const [studentList, setStudentList] = useState([]);

  const columns = [
    {
      title: "openId",
      dataIndex: "openId",
    },
    {
      title: "id",
      dataIndex: "id",
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
      dataIndex: "jobId",
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
            onClick={() => navigate("./detail/1", { state: record })}
          >
            查看学生详情
          </Button>
        </>
      ),
    },
  ];

  const fetchStudentList = async (classId) => {
    const res = await request(`scweb/class/${classId}`);
    // const res = await request(`scweb/class/${classId}?offset=${offset}&limit=${limit}`);
    setStudentList(res.data.studentList);
  }

  useEffect(() => {
    fetchStudentList(currentClass);
  }, [currentClass]);

  return (
    <StudentWrapper>
      <div className="studentSummary">
        <div className="actionHeader">
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
            dataSource={studentList}
            pagination={{ pageSize: 3 }}
          />
        </div>
      </div>
    </StudentWrapper>
  );

  function handleSearch() {}
};

export default Student;
