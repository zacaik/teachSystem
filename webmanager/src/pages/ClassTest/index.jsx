import React, { memo, useEffect, useState } from "react";
import { ClassTestWrapper } from "./style";
import {
  Table,
  Tag,
  Upload,
  Button,
  message,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../utils/http";
import { UploadOutlined } from "@ant-design/icons";
import _ from "lodash";

const ClassTest = memo((props) => {
  const { currentClass } = props;

  const navigate = useNavigate();
  const request = useHttp();
  const [form] = Form.useForm();

  const [categoryList, setCategoryList] = useState([]);
  const [testList, setTestList] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [curCate, setCurCate] = useState(null);

  useEffect(() => {
    getCategory();
  }, [currentClass]);

  const columns = [
    { title: "章节Id", dataIndex: "id" },
    { title: "章节名称", dataIndex: "name" },
    { title: "测验次数", dataIndex: "testNumber" },
    { title: "最近一次测验时间", dataIndex: "testTime" },
    {
      title: "操作",
      render: (text, record) => (
        <a onClick={() => handleTestClick(record)}>发布随机测验</a>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    const { id } = record;
    const data = [];
    testList[id].finishList.forEach((item) => {
      data.push({ ...item, status: 2 });
    });
    testList[id].notStartList.forEach((item) => {
      data.push({ ...item, status: 0 });
    });
    testList[id].startingList.forEach((item) => {
      data.push({ ...item, status: 1 });
    });

    const columns = [
      { title: "测验名称", dataIndex: "name" },
      { title: "测验时间", dataIndex: "startTime" },
      { title: "题目数", dataIndex: "questionCount" },
      {
        title: "测验状态",
        dataIndex: "status",
        render: (text) => {
          if (text === 0) {
            return <Tag color="green">未开始</Tag>;
          } else if (text === 1) {
            return <Tag color="blue">进行中</Tag>;
          } else {
            return <Tag color="orange"> 已结束</Tag>;
          }
        },
      },
      {
        title: "操作",
        key: "operation",
        render: (text, record) => (
          <a onClick={() => navigate("./detail/1", { state: record })}>
            查看测验详情
          </a>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.id}
      />
    );
  };

  const uploadProps = {
    name: "file",
    action: `http://124.221.127.152:6680/scweb/category/?classId=${currentClass}`,
    accept: ".xls,.xlsx",
    headers: {
      authorization: localStorage.getItem("__auth-provider-token__"),
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success("题库导入成功");
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <ClassTestWrapper>
      <div className="actionHeader" style={{ marginTop: 15 }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} type="primary">
            导入题库
          </Button>
        </Upload>
      </div>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={categoryList}
        pagination={{ pageSize: 8 }}
        style={{ marginTop: 20 }}
        rowKey={(record) => record.id}
      />
      <Modal
        title="生成随机测验"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form}>
          <Form.Item name="name" label="测验名称">
            <Input />
          </Form.Item>
          <Form.Item name="startTime" label="开始时间">
          <DatePicker showTime />
          </Form.Item>
          <Form.Item name="lastTime" label="测验时长">
            <InputNumber min={0} addonAfter="min" />
          </Form.Item>
          <Form.Item name="singleChoice" label="单选题数量">
            <InputNumber min={0} addonAfter="个" />
          </Form.Item>
          <Form.Item name="multipleChoice" label="多选题数量">
            <InputNumber min={0} addonAfter="个" />
          </Form.Item>
          <Form.Item name="trueOrFalse" label="判断题数量">
            <InputNumber min={0} addonAfter="个" />
          </Form.Item>
        </Form>
      </Modal>
    </ClassTestWrapper>
  );

  function getCategory() {
    request(`scweb/category`, {
      method: "GET",
      data: { classId: currentClass },
    }).then((res) => {
      setCategoryList(
        res.data.map((item) => {
          return item.category;
        })
      );
      const testList = {};
      res.data.forEach((item) => {
        const id = item.category.id;
        testList[id] = item.sortedSchoolClassTestMapByCategoryId;
      });
      setTestList(testList);
    });
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  function handleOk() {
    const value = form.getFieldsValue(true);
    console.log(curCate);
    request(
      `scweb/schoolClassTest?singleChoice=${value.singleChoice}&multipleChoice=${value.multipleChoice}&trueOrFalse=${value.trueOrFalse}`,
      {
        data: _.omit(
          {
            ...value,
            startTime: value.startTime.format("YYYY-MM-DD HH:mm:ss"),
            classId: currentClass,
            categoryId: curCate?.id,
          },
          ["singleChoice", "multipleChoice", "trueOrFalse"]
        ),
        method: "POST",
      }
    )
      .then(() => {
        message.success("发布成功");
        setIsModalVisible(false);
      })
      .catch((err) => {
        message.error(err);
        setIsModalVisible(false);
      });
  }

  function handleTestClick(record) {
    setCurCate(record);
    setIsModalVisible(true);
  }
});

export default ClassTest;
