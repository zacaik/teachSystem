import React, { memo } from "react";
import { useLocation } from "react-router-dom";
import { DetailWrapper } from "./style";
import { Descriptions, Card, Table, Tag } from "antd";
import { Pie, Line, Column } from "@ant-design/plots";

const StudentDetail = memo(() => {
  let location = useLocation();
  let data = location.state;
  console.log(data);

  const pieData = [
    {
      type: "签到",
      value: 91,
    },
    {
      type: "未签到",
      value: 9,
    },
  ];
  const pieConfig = {
    appendPadding: 0,
    padding: [0, 100, 0, 0],
    data: pieData,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-50%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 16,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  const lineData = [
    {
      index: "第一章",
      得分: 100,
    },
    {
      index: "第二章",
      得分: 90,
    },
    {
      index: "第三章",
      得分: 60,
    },
    {
      index: "第四章",
      得分: 0,
    },
    {
      index: "第五章",
      得分: 70,
    },
    {
      index: "第六章",
      得分: 60,
    },
    {
      index: "第七章",
      得分: 100,
    },
  ];
  const lineConfig = {
    data: lineData,
    xField: "index",
    yField: "得分",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };

  const columnData = [
    {
      "上课时间": '3-1',
      number: 6,
      type: "回答的问题"
    },
    {
      "上课时间": '3-7',
      number: 6,
      type: "回答的问题"
    },
    {
      "上课时间": '3-15',
      number: 6,
      type: "回答的问题"
    },
    {
      "上课时间": '3-21',
      number: 6,
      type: "回答的问题"
    },
    {
      "上课时间": '3-28',
      number: 6,
      type: "回答的问题"
    },
    {
      "上课时间": '4-5',
      number: 6,
      type: "回答的问题"
    },
    {
      "上课时间": '3-1',
      number: 1,
      type: "没有回答的问题"
    },
    {
      "上课时间": '3-7',
      number: 1,
      type: "没有回答的问题"
    },
    {
      "上课时间": '3-15',
      number: 1,
      type: "没有回答的问题"
    },
    {
      "上课时间": '3-21',
      number: 1,
      type: "没有回答的问题"
    },
    {
      "上课时间": '3-28',
      number: 1,
      type: "没有回答的问题"
    },
    {
      "上课时间": '4-5',
      number: 1,
      type: "没有回答的问题"
    },
  ];
  const columnConfig = {
    data: columnData,
    xField: '上课时间',
    yField: 'number',
    seriesField: 'type',
    isPercent: true,
    isStack: true,
    label: {
      position: 'middle',
      content: (item) => {
        return item.number.toFixed(2);
      },
      style: {
        fill: '#fff',
      },
    },
    scrollbar: {
      type: "horizontal",
    },
  };

  return (
    <DetailWrapper>
      <Card title="学生基本信息" style={{ width: "100%", marginTop: "20px" }}>
        <Descriptions bordered>
          <Descriptions.Item label="姓名">李俊燃</Descriptions.Item>
          <Descriptions.Item label="性别">男</Descriptions.Item>
          <Descriptions.Item label="年龄">21</Descriptions.Item>
          <Descriptions.Item label="学号">1806010228</Descriptions.Item>
          <Descriptions.Item label="openId">84523</Descriptions.Item>
          <Descriptions.Item label="班级">18级计算机二班</Descriptions.Item>
        </Descriptions>
      </Card>
      <Card
        title="学生出勤统计"
        style={{
          width: "100%",
          marginTop: "20px",
        }}
      >
        <div
          className="cardWrapper"
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Descriptions bordered style={{ width: "60%" }} column={5}>
            <Descriptions.Item label="3-1">
              <Tag color="green">出勤</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="3-8">
              <Tag color="green">出勤</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="3-15">
              <Tag color="red">缺课</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="3-21">
              <Tag color="green">出勤</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="3-28">
              <Tag color="green">出勤</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="4-5">
              <Tag color="red">缺课</Tag>
            </Descriptions.Item>
          </Descriptions>
          <div className="pieWrapper" style={{ width: 300, height: 200 }}>
            <Pie {...pieConfig} />
          </div>
        </div>
      </Card>
      <Card
        title="学生课堂表现统计"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <h3 style={{ marginBottom: "20px"}}>知识测验成绩</h3>
        <Line {...lineConfig} />
        <h3 style={{ marginBottom: "20px", marginTop: "50px"}}>课堂互动情况</h3>
        <Column {...columnConfig} />
      </Card>
    </DetailWrapper>
  );
});

export default StudentDetail;
