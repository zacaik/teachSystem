import React, { memo, useEffect, useState } from "react";
import { BriefWrapper } from "./style";
import { Select, Card, Button, Statistic, Table } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { http } from "../../utils/http";
import { Pie, Column, Bar } from "@ant-design/plots";

const Brief = memo(() => {
  const { Option } = Select;

  const [classList, setClassList] = useState([]);
  const [studentSummary, setStudentSummary] = useState({});

  const getData = async () => {
    const classlist = await http("classList", {});
    const studentSummary = await http("getStudentSummary", {});
    setStudentSummary(studentSummary);
    setClassList(classlist);
  };

  useEffect(() => {
    getData();
  }, []);

  const genderData = [
    {
      type: "男生",
      value: studentSummary?.male,
    },
    {
      type: "女生",
      value: studentSummary?.female,
    },
  ];

  const studentData = [
    {
      type: "一班人数",
      value: studentSummary?.classOne,
    },
    {
      type: "二班人数",
      value: studentSummary?.classTow,
    },
    {
      type: "三班人数",
      value: studentSummary?.classThree,
    },
  ];

  const config = {
    appendPadding: 0,
    padding: [0, 100, 0, 0],
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  const attendanceData = [
    {
      type: "已签到",
      date: "3-1",
      value: 108,
    },
    {
      type: "已签到",
      date: "3-7",
      value: 104,
    },
    {
      type: "已签到",
      date: "3-14",
      value: 99,
    },
    {
      type: "已签到",
      date: "3-21",
      value: 100,
    },
    {
      type: "已签到",
      date: "3-28",
      value: 110,
    },
    {
      type: "已签到",
      date: "4-4",
      value: 112,
    },
    {
      type: "未签到",
      date: "3-1",
      value: 12,
    },
    {
      type: "未签到",
      date: "3-7",
      value: 16,
    },
    {
      type: "未签到",
      date: "3-14",
      value: 21,
    },
    {
      type: "未签到",
      date: "3-21",
      value: 20,
    },
    {
      type: "未签到",
      date: "3-28",
      value: 10,
    },
    {
      type: "未签到",
      date: "4-4",
      value: 8,
    },
  ];

  const attendanceConfig = {
    data: attendanceData,
    width: 1000,
    xField: "date",
    yField: "value",
    seriesField: "type",
    isPercent: true,
    isStack: true,
    label: {
      position: "middle",
      content: (item) => {
        return item.value.toFixed(2);
      },
      style: {
        fill: "#fff",
      },
    },
    scrollbar: {
      type: "horizontal",
    },
  };

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

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "学号",
      dataIndex: "studentId",
    },
    {
      title: "未打卡次数",
      dataIndex: "absentNumber",
    },
  ];

  const absentData = [
    {
      key: "1",
      name: "李俊燃",
      studentId: "1806010228",
      absentNumber: 10,
    },
    {
      key: "1",
      name: "李俊燃",
      studentId: "1806010228",
      absentNumber: 9,
    },
    {
      key: "1",
      name: "李俊燃",
      studentId: "1806010228",
      absentNumber: 8,
    },
    {
      key: "1",
      name: "李俊燃",
      studentId: "1806010228",
      absentNumber: 7,
    },
    {
      key: "1",
      name: "李俊燃",
      studentId: "1806010228",
      absentNumber: 6,
    },
    {
      key: "1",
      name: "李俊燃",
      studentId: "1806010228",
      absentNumber: 5,
    },
  ];

  const qaData = [
    {
      date: "3-1",
      "参与度": 0.93,
    },
    {
      date: "3-7",
      "参与度": 0.87,
    },
    {
      date: "3-14",
      "参与度": 0.96,
    },
    {
      date: "3-21",
      "参与度": 0.67,
    },
    {
      date: "3-28",
      "参与度": 0.78,
    },
    {
      date: "4-4",
      "参与度": 0.97,
    },
  ];
  const qaConfig = {
    data: qaData,
    xField: "参与度",
    yField: "date",
    yAxis: {
      label: {
        autoRotate: false,
      },
    },
    scrollbar: {
      type: 'vertical',
    },
  };

  return (
    <BriefWrapper>
      {classList.length && (
        <Card bordered={false} style={{ width: "40%" }} className="classSelect">
          <Button type="primary" style={{ marginRight: "20px" }}>
            选择班级
          </Button>
          <Select
            defaultValue={classList[0]}
            style={{ width: 300 }}
            onChange={handleChange}
          >
            {classList.map((item) => {
              return (
                <Option value={item} key={item}>
                  {item}
                </Option>
              );
            })}
          </Select>
        </Card>
      )}
      <Card
        title="班级人数概况"
        style={{ width: "100%" }}
        className="class-summary"
      >
        <div className="gender-proportion">
          <div className="static-number">
            <Statistic
              title="男生人数"
              value={studentSummary.male}
              prefix={<TeamOutlined />}
              className="static-number-item"
            />
            <Statistic
              title="女生人数"
              value={studentSummary.female}
              prefix={<TeamOutlined />}
              className="static-number-item"
            />
          </div>
          <div className="pieWrapper">
            <Pie {...config} data={genderData} />
          </div>
        </div>
        <div className="studentNumber">
          <div className="static-number">
            <Statistic
              title="班级总人数"
              value={studentSummary.sum}
              prefix={<TeamOutlined />}
              className="static-number-item"
            />
            <Statistic
              title="二班人数"
              value={studentSummary.classTow}
              prefix={<TeamOutlined />}
              className="static-number-item"
            />
            <Statistic
              title="三班人数"
              value={studentSummary.classThree}
              className="static-number-item"
              prefix={<TeamOutlined />}
            />
            <Statistic
              title="一班人数"
              value={studentSummary.classOne}
              className="static-number-item"
              prefix={<TeamOutlined />}
            />
          </div>
          <div className="pieWrapper">
            <Pie {...config} data={studentData} />
          </div>
        </div>
      </Card>
      <Card
        className="attendanceSummary"
        title="学生出勤概况"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <div className="columnWrapper" style={{ width: "70%" }}>
          <Column {...attendanceConfig} />
        </div>
        <div className="topAbsentStudent">
          <Table
            columns={columns}
            dataSource={absentData}
            bordered
            pagination={false}
            title={() => "缺勤排行榜"}
          />
        </div>
      </Card>
      <Card
        className="testSummary"
        title="成绩概况"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <div className="columnWrapper" style={{ width: "40%" }}>
          <h3 class="test-title">知识测验成绩分段：</h3>
          <div className="selecter-wrapper">
            <div className="selecter-item">
              选择课程：
              <Select defaultValue={classList[0]} style={{ width: 200 }}>
                {classList.map((item) => {
                  return (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="selecter-item">
              选择测验：
              <Select defaultValue={classList[0]} style={{ width: 200 }}>
                {classList.map((item) => {
                  return (
                    <Option value={item} key={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            </div>
          </div>
          <Column {...testConfig} />
        </div>
        <div className="qaBarWrapper" style={{ width: "40%" }}>
          <h3 class="test-title">课堂参与度统计：</h3>
          <div className="selecter-item">
            选择课程：
            <Select defaultValue={classList[0]} style={{ width: 200 }}>
              {classList.map((item) => {
                return (
                  <Option value={item} key={item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </div>
          <Bar {...qaConfig} />
        </div>
      </Card>
    </BriefWrapper>
  );

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
});

export default Brief;
