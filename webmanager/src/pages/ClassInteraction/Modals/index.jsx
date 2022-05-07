import React, { memo, useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Button, Form, Modal, notification, Input, message } from "antd";
import { useHttp } from "../../../utils/http";
import {
  hideStartModal,
  hideStopModal,
  setQuestionList,
  hideDeleteModal,
  setReplyList,
  setHasMoreList
} from "../store/actionCreators";
import { Comment } from "@icon-park/react";
import moment from "moment";
import { SmileOutlined } from "@ant-design/icons";

export default function Modals(props) {
  const { isAddModalVisible, setIsAddModalVisible, currentClass } = props;

  const [form] = Form.useForm();
  const request = useHttp();
  const dispatch = useDispatch();

  const key = `open${Date.now()}`;

  const {
    isStartModalShow,
    isStopModalShow,
    currentQuestionItemId,
    isDeleteModalShow,
  } = useSelector((state) => state.classInteract, shallowEqual);

  return (
    <>
      <Modal
        visible={isAddModalVisible}
        onOk={handleAddModalOk}
        onCancel={handleAddModalCancel}
        okText="确认"
        cancelText="取消"
      >
        <div>
          <div
            style={{
              display: "flex",
            }}
            className="question-header"
          >
            <Comment
              theme="outline"
              size="24"
              fill="#4a90e2"
              style={{ marginRight: 6 }}
            />
            <p>问答题</p>
          </div>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              label="请输入问题"
              rules={[{ required: true, message: "请输入问题" }]}
              name="questionContent"
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title="注意"
        visible={isStartModalShow}
        onOk={handleStartModalOk}
        onCancel={handleStartModalCancel}
        okText="确认发布"
        cancelText="取消发布"
      >
        <p>您即将发布题目到20级软件工程1-3班</p>
        <p>发布后学生即可开始答题</p>
      </Modal>
      <Modal
        title="注意"
        visible={isStopModalShow}
        onOk={handleStopModalOk}
        onCancel={handleStopModalCancel}
        okText="确定"
        cancelText="取消"
      >
        <p>您确定要终止此次答题吗？</p>
        <p>终止后，可重新发布该题目</p>
      </Modal>
      <Modal
        title="注意"
        visible={isDeleteModalShow}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
        okText="确认删除"
        cancelText="取消"
      >
        <p>您确定要删除该互动项吗？</p>
        <p>删除后，与之相关的所有回复记录也会被删除</p>
      </Modal>
    </>
  );

  function handleAddModalOk() {
    form.submit();
  }

  function handleAddModalCancel() {
    setIsAddModalVisible(false);
  }

  function onFinish(values) {
    console.log(values);
    request("scweb/interaction", {
      data: {
        classId: currentClass + "" || "1",
        title: values.questionContent,
        createTime: moment().format("YYYY-MM-DD HH:MM:SS"),
        type: "0",
        content: "12312",
      },
      method: "POST",
    }).then(() => {
      message.success("操作成功");
      setIsAddModalVisible(false);
      fetchInteractList();
    });
  }

  function handleStartModalOk() {
    // 发送网络请求，开始答题
    request(`scweb/interaction/operation/${currentQuestionItemId}`, {
      method: "PUT",
      data: {
        operation: 0,
      },
    })
      .then((res) => {
        console.log(res);
        message.success("题目发布成功！");
        dispatch(hideStartModal());
        fetchInteractList();
      })
      .catch((err) => {
        console.log(err);
        message.error(err);
      });
  }

  function handleStartModalCancel() {
    dispatch(hideStartModal());
  }

  function handleStopModalOk() {
    // 发送网络请求，终止答题
    request(`scweb/interaction/operation/${currentQuestionItemId}`, {
      method: "PUT",
      data: {
        operation: 2,
      },
    })
      .then((res) => {
        console.log(res);
        message.success("互动已结束！");
        dispatch(hideStopModal());
        dispatch(setHasMoreList(false, currentQuestionItemId));
        fetchInteractList();
      })
      .catch((err) => {
        console.log(err);
        message.error(err);
      });
  }

  function handleStopModalCancel() {
    dispatch(hideStopModal());
  }

  function handleDeleteModalOk() {
    request(`scweb/interaction/${currentQuestionItemId}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        openNotification();
        dispatch(hideDeleteModal());
        fetchInteractList();
      })
      .catch((err) => {
        console.log(err);
        message.error(err);
      });
  }

  function handleDeleteModalCancel() {
    dispatch(hideDeleteModal());
  }

  function openNotification() {
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => notification.close(key)}
      >
        我知道了
      </Button>
    );
    notification.open({
      description: "您发布的题目已经终止回答，快来看看答题结果吧",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      btn,
      key,
      duration: 2,
    });
  }

  async function fetchInteractList(currentClass) {
    const interactList = await request("scweb/interaction", {
      data: { classId: currentClass || 1, sort: 1 },
    });
    console.log(interactList);
    dispatch(setQuestionList(interactList.data));
  }
}
