import React, { memo, useEffect, useState } from "react";
import { BriefWrapper } from "./style";
import { Select, Card, Button, Statistic, Row, Col } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import { http } from "../../utils/http";
import { Pie } from "@ant-design/plots";

const Brief = memo(() => {
  const { Option } = Select;

  const [classList, setClassList] = useState([]);

  const getData = async () => {
    const res = await http("classList", {});
    setClassList(res);
    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);

  const genderData = [
    {
      type: "男生",
      value: 65,
    },
    {
      type: "女生",
      value: 35,
    },
  ];

  const studentData = [
    {
      type: "一班人数",
      value: 56,
    },
    {
      type: "二班人数",
      value: 45,
    },
    {
      type: "三班人数",
      value: 35,
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
              value={80}
              prefix={<TeamOutlined />}
              className="static-number-item"
            />
            <Statistic
              title="女生人数"
              value={40}
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
              value={128}
              prefix={<TeamOutlined />}
              className="static-number-item"
            />
            <Statistic
              title="二班人数"
              value={28}
              prefix={<TeamOutlined />}
              className="static-number-item"
            />
            <Statistic
              title="三班人数"
              value={28}
              className="static-number-item"
              prefix={<TeamOutlined />}
            />
            <Statistic
              title="一班人数"
              value={28}
              className="static-number-item"
              prefix={<TeamOutlined />}
            />
          </div>
          <div className="pieWrapper">
            <Pie {...config} data={studentData} />
          </div>
        </div>
      </Card>
    </BriefWrapper>
  );

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
});

export default Brief;
