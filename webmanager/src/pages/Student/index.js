import React, { useEffect, useState } from "react";
import { StudentWrapper } from "./style";
import { Button, Input, Table, message, Modal, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../utils/http";
import _ from "lodash";

const Student = (props) => {
  const { currentClass } = props;
  console.log(currentClass);
  const { Search } = Input;
  const debounced = _.debounce(handleSearch, 500);
  const columns = [
    {
      title: "openId",
      dataIndex: "openId",
    },
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: (text) => {
        return text === 0 ? "男" : "女";
      },
    },
    {
      title: "班级",
      dataIndex: "belongClass",
    },
    {
      title: "学号",
      dataIndex: "jobId",
    },
    {
      title: "操作",
      key: "action",
      dataIndex: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            className="btn"
            onClick={() => navigate("./detail/1", { state: record })}
          >
            查看学生详情
          </Button>
          <Button
            type="danger"
            className="btn"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setCurStudent(record);
              setIsDeleteModalVisible(true);
            }}
          >
            移除学生
          </Button>
        </>
      ),
    },
  ];
  const navigate = useNavigate();
  const request = useHttp();
  const [form] = Form.useForm();
  const [studentList, setStudentList] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [curStudent, setCurStudent] = useState(null);

  const fetchStudentList = async (classId) => {
    const res = await request(`scweb/class/${classId}`);
    setStudentList(res.data.studentList);
  };

  const handleDeletCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const handleDeletOk = () => {
    request(`scweb/subscriber/deleteBatch?classId=${currentClass}`, {
      data: [curStudent.id],
      method: "POST",
    }).then((res) => {
      console.log(res);
      message.success("移除成功");
      fetchStudentList(currentClass);
    }).catch((err) => {
      message.error(err);
    });
    setIsDeleteModalVisible(false);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const handleAddOk = () => {
    const id = form.getFieldsValue(true).id;
    request(`scweb/subscriber?studentJobId=${id}&classId=${currentClass}`, {
      method: "POST",
    }).then((res) => {
      console.log(res);
      message.success("添加成功");
      fetchStudentList(currentClass);
    }).catch(() => {
      message.error("添加失败，该学生不存在");
    });
    setIsAddModalVisible(false);
  };

  useEffect(() => {
    fetchStudentList(currentClass);
  }, [currentClass]);

  return (
    <StudentWrapper>
      <div className="studentSummary">
        <div className="actionHeader">
          <div className="search">
            <Search
              placeholder="按学号或姓名搜索学生"
              onSearch={handleSearch}
              onChange={handleChange}
              enterButton
              style={{ width: 250, margin: 10 }}
            />
          </div>
          <Button
            type="primary"
            style={{ marginTop: "10px" }}
            onClick={() => {
              setIsAddModalVisible(true);
            }}
          >
            添加学生
          </Button>
        </div>
        <div className="tableWrapper">
          <Table
            columns={columns}
            dataSource={studentList}
            pagination={{ pageSize: 10 }}
            rowKey={(record) => record.id}
          />
        </div>
      </div>
      <Modal
        title="移除学生"
        visible={isDeleteModalVisible}
        onCancel={handleDeletCancel}
        footer={[
          <Button onClick={handleDeletCancel} key="cancel">取消</Button>,
          <Button onClick={handleDeletOk} type="primary" key="ok">
            确定
          </Button>,
        ]}
      >
        <p>你确定要将{curStudent?.name}移除课程吗？</p>
        <p>移除后，该学生无法参与当前课程的课堂互动，测验以及打卡等活动</p>
      </Modal>
      <Modal
        title="添加学生"
        visible={isAddModalVisible}
        onCancel={handleAddCancel}
        footer={[
          <Button onClick={handleAddCancel} key="cancel">取消</Button>,
          <Button onClick={handleAddOk} type="primary" key="ok">
            确定
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            name="id"
            label="学生学号"
            rules={[
              {
                required: true,
                message: "请输入学生学号",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </StudentWrapper>
  );

  function handleChange(e) {
    debounced(e.target.value);
  }

  async function handleSearch(value) {
    if (!value) {
      fetchStudentList(currentClass);
      return;
    }
    if (isNaN(Number(value))) {
      const res = await request(`scweb/student/list`, {
        data: { name: value },
      });
      if (res.data) {
        setStudentList(res.data);
      } else {
        setStudentList([]);
      }
    } else {
      const res = await request(`scweb/student/single`, {
        data: { jobId: value },
      });
      if (res.data) {
        setStudentList(res.data);
      } else {
        setStudentList([]);
      }
    }
    message.success("查询成功");
  }
};

export default Student;
