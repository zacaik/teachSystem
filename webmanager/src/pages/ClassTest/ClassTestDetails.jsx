import React, { memo, useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Select, Input } from "antd";
import { Column } from "@ant-design/plots";
import { useHttp } from "../../utils/http";
import { useLocation } from "react-router-dom";

const ClassTestDetails = memo((props) => {
  const { currentClass } = props;
  const columns = [
    { title: "题目描述", dataIndex: "title" },
    {
      title: "题目类型",
      dataIndex: "type",
      render: (text, record) => {
        console.log(text);
        console.log(record);
        if (text === 3) {
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
      dataIndex: "optionList",
      render: (text, record) => {
        console.log(text);
        return text?.map((item) => <div>{item.content}</div>);
      },
    },
  ];

  const studentColumns = [
    { title: "学生姓名", dataIndex: "studentName" },
    {
      title: "班级",
      dataIndex: "class",
    },
    { title: "学号", dataIndex: "jobId" },
    {
      title: "分数",
      dataIndex: "score",
    },
  ];

  const { Option } = Select;
  const { Search } = Input;

  const request = useHttp();
  let location = useLocation();

  const [testList, setTestList] = useState([]);
  const [curTest, setCurTest] = useState("");
  const [curTestQuestion, setCurTestQuestion] = useState([]);
  const [curTestRes, setCurTestRes] = useState([]);
  const [testData, setTestData] = useState([]);

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

  useEffect(() => {
    getTestList();
  }, [currentClass]);

  useEffect(() => {
    curTest && getTestContent();
  }, [curTest]);

  useEffect(() => {
    setCurTest(location.state.id);
  }, []);

  return (
    <div>
      <div className="testTable">
        <div className="actionHeader" style={{ margin: 10 }}>
          选择当前测验：
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
        <Table
          columns={columns}
          dataSource={curTestQuestion}
          style={{ marginTop: 5, marginBottom: 50 }}
          scroll={{ y: 600 }}
          pagination={false}
          title={() => "试卷题目"}
          rowKey={(record) => record.id}
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
            dataSource={curTestRes}
            pagination={{ pageSize: 10 }}
            rowKey={(record) => record.id}
          />
        </div>
      </div>
    </div>
  );

  function getTestList() {
    request("scweb/schoolClassTest", {
      data: { classId: currentClass },
    }).then((res) => setTestList(res.data));
  }

  function getTestContent() {
    request(`scweb/schoolClassTest/${curTest}`).then((res) => {
      const data = [];
      res.data.examPaperVO.jsonContent.multipleQuestionList.forEach((item) => {
        handleTestItemData(item, data, 1);
      });
      res.data.examPaperVO.jsonContent.trueOrFalseQuestionList.forEach(
        (item) => {
          handleTestItemData(item, data, 2);
        }
      );
      res.data.examPaperVO.jsonContent.singleQuestionList.forEach((item) => {
        handleTestItemData(item, data, 3);
      });
      setCurTestQuestion(data);
      setCurTestRes(res.data.testReportVOList);
      setTestData(handleTestScore(res.data.scoreIntervalMap));
    });
  }

  function handleTestItemData(item, data, type) {
    let rightAnswer = null;
    item.optionList.forEach((item) => {
      if (item.right === 1) {
        rightAnswer = item.content;
      }
    });
    data.push({
      title: item.testItem.title,
      optionList: item.optionList,
      id: item.testItem.id,
      type,
      rightAnswer,
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

export default ClassTestDetails;
