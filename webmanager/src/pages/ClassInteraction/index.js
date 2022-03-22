import React, { memo, useState } from "react";
import { InterationWrapper, QuestionItem } from "./style";
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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Comment } from "@icon-park/react";
import QuestionContentItem from "./QuestionContentItem";

const ClassInteraction = memo(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNumberInputAvailable, setisNumberInputAailable] = useState(false);
  const [form] = Form.useForm();
  const [questionList, setQuestionList] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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

  return (
    <InterationWrapper>
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
            {questionList.map((item) => (
              <QuestionContentItem content={item}></QuestionContentItem>
            ))}
          </div>
        </Card>
        <Card style={{ width: "49%" }} className="right">
          <div className="rightContent"></div>
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
            <Form.Item label="请输入答题时间" name="answerTime">
              <InputNumber addonAfter="秒" disabled={!isNumberInputAvailable} />
            </Form.Item>
            <Form.Item label="自定义答题时长" name="isAutoAnswerTime" initialValue={true}>
              <Switch onChange={hanldeSwitchChange} defaultChecked={true} />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </InterationWrapper>
  );

  function hanldeSwitchChange(selected) {
    if (selected) {
      setisNumberInputAailable(false);
    } else {
      setisNumberInputAailable(true);
    }
  }

  function onFinish(values) {
    console.log(values);
    setIsModalVisible(false);
    setQuestionList([...questionList, { type: "qa", ...values }]);
  }
});

export default ClassInteraction;
