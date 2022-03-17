import React, { memo, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import { CourseWrapper } from "./style";

const Course = memo(() => {
  const columns = [
    {
      title: "课程名称",
      key: "name",
      dataIndex: "name",
      render: (text) => <a onClick={(e) => e.defaultPrevented()}>{text}</a>,
    },
    {
      title: "课程号",
      key: "curriculumId",
      dataIndex: "curriculumId",
    },
    {
      title: "上课时间",
      key: "curriculumTime",
      dataIndex: "curriculumTime",
    },
    {
      title: "上课教室",
      key: "classroom",
      dataIndex: "classroom",
    },
    {
      title: "学生人数",
      key: "studentNumber",
      dataIndex: "studentNumber",
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
      render: (text, record) => (
        <>
          <Button type="primary" className="btn" onClick={() => showModal(2)}>
            修改
          </Button>
          <Button type="primary" className="btn">
            导出成绩
          </Button>
          <Button type="primary" danger onClick={() => showModal(3)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  const data = [
    {
      name: "软件开发环境1-3班",
      curriculumId: 81420,
      curriculumTime: "9-16周",
      classroom: "致用106",
      studentNumber: "106人",
    },
    {
      name: "软件开发环境1-3班",
      curriculumId: 81420,
      curriculumTime: "9-16周",
      classroom: "致用106",
      studentNumber: "106人",
    },
    {
      name: "软件开发环境1-3班",
      curriculumId: 81420,
      curriculumTime: "9-16周",
      classroom: "致用106",
      studentNumber: "106人",
    },
    {
      name: "软件开发环境1-3班",
      curriculumId: 81420,
      curriculumTime: "9-16周",
      classroom: "致用106",
      studentNumber: "106人",
    },
  ];

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const showModal = (type) => {
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
        setIsDeleteModalVisible(false);
        success();
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

  function success () {
    message.success('删除成功');

  }

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
      <Table columns={columns} dataSource={data} />
      <Modal
        title="新增课程"
        visible={isAddModalVisible}
        onOk={() => handleOk(1)}
        onCancel={() => handleCancel(1)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Modal
        title="编辑课程"
        visible={isEditModalVisible}
        onOk={() => handleOk(2)}
        onCancel={() => handleCancel(2)}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Modal
        title="删除课程"
        visible={isDeleteModalVisible}
        footer={[
          <Button onClick={() => handleCancel(3)}>
            取消
          </Button>,
          <Button onClick={() => handleOk(3)} type="primary">确定</Button>,
        ]}
      >
        <p>你确定要删除该课程吗？这会导致该课程的所有学生信息删除</p>
      </Modal>
    </CourseWrapper>
  );
});

export default Course;
