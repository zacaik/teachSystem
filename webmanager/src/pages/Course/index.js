import React, { memo, useState, useEffect } from "react";
import { Table, Button, Modal, message } from "antd";
import { CourseWrapper } from "./style";
import { useSelector, shallowEqual } from "react-redux";
import { useHttp } from "../../utils/http";

const Course = memo(() => {
  const columns = [
    {
      title: "课程名称",
      // key: "name",
      dataIndex: "name",
      render: (text) => <a onClick={(e) => e.defaultPrevented()}>{text}</a>,
    },
    {
      title: "课程号",
      // key: "accessCode",
      dataIndex: "accessCode",
    },
    {
      title: "上课时间",
      // key: "startWeek",
      dataIndex: "startWeek",
      render: (text) => `第${text}周`,
    },
    {
      title: "结课时间",
      // key: "endWeek",
      dataIndex: "endWeek",
      render: (text) => `第${text}周`,
    },
    {
      title: "上课教室",
      // key: "address",
      dataIndex: "address",
    },
    {
      title: "学生人数",
      // key: "studentCount",
      dataIndex: "studentCount",
      render: (text) => `${text}人`,
    },
    {
      title: "操作",
      // key: "action",
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
            <Button type="primary" danger onClick={() => showModal(3, record)}>
              删除
            </Button>
          </>
        );
      },
    },
  ];

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [curClass, setCurClass] = useState({});

  const request = useHttp();

  const { user } = useSelector((state) => state.user, shallowEqual);

  useEffect(async () => {
    const res = await request(`scweb/class/list/${user.id || 277}`);
    setCourseList(res.data);
  }, [user.id]);

  const showModal = (type, record) => {
    setCurClass(record);
    switch (type) {
      case 1:
        setIsAddModalVisible(true);
        break;
      case 2:
        setIsEditModalVisible(true);
        break;
      case 3:
        setIsDeleteModalVisible(true);
        break;
      default:
        break;
    }
  };

  const handleOk = (type) => {
    switch (type) {
      case 1:
        setIsAddModalVisible(false);
        break;
      case 2:
        setIsEditModalVisible(false);
        break;
      case 3:
        handleDeleteCourse();
        setIsDeleteModalVisible(false);
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
      default:
        break;
    }
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
        rowKey={record => record.id}
      />
      <Modal
        title="新增课程"
        visible={isAddModalVisible}
        onOk={() => handleOk(1)}
        onCancel={() => handleCancel(1)}
      >
        {/* <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
      </Modal>
      <Modal
        title="编辑课程"
        visible={isEditModalVisible}
        onOk={() => handleOk(2)}
        onCancel={() => handleCancel(2)}
      >
        {/* <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
      </Modal>
      <Modal
        title="删除课程"
        visible={isDeleteModalVisible}
        onCancel={() => handleCancel(3)}
        footer={[
          <Button onClick={() => handleCancel(3)}>取消</Button>,
          <Button onClick={() => handleOk(3)} type="primary">
            确定
          </Button>,
        ]}
      >
        <p>你确定要删除{curClass.name}吗？</p>
      </Modal>
    </CourseWrapper>
  );

  function handleDeleteCourse() {
    request(`scweb/class/${curClass.id}`, { method: "DELETE" })
      .then(() => {
        message.success("删除成功");
      })
      .catch((err) => {
        message.error(err);
      });
  }
});

export default Course;
