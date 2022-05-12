import React, { memo, useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  message,
  Form,
  Input,
  InputNumber,
  TimePicker,
  Space,
} from "antd";
import { CourseWrapper } from "./style";
import { useSelector, shallowEqual } from "react-redux";
import { useHttp } from "../../utils/http";
import CheckDetails from "./CheckDetails";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import _ from "lodash";
import moment from "moment";

const Course = memo(() => {
  const columns = [
    {
      title: "课程名称",
      dataIndex: "name",
      render: (text) => <a onClick={(e) => e.defaultPrevented()}>{text}</a>,
    },
    {
      title: "课程号",
      dataIndex: "accessCode",
    },
    {
      title: "开课时间",
      dataIndex: "startWeek",
      render: (text) => `第${text}周`,
    },
    {
      title: "结课时间",
      dataIndex: "endWeek",
      render: (text) => `第${text}周`,
    },
    {
      title: "上课时间",
      dataIndex: "strSchoolClassTimeList",
      render: (timeList) => {
        return timeList.map((item) => {
          return <div key={item}>{item}</div>;
        });
      },
    },
    {
      title: "上课教室",
      dataIndex: "address",
    },
    {
      title: "学生人数",
      dataIndex: "studentCount",
      render: (text) => `${text}人`,
    },
    {
      title: "操作",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <>
            <Button
              type="primary"
              className="btn"
              onClick={() => showModal(2, record)}
            >
              修改
            </Button>
            <Button type="primary" className="btn">
              导出成绩
            </Button>
            <Button
              type="primary"
              danger
              className="btn"
              onClick={() => showModal(3, record)}
            >
              删除
            </Button>
            <Button
              type="primary"
              className="btn"
              onClick={() => showModal(4, record)}
            >
              开启签到
            </Button>
            <a
              className="btn"
              onClick={() => {
                setDrawerVisible(true);
                setCurClass(record);
              }}
            >
              查看签到详情
            </a>
          </>
        );
      },
    },
  ];

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isCheckModalVisible, setIsCheckModalVisible] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [curClass, setCurClass] = useState({});
  const [checkLastTime, setCheckLastTime] = useState(0);
  const [checkStartTime, setCheckStartTime] = useState("");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [curClassTimeList, setCurClassTimeList] = useState([]);
  const [classTimeMoment, setClassTimeMoment] = useState({});

  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const request = useHttp();

  const { user } = useSelector((state) => state.user, shallowEqual);

  useEffect(async () => {
    getData();
  }, [user.id]);

  useEffect(() => {
    setCurClassTimeList(curClass.schoolClassTimeList || []);
  }, [curClass]);

  const showModal = (type, record) => {
    switch (type) {
      case 1:
        setCurClass({});
        setIsAddModalVisible(true);
        break;
      case 2:
        setCurClass(record);
        setIsEditModalVisible(true);
        break;
      case 3:
        setCurClass(record);
        setIsDeleteModalVisible(true);
        break;
      case 4:
        setCurClass(record);
        setIsCheckModalVisible(true);
        break;
      default:
        break;
    }
  };

  const handleOk = (type) => {
    switch (type) {
      case 1:
        handleAddCourse();
        setIsAddModalVisible(false);
        break;
      case 2:
        handleEditCourse();
        setIsEditModalVisible(false);
        break;
      case 3:
        handleDeleteCourse();
        setIsDeleteModalVisible(false);
        break;
      case 4:
        handleStartCheck();
        setIsCheckModalVisible(false);
        break;
      default:
        break;
    }
  };

  const handleCancel = (type) => {
    switch (type) {
      case 1:
        setIsAddModalVisible(false);
        break;
      case 2:
        setIsEditModalVisible(false);
        break;
      case 3:
        setIsDeleteModalVisible(false);
        break;
      case 4:
        setIsCheckModalVisible(false);
        break;
      default:
        break;
    }
  };

  const renderForm = (form, initialValues) => {
    return (
      <Form form={form} initialValues={initialValues}>
        <Form.Item name="name" label="课程名称">
          <Input />
        </Form.Item>
        <Form.Item name="startWeek" label="开课时间">
          <InputNumber min={1} max={22} addonBefore="第" addonAfter="周" />
        </Form.Item>
        <Form.Item name="endWeek" label="结课时间">
          <InputNumber min={1} max={22} addonBefore="第" addonAfter="周" />
        </Form.Item>
        <Form.Item name="address" label="上课地点">
          <Input />
        </Form.Item>
        <>
          上课时间：
          {curClassTimeList.map(({ id }) => {
            const curItem = curClassTimeList.find((item) => item.id === id);
            return (
              <Space
                key={id}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <InputNumber
                  min={1}
                  max={22}
                  addonBefore="星期"
                  value={curItem.weekDay}
                  onChange={(value) => {
                    console.log(value);
                    const newClassTimeList = [...curClassTimeList];
                    newClassTimeList.forEach((item) => {
                      if (item.id === curItem.id) {
                        item.weekDay = value;
                      }
                    });
                    setCurClassTimeList(newClassTimeList);
                  }}
                />
                <TimePicker.RangePicker
                  onChange={(value) => {
                    const startTime = value[0].format("HH:mm");
                    const endTime = value[1].format("HH:mm");
                    const newClassTimeList = [...curClassTimeList];
                    newClassTimeList.forEach((item) => {
                      if (item.id === curItem.id) {
                        item.startTime = startTime;
                        item.endTime = endTime;
                      }
                    });
                    setCurClassTimeList(newClassTimeList);
                    const newClassTimeMoment = { ...classTimeMoment };
                    newClassTimeMoment[curItem.id] = value;
                    setClassTimeMoment(newClassTimeMoment);
                  }}
                  defaultValue={[
                    moment(curItem.startTime, "HH:mm"),
                    moment(curItem.endTime, "HH:mm"),
                  ]}
                  format={"HH:mm"}
                />
                <MinusCircleOutlined
                  onClick={() => {
                    const newClassTimeList = curClassTimeList.filter((item) => {
                      return item.id !== id;
                    });
                    setCurClassTimeList(newClassTimeList);
                  }}
                />
              </Space>
            );
          })}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => {
                setCurClassTimeList([
                  ...curClassTimeList,
                  {
                    id: Math.random(),
                    classId: curClass.id,
                    startTime: "00:00",
                    endTime: "00:00",
                    weekDay: 1,
                  },
                ]);
              }}
              block
              icon={<PlusOutlined />}
            >
              新增上课时间
            </Button>
          </Form.Item>
        </>
      </Form>
    );
  };

  return (
    <CourseWrapper>
      <div className="actionWrapper">
        <Button
          type="primary"
          style={{ marginBottom: "10px" }}
          onClick={() => showModal(1)}
        >
          新增课程
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={courseList}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record.id}
      />
      <Modal
        title="新增课程"
        visible={isAddModalVisible}
        onCancel={() => handleCancel(1)}
        onOk={() => handleOk(1)}
        okText="确定"
        cancelText="取消"
      >
        {renderForm(addForm, curClass)}
      </Modal>
      <Modal
        title="编辑课程"
        visible={isEditModalVisible}
        onCancel={() => handleCancel(2)}
        onOk={() => handleOk(2)}
        okText="确定"
        cancelText="取消"
      >
        {renderForm(editForm, curClass)}
      </Modal>
      <Modal
        title="删除课程"
        visible={isDeleteModalVisible}
        onCancel={() => handleCancel(3)}
        onOk={() => handleOk(3)}
        okText="确定"
        cancelText="取消"
      >
        <p>你确定要删除{curClass.name}吗？</p>
      </Modal>
      <Modal
        title="开启签到"
        visible={isCheckModalVisible}
        onCancel={() => handleCancel(4)}
        onOk={() => handleOk(4)}
        cancelText="取消"
        okText="确定"
      >
        <p>当前开启签到课程：{curClass.name}</p>
        <div className="startTime">
          选择签到开始时间：
          <TimePicker
            format={"HH:mm"}
            onChange={(value) => {
              console.log(value.format("YYYY-MM-DD HH:mm:ss"));
              setCheckStartTime(value.format("YYYY-MM-DD HH:mm:ss"));
            }}
          />
        </div>
        <div className="lastTime" style={{ marginTop: 10 }}>
          输入签到持续时间：
          <InputNumber
            min={0}
            addonAfter="min"
            onChange={(value) => {
              setCheckLastTime(value);
            }}
          />
        </div>
      </Modal>
      <CheckDetails
        visible={drawerVisible}
        setVisible={setDrawerVisible}
        curClass={curClass}
      />
    </CourseWrapper>
  );

  async function getData() {
    const res = await request(`scweb/class/list/${user.id || 277}`);
    setCourseList(res.data);
  }

  function handleDeleteCourse() {
    request(`scweb/class/${curClass.id}`, { method: "DELETE" })
      .then(() => {
        message.success("删除成功");
        getData();
      })
      .catch((err) => {
        message.error(err);
      });
  }

  async function handleEditCourse() {
    const value = editForm.getFieldsValue(true);
    const originClassTimeList = curClass?.schoolClassTimeList;
    const originIdList = originClassTimeList.map((item) => item.id);
    const curIdList = curClassTimeList.map((item) => item.id);
    const addList = curClassTimeList.filter((item) => {
      return !originIdList.includes(item.id);
    });
    const delList = originIdList.filter((id) => {
      return !curIdList.includes(id);
    });
    const editList = curClassTimeList.filter((item) => {
      return originIdList.includes(item.id);
    });
    try {
      await request(`scweb/class`, {
        method: "PUT",
        data: _.pick({ ...value, schoolClassTimeList: editList }, [
          "id",
          "teacherId",
          "teacherName",
          "name",
          "startWeek",
          "endWeek",
          "address",
          "schoolClassTimeList",
        ]),
        isBody: true,
      });
      addList.map(async (item) => {
        await request(`scweb/schoolClassTime`, {
          method: "POST",
          data: _.omit(item, ["id"]),
        });
      });
      // addList.length > 0 &&
      //   (await request(`scweb/schoolClassTime`, {
      //     method: "PUT",
      //     data: _.omit({ ...value, schoolClassTimeList: editList }, attrArr),
      //     isBody: true,
      //   }));
      delList.length > 0 &&
        (await request(`scweb/schoolClassTime/deleteBatch`, {
          method: "POST",
          data: delList,
        }));
      message.success("更新成功");
      getData();
    } catch (err) {
      message.error(err);
    }
  }

  function handleAddCourse() {
    const value = addForm.getFieldsValue(true);
    request(`scweb/class`, {
      data: {
        ...value,
        teacherId: user.id,
        teacherName: user.name,
        schoolClassTimeList: curClassTimeList.map((item) =>
          _.omit(item, ["id", "classId"])
        ),
      },
      method: "POST",
    })
      .then(() => {
        message.success("添加成功");
        getData();
      })
      .catch((err) => {
        message.error(err);
      });
  }

  function handleStartCheck() {
    request(`scweb/checkIn`, {
      data: {
        classId: curClass?.id,
        type: "0",
        startTime: checkStartTime,
        lastTime: checkLastTime,
      },
      method: "POST",
    })
      .then(() => {
        message.success("开启打卡成功");
      })
      .catch((err) => {
        message.error(err);
      });
  }
});

export default Course;
