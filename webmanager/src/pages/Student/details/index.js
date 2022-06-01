import React, { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DetailWrapper } from "./style";
import { Descriptions, Card, message, Tag } from "antd";
import { Pie, Line, Column } from "@ant-design/plots";
import { useHttp } from "../../../utils/http";

const StudentDetail = memo((props) => {
  const { currentClass } = props;
  let location = useLocation();
  let student = location.state;
  const request = useHttp();
  const [studentDetail, setStudentDetail] = useState(null);

  useEffect(() => {
    request("scweb/student/single", {
      data: {
        classId: currentClass,
        id: student.id,
      },
    })
      .then((res) => {
        console.log(res);
        setStudentDetail(res.data);
      })
      .catch((err) => {
        message.error(err);
      });
  }, []);

  const pieConfig = {
    appendPadding: 0,
    padding: [0, 100, 0, 0],
    data: handleCheckPercent(),
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

  const lineConfig = {
    data: handleTestData(),
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

  const columnConfig = {
    data: handleInteractionData(),
    xField: "上课时间",
    yField: "number",
    seriesField: "type",
    isPercent: true,
    isStack: true,
    label: {
      position: "middle",
      content: (item) => {
        return item.number.toFixed(2);
      },
      style: {
        fill: "#fff",
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
          <Descriptions.Item label="姓名">
            {studentDetail?.student.name}
          </Descriptions.Item>
          <Descriptions.Item label="性别">
            {studentDetail?.student.sex == 0 ? "男" : "女"}
          </Descriptions.Item>
          <Descriptions.Item label="学号">
            {studentDetail?.student.jobId}
          </Descriptions.Item>
          <Descriptions.Item label="openId">
            {studentDetail?.student.openId}
          </Descriptions.Item>
          <Descriptions.Item label="班级">
            {studentDetail?.student.belongClass}
          </Descriptions.Item>
          <Descriptions.Item label="年级">
            {studentDetail?.student.grade}
          </Descriptions.Item>
          <Descriptions.Item label="邮箱">
            {studentDetail?.student.email}
          </Descriptions.Item>
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
            {studentDetail?.checkInResultMap &&
              Object.keys(studentDetail?.checkInResultMap).map((item) => {
                return (
                  <Descriptions.Item label={item} key={item}>
                    <Tag
                      color={
                        studentDetail?.checkInResultMap[item] === "出勤"
                          ? "green"
                          : "red"
                      }
                    >
                      {studentDetail?.checkInResultMap[item]}
                    </Tag>
                  </Descriptions.Item>
                );
              })}
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
        <h3 style={{ marginBottom: "20px" }}>知识测验成绩</h3>
        <Line {...lineConfig} />
        <h3 style={{ marginBottom: "20px", marginTop: "50px" }}>
          课堂互动情况
        </h3>
        <Column {...columnConfig} />
      </Card>
    </DetailWrapper>
  );

  function handleCheckPercent() {
    console.log(studentDetail?.checkInResultMap);
    if (studentDetail) {
      const checkArr = Object.keys(studentDetail?.checkInResultMap);
      let checked = 0;
      checkArr.forEach((item) => {
        if (studentDetail?.checkInResultMap[item] === "出勤") {
          checked++;
        }
      });
      return [
        {
          type: "出勤",
          value: (checked / checkArr.length).toFixed(2) * 100,
        },
        {
          type: "缺勤",
          value: (1 - checked / checkArr.length).toFixed(2) * 100,
        },
      ];
    } else {
      return [];
    }
  }

  function handleTestData() {
    if (studentDetail) {
      return studentDetail.testReportVOList.map((item) => {
        return {
          index: item.schoolClassTestName.name,
          得分: item.score,
        };
      });
    } else {
      return [];
    }
  }

  function handleInteractionData() {
    if (studentDetail) {
      const interactionArr = Object.keys(studentDetail.interactionStatisticMap);
      const already = interactionArr.map((item) => {
        return {
          上课时间: item,
          number: studentDetail.interactionStatisticMap[item].actualCount,
          type: "回答的问题",
        };
      });
      const miss = interactionArr.map((item) => {
        return {
          上课时间: item,
          number:
            studentDetail.interactionStatisticMap[item].shouldCount -
            studentDetail.interactionStatisticMap[item].actualCount,
          type: "没有回答的问题",
        };
      });
      return [...already, ...miss];
    } else {
      return [];
    }
  }
});

export default StudentDetail;
