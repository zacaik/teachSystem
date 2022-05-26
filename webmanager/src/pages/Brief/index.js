import React, { memo, useEffect, useState } from "react";
import { BriefWrapper } from "./style";
import { Select, Card, Statistic, Table, Progress } from "antd";
import { useSelector, shallowEqual } from "react-redux";
import {
  TeamOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { useHttp } from "../../utils/http";
import { Pie, Column, G2 } from "@ant-design/plots";
import { useNavigate } from "react-router-dom";

const Brief = memo((props) => {
  const navigate = useNavigate();
  const request = useHttp();
  const { currentClass } = props;
  const { Option } = Select;
  const G = G2.getEngine("canvas");

  const [classSummary, setClassSummary] = useState(null);
  const [curTest, setCurTest] = useState("");
  const [testData, setTestData] = useState([]);
  const [testList, setTestList] = useState([]);

  const getData = async () => {
    const res = await request(`scweb/overview?classId=${currentClass}`);
    setClassSummary(res.data);
  };

  useEffect(() => {
    currentClass && getData();
    currentClass && getTestList();
  }, [currentClass]);

  useEffect(() => {
    curTest && getTestRes();
  }, [curTest]);


  const genderData = [
    {
      sex: "男",
      sold: classSummary?.maleCount,
    },
    {
      sex: "女",
      sold: classSummary?.femaleCount,
    },
  ];

  const genderConfig = {
    appendPadding: 10,
    data: genderData,
    angleField: "sold",
    colorField: "sex",
    radius: 0.66,
    color: ["#1890ff", "#f04864"],
    label: {
      content: (obj) => {
        const group = new G.Group({});
        group.addShape({
          type: "image",
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            img:
              obj.sex === "男"
                ? "https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png"
                : "https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png",
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: 20,
            y: 54,
            text: obj.sex,
            textAlign: "center",
            textBaseline: "top",
            fill: obj.sex === "男" ? "#1890ff" : "#f04864",
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  const attendanceConfig = {
    data: handleCheckInData(),
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
      render: (text, record) => (
        <a
          onClick={() =>
            navigate(`../student/detail/${record.id}`, { state: record })
          }
        >
          {text}
        </a>
      ),
    },
    {
      title: "学号",
      dataIndex: "jobId",
    },
    {
      title: "未打卡次数",
      dataIndex: "absentNumber",
    },
  ];

  return (
    <BriefWrapper>
      <Card
        title="班级人数概况"
        style={{ width: "100%" }}
        className="class-summary"
      >
        <div className="gender-proportion">
          <div className="static-number">
            <Statistic
              title="男生人数"
              value={classSummary?.maleCount}
              prefix={<TeamOutlined />}
              className="static-number-item"
              key={"male"}
            />
            <Statistic
              title="女生人数"
              value={classSummary?.femaleCount}
              prefix={<TeamOutlined />}
              className="static-number-item"
              key={"female"}
            />
          </div>
          <div className="pieWrapper">
            <Pie {...genderConfig} />
          </div>
        </div>
        <div className="studentNumber">
          <div className="static-number">
            <Statistic
              title="班级总人数"
              value={classSummary?.femaleCount + classSummary?.maleCount}
              prefix={<TeamOutlined />}
              className="static-number-item"
              key={"all"}
            />
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
            dataSource={handleUnCheckedStudentData()}
            bordered
            pagination={{ pageSize: 5 }}
            title={() => "缺勤排行榜"}
          />
        </div>
      </Card>
      <Card
        className="testSummary"
        title="成绩概况"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <div className="columnWrapper" style={{ width: "60%" }}>
          <h3 className="test-title">知识测验成绩分段：</h3>
          <div className="selecter-wrapper">
            <div className="selecter-item">
              选择测验：
              <Select
                style={{ width: 300 }}
                value={curTest}
                onChange={(value) => {
                  setCurTest(value);
                }}
              >
                {testList.map((item) => {
                  return <Option value={item.id}>{item.name}</Option>;
                })}
              </Select>
            </div>
          </div>
          <Column {...testConfig} />
        </div>
        <div className="qaWrapper" style={{ width: "30%" }}>
          <h3 className="qaTitle">课堂互动统计：</h3>
          <Statistic
            title="总互动次数"
            value={classSummary?.totalInterCount}
            className="qaItem"
          />
          <Statistic
            title="有效互动人次"
            value={classSummary?.totalReplayCount}
            prefix={<TeamOutlined />}
            className="qaItem"
          />
          <div className="trend qaItem">
            <Statistic
              title="有效互动占比"
              value={Number(classSummary?.goodInterPercentage.split("%")[0])}
              formatter={(value) => {
                return <Progress type="circle" percent={value} />;
              }}
            />
            <Statistic
              title="周同比"
              value={classSummary?.weekComparePercentage}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              style={{ marginTop: 40, marginLeft: 20 }}
            />
          </div>
        </div>
      </Card>
    </BriefWrapper>
  );

  function handleCheckInData() {
    const res = [];
    if (!classSummary?.sortedCheckInCountMap) {
      return res;
    }
    const dateArr = Object.keys(classSummary?.sortedCheckInCountMap);
    dateArr.forEach((item) => {
      res.push({
        type: "已签到",
        date: item,
        value:
          Number(classSummary?.sortedCheckInCountMap[item].split("%")[0]) / 100,
      });
    });
    dateArr.forEach((item) => {
      res.push({
        type: "未签到",
        date: item,
        value:
          1 -
          Number(classSummary?.sortedCheckInCountMap[item].split("%")[0]) / 100,
      });
    });
    return res;
  }

  function handleUnCheckedStudentData() {
    if (!classSummary?.rankMap) {
      return [];
    }
    const numArr = Object.keys(classSummary?.rankMap);
    const res = [];
    numArr.forEach((num) => {
      classSummary?.rankMap[num].forEach((item) => {
        res.push({ ...item, absentNumber: num, key: item.id });
      });
    });
    return res;
  }

  function getTestList() {
    request("scweb/schoolClassTest", {
      data: { classId: currentClass },
    }).then((res) => {
      setTestList(res.data);
      setCurTest(res.data[0].id);
    });
  }

  function getTestRes() {
    request(`scweb/schoolClassTest/${curTest}`).then((res) => {
      setTestData(handleTestScore(res.data.scoreIntervalMap));
    });
  }

  function handleTestScore(map) {
    return [
      {
        score: "20分以下",
        人数: map[0],
      },
      {
        score: "20-40分",
        人数: map[1],
      },
      {
        score: "40-60分",
        人数: map[2],
      },
      {
        score: "60-80分",
        人数: map[3],
      },
      {
        score: "80-90分",
        人数: map[4],
      },
      {
        score: "90分以上",
        人数: map[5],
      },
    ];
  }
});

export default Brief;
