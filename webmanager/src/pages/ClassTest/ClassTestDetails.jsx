import React, { memo } from "react";
import { Table, Tag, Button, Modal, Select, Input } from "antd";
import { Column } from "@ant-design/plots";

const ClassTestDetails = memo(() => {
  const columns = [
    { title: "题目描述", dataIndex: "questionContent" },
    {
      title: "题目类型",
      dataIndex: "type",
      render: (text) => {
        if (text === 0) {
          return <Tag color="green">单选题</Tag>;
        } else if (text === 1) {
          return <Tag color="blue">多选题</Tag>;
        } else {
          return <Tag color="orange">判断题</Tag>;
        }
      },
    },
    { title: "正确答案", dataIndex: "rightAnswer" },
    {
      title: "选项",
      dataIndex: "selection",
      render: (text, record) => {
        return text?.map((item) => <div>{item}</div>);
      },
    },
    {
      title: "操作",
      render: () => (
        <>
          <Button
            type="primary"
            className="btn"
            style={{ marginRight: 10 }}
            // onClick={() => showModal(2, record)}
          >
            修改
          </Button>
          <Button
            type="danger"
            className="btn"
            // onClick={() => showModal(2, record)}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      questionContent: "以下技术栈中，不属于前端范畴的是",
      type: 0,
      rightAnswer: "A",
      selection: ["A: java", "B: javascript", "C: Node.js", "D: webpack"],
    },
    {
      key: 1,
      questionContent: "以下技术栈中，不属于前端范畴的是",
      type: 0,
      rightAnswer: "A",
      selection: ["A: java", "B: javascript", "C: Node.js", "D: webpack"],
    },
    {
      key: 1,
      questionContent: "以下技术栈中，不属于前端范畴的是",
      type: 0,
      rightAnswer: "A",
      selection: ["A: java", "B: javascript", "C: Node.js", "D: webpack"],
    },
    {
      key: 1,
      questionContent: "以下技术栈中，不属于前端范畴的是",
      type: 0,
      rightAnswer: "A",
      selection: ["A: java", "B: javascript", "C: Node.js", "D: webpack"],
    },
    {
      key: 1,
      questionContent: "以下技术栈中，不属于前端范畴的是",
      type: 0,
      rightAnswer: "A",
      selection: ["A: java", "B: javascript", "C: Node.js", "D: webpack"],
    },
    {
      key: 1,
      questionContent: "以下技术栈中，不属于前端范畴的是",
      type: 0,
      rightAnswer: "A",
      selection: ["A: java", "B: javascript", "C: Node.js", "D: webpack"],
    },
    {
      key: 1,
      questionContent: "以下技术栈中，不属于前端范畴的是",
      type: 0,
      rightAnswer: "A",
      selection: ["A: java", "B: javascript", "C: Node.js", "D: webpack"],
    },
    {
      key: 2,
      questionContent: "POST请求方式是一种安全的HTTP请求方式",
      type: 2,
      rightAnswer: "true",
      // selection: ['A: java', 'B: javascript', 'C: Node.js', "D: webpack"],
    },
  ];

  const studentColumns = [
    { title: "学生姓名", dataIndex: "name" },
    {
      title: "班级",
      dataIndex: "class",
    },
    { title: "学号", dataIndex: "id" },
    {
      title: "分数",
      dataIndex: "score",
    },
  ];

  const studentData = [
    {
      key: 1,
      name: "李俊燃",
      class: "计算机二班",
      id: "1806010228",
      score: 100,
    },
    {
      key: 2,
      name: "李俊燃",
      class: "计算机二班",
      id: "1806010228",
      score: 100,
    },
    {
      key: 3,
      name: "李俊燃",
      class: "计算机二班",
      id: "1806010228",
      score: 100,
    },
    {
      key: 3,
      name: "李俊燃",
      class: "计算机二班",
      id: "1806010228",
      score: 100,
    },
    {
      key: 3,
      name: "李俊燃",
      class: "计算机二班",
      id: "1806010228",
      score: 100,
    },
    {
      key: 3,
      name: "李俊燃",
      class: "计算机二班",
      id: "1806010228",
      score: 100,
    },
    {
      key: 3,
      name: "李俊燃",
      class: "计算机二班",
      id: "1806010228",
      score: 100,
    },
    {
      key: 3,
      name: "李俊燃",
      class: "计算机二班",
      id: "1806010228",
      score: 100,
    },
    {
      key: 3,
      name: "李俊燃",
      class: "计算机二班",
      id: "1806010228",
      score: 100,
    },
    {
      key: 3,
      name: "李俊燃",
      class: "计算机二班",
      id: "1806010228",
      score: 100,
    },
  ];

  const testData = [
    {
      score: "20分以下",
      人数: 10,
    },
    {
      score: "20-40分",
      人数: 30,
    },
    {
      score: "40-60分",
      人数: 25,
    },
    {
      score: "60-80分",
      人数: 67,
    },
    {
      score: "80-90分",
      人数: 31,
    },
    {
      score: "90分以上",
      人数: 12,
    },
  ];

  const testConfig = {
    data: testData,
    xField: "score",
    yField: "人数",
    xAxis: {
      label: {
        autoRotate: false,
      },
    },
  };

  const { Option } = Select;
  const { Search } = Input;

  return (
    <div>
      <div className="testTable">
        <div className="actionHeader">
          选择当前测验：
          <Select style={{ width: 300 }}></Select>
          <Button
            type="primary"
            style={{ margin: "10px" }}
            // onClick={() => showModal(1)}
          >
            新增题目
          </Button>
          <Button
            type="primary"
            style={{ margin: "10px" }}
            // onClick={() => showModal(1)}
          >
            发布试卷
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          style={{ marginTop: 5, marginBottom: 50 }}
          scroll={{ y: 600 }}
          pagination={false}
          title={() => "试卷题目"}
        />
      </div>
      <div
        className="testRes"
        style={{
          width: "100%",
          backgroundColor: "white",
          margin: "0 auto",
          borderRadius: 10,
          padding: 30,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="columnWrapper"
          style={{
            width: "60%",
          }}
        >
          <h3>测验成绩分段：</h3>
          <div style={{ width: "80%", margin: "20px auto" }}>
            <Column {...testConfig} />
          </div>
        </div>
        <div className="studentList" style={{ flex: 1 }}>
          <Search
            placeholder="按学号或姓名搜索学生"
            // onSearch={handleSearch}
            // onChange={handleChange}
            enterButton
            style={{ width: 250, margin: 10 }}
          />
          <Table
            columns={studentColumns}
            dataSource={studentData}
            // style={{ marginTop: 50 }}
            pagination={{ pageSize: 10 }}
            // title={() => "学生成绩列表"}
          />
        </div>
      </div>
    </div>
  );
});

export default ClassTestDetails;
