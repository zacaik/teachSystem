import React, { memo, useEffect, useState } from "react";
import { Drawer, Select, Tag, Statistic, Progress, Table } from "antd";
import { useHttp } from "../../utils/http";
import { useNavigate } from "react-router-dom";

const CheckDetails = memo((props) => {
  const { visible, setVisible, curClass } = props;

  const request = useHttp();
  const navigate = useNavigate();
  const { Option } = Select;
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "学号",
      dataIndex: "id",
    },
    {
      title: "班级",
      dataIndex: "belongClass",
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <>
            <a
              className="btn"
              onClick={() => navigate(`../student/detail/${record.id}`, { state: record })}
            >
              查看学生详情
            </a>
          </>
        );
      },
    },
  ];

  const [checkList, setCheckList] = useState([]);
  const [curCheck, setCurCheck] = useState(null);
  const [checkDetail, setCheckDetail] = useState(null);

  useEffect(() => {
    curClass?.id && getCheckList();
  }, [curClass?.id]);

  useEffect(() => {
    setCurCheck(checkList[0]?.id);
  }, [checkList]);

  useEffect(() => {
    curCheck && getCheckDetail();
  }, [curCheck]);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Drawer
        title={
          <>
            <Tag color="blue" style={{ fontSize: 18 }}>
              {curClass?.name}
            </Tag>
            签到记录
          </>
        }
        placement="right"
        onClose={onClose}
        visible={visible}
        width={550}
      >
        <div className="select">
          选择签到记录：
          <Select
            value={curCheck}
            style={{ width: 300 }}
            onChange={handleChange}
          >
            {checkList.map((item) => {
              return (
                <Option value={item.id} key={item.id}>
                  {item.startTime}
                </Option>
              );
            })}
          </Select>
        </div>
        <div
          className="checkContent"
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-around",
            width: 400,
          }}
        >
          <div
            className="checkNumber"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Statistic title="未签到人数" value={checkDetail?.missingStudentList.length} />
          </div>
          <div className="checkProgress">
            <Progress
              type="circle"
              percent={Number(checkDetail?.checkInPercentage.split(".")[0])}
              format={(percent) => `${percent}% 已签到`}
              width={200}
            />
          </div>
        </div>
        <div className="checkTable">
          <Table
            title={() => <h2>未签到学生列表</h2>}
            style={{ marginTop: 30 }}
            columns={columns}
            dataSource={checkDetail?.missingStudentList}
            pagination={{ pageSize: 8 }}
            rowKey={(record) => record.id}
          />
        </div>
      </Drawer>
    </>
  );

  function getCheckList() {
    request(`scweb/checkIn/${curClass?.id}`).then((res) => {
      setCheckList(res.data);
    });
  }

  function handleChange(value) {
    setCurCheck(value);
  }

  function getCheckDetail() {
    request(`scweb/checkIn/detail?checkInInfoId=${curCheck}`).then((res) => {
      console.log(res);
      setCheckDetail(res.data);
    });
  }
});

export default CheckDetails;
