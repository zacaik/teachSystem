import React, { memo, useEffect, useState } from "react";
import { InteractionWrapper, QuestionItem } from "./style";
import {
  Button,
  Card,
  Menu,
  Dropdown,
  Modal,
  Input,
  InputNumber,
  Switch,
  Form,
  message,
  notification,
} from "antd";
import { PlusOutlined, SmileOutlined } from "@ant-design/icons";
import { Comment } from "@icon-park/react";
import QuestionContentItem from "./QuestionContentItem";
import QaAnswerItem from './QaAnswerItem';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  showStartModal,
  hideStartModal,
  setInteractIsStart,
  hideStopModal,
  setInteractIsFinished,
  setQuestionList,
  getInteractList
} from "./store/actionCreators";

const ClassInteraction = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  // const [questionList, setQuestionList] = useState([]);
  const { isStartModalShow, isStopModalShow, questionList, currentIndex } =
    useSelector((state) => state.classInteract, shallowEqual);
  const dispatch = useDispatch();
  const key = `open${Date.now()}`;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(getInteractList())
  }, []);

  const openNotification = () => {
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
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <QuestionItem onClick={showModal}>
          <Comment theme="outline" size="24" fill="#4a90e2" />
          <p>问答题</p>
        </QuestionItem>
      </Menu.Item>
    </Menu>
  );

  // useEffect(() => {
  //   if (questionList[currentIndex] && questionList[currentIndex].isFinished) {
  //     openNotification();
  //   }
  // }, [currentIndex, questionList]);

  // useEffect(() => {
  //   // 组件卸载时清空状态
  //   return () => {
  //     dispatch(setInteractIsFinished(false));
  //     // notification.close(key);
  //   };
  // }, []);

  return (
    <InteractionWrapper>
      <div className="interactHeader">
        <div className="leftHeader">
          <p style={{ marginLeft: 10 }}>提问区</p>
          <Dropdown overlay={menu} arrow trigger={["click"]}>
            <Button type="primary" className="btn">
              <PlusOutlined />
              新建问题
            </Button>
          </Dropdown>
        </div>
        <div className="rightHeader">
          <p style={{ marginLeft: 20 }}>回答区</p>
        </div>
      </div>
      <div className="interactContent">
        <Card style={{ width: "49%" }} className="left">
          <div className="leftContent">
            {questionList.map((item, index) => (
              <QuestionContentItem
                content={item}
                key={index}
                index={index}
              ></QuestionContentItem>
            ))}
          </div>
        </Card>
        <Card style={{ width: "49%" }} className="right">
          <div className="rightContent">

          </div>
        </Card>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
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
    </InteractionWrapper>
  );

  function onFinish(values) {
    console.log(values);
    setIsModalVisible(false);
    dispatch(
      setQuestionList([
        {
          type: "qa",
          isStart: false,
          isFinished: false,
          ...values,
        },
      ])
    );
  }

  function handleStartModalOk() {
    // 发送网络请求，开始答题
    dispatch(hideStartModal());
    dispatch(setInteractIsStart(currentIndex, true));
    message.success("题目发布成功！");
  }

  function handleStartModalCancel() {
    dispatch(hideStartModal());
  }

  function handleStopModalOk() {
    // 发送网络请求，终止答题
    dispatch(hideStopModal());
    dispatch(setInteractIsFinished(currentIndex, true));
    openNotification();
  }

  function handleStopModalCancel() {
    dispatch(hideStopModal());
  }
});

export default ClassInteraction;
