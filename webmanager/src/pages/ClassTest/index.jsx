import React, { memo } from "react";
import { ClassTestWrapper } from "./style";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const ClassTest = memo((props) => {
  const { currentClass } = props;

  const navigate = useNavigate();

  const columns = [
    { title: "章节Id", dataIndex: "id" },
    { title: "章节名称", dataIndex: "name" },
    { title: "测验次数", dataIndex: "testNumber" },
    { title: "最近一次测验时间", dataIndex: "testTime" },
    {
      title: "操作",
      render: () => (
        <>
          <a style={{ marginRight: 10 }}>查看测验详情</a>
          <a>发布随机测验</a>
        </>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      id: 12,
      name: "第一章 认识操作系统",
      testNumber: 3,
      testTime: "2022/05/06 16:00",
    },
    {
      key: 2,
      id: 12,
      name: "第一章 认识操作系统",
      testNumber: 3,
      testTime: "2022/05/06 16:00",
    },
    {
      key: 3,
      id: 12,
      name: "第一章 认识操作系统",
      testNumber: 3,
      testTime: "2022/05/06 16:00",
    },
    {
      key: 4,
      id: 12,
      name: "第一章 认识操作系统",
      testNumber: 3,
      testTime: "2022/05/06 16:00",
    },
    {
      key: 5,
      id: 12,
      name: "第一章 认识操作系统",
      testNumber: 3,
      testTime: "2022/05/06 16:00",
    },
  ];

  const expandedRowRender = (props) => {
    console.log(props);
    const columns = [
      { title: "测验名称", dataIndex: "name" },
      { title: "测验时间", dataIndex: "startTime" },
      { title: "题目数", dataIndex: "questionCount" },
      {
        title: "测验状态",
        dataIndex: "status",
        render: (text) => {
          if (text === "进行中") {
            return <Tag color="green">进行中</Tag>;
          } else if (text === "未开始") {
            return <Tag color="blue">未开始</Tag>;
          } else {
            return <Tag color="orange"> 已结束</Tag>;
          }
        },
      },
      {
        title: "操作",
        key: "operation",
        render: (text, record) => (
          <a onClick={() => navigate("./detail/1", { state: record })}>
            查看测验详情
          </a>
        ),
      },
    ];

    const data = [
      {
        key: 1,
        name: "第一章随堂测验01",
        questionCount: 3,
        startTime: "2022/05/06 16:00",
        status: "进行中",
      },
      {
        key: 12,
        name: "第一章随堂测验02",
        questionCount: 4,
        startTime: "2022/05/06 16:00",
        status: "未开始",
      },
      {
        key: 13,
        name: "第一章随堂测验03",
        questionCount: 3,
        startTime: "2022/05/06 16:00",
        status: "已结束",
      },
    ];
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  return (
    <ClassTestWrapper>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
        pagination={{ pageSize: 8 }}
        style={{ marginTop: 20 }}
      />
    </ClassTestWrapper>
  );
});

export default ClassTest;
