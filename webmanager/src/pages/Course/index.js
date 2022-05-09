import React, { memo, useState, useEffect } from "react";
import { Table, Button, Modal, message, Form, Input, InputNumber } from "antd";
import { CourseWrapper } from "./style";
import { useSelector, shallowEqual } from "react-redux";
import { useHttp } from "../../utils/http";

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
      title: "上课时间",
      dataIndex: "startWeek",
      render: (text) => `第${text}周`,
    },
    {
      title: "结课时间",
      dataIndex: "endWeek",
      render: (text) => `第${text}周`,
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
            <Button type="primary" danger onClick={() => showModal(3, record)}>
              删除
            </Button>
          </>
        );
      },
    },
  ];

  const formItemLayout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [curClass, setCurClass] = useState({});

  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const request = useHttp();

  const { user } = useSelector((state) => state.user, shallowEqual);

  useEffect(async () => {
    getData();
  }, [user.id]);

  const showModal = (type, record) => {
    switch (type) {
      case 1:
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
        rowKey={(record) => record.id}
      />
      <Modal
        title="新增课程"
        visible={isAddModalVisible}
        footer={[
          <Button onClick={() => handleCancel(1)}>取消</Button>,
          <Button onClick={() => handleOk(1)} type="primary">
            确定
          </Button>,
        ]}
      >
        <Form form={addForm}>
          <Form.Item
            name="name"
            label="课程名称"
            rules={[
              {
                required: true,
                message: "请输入课程名称",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="startTime"
            label="上课时间"
            rules={[
              {
                required: true,
                message: "请输入课程名称",
              },
            ]}
          >
            <InputNumber min={1} max={22} addonBefore="第" addonAfter="周" />
          </Form.Item> */}
          <Form.Item
            name="startWeek"
            label="开课时间"
            rules={[
              {
                required: true,
                message: "请输入开课时间",
              },
            ]}
          >
            <InputNumber min={1} max={22} addonBefore="第" addonAfter="周" />
          </Form.Item>
          <Form.Item
            name="endWeek"
            label="结课时间"
            rules={[
              {
                required: true,
                message: "请输入结课时间",
              },
            ]}
          >
            <InputNumber min={1} max={22} addonBefore="第" addonAfter="周" />
          </Form.Item>
          <Form.Item
            name="address"
            label="上课地点"
            rules={[
              {
                required: true,
                message: "请输入上课地点",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="编辑课程"
        visible={isEditModalVisible}
        footer={[
          <Button onClick={() => handleCancel(2)}>取消</Button>,
          <Button onClick={() => handleOk(2)} type="primary">
            确定
          </Button>,
        ]}
      >
        <Form form={editForm} initialValues={curClass}>
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
        </Form>
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

  function handleEditCourse() {
    const value = editForm.getFieldsValue(true);
    request(`scweb/class`, { method: "PUT", data: { ...value }, isBody: true })
      .then(() => {
        message.success("修改成功");
        getData();
      })
      .catch((err) => {
        message.error(err);
      });
  }

  function handleAddCourse() {
    const value = addForm.getFieldsValue(true);
    request(`scweb/class`, {
      data: {
        ...value,
        teacherId: user.id,
        teacherName: user.name,
        startTime: 14,
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
});

export default Course;
