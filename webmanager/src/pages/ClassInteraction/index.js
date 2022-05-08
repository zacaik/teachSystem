import React, { memo, useState } from "react";
import { InteractionWrapper, QuestionItem } from "./style";
import {
  Button,
  Menu,
  Dropdown,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Comment } from "@icon-park/react";
import QuestionContainer from "./QuestionContainer";
import ReplyContainer from './ReplyContainer';
import Modals from "./Modals";

const ClassInteraction = memo((props) => {
  const { currentClass } = props;

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item>
        <QuestionItem onClick={showAddModal}>
          <Comment theme="outline" size="24" fill="#4a90e2" />
          <p>问答题</p>
        </QuestionItem>
      </Menu.Item>
    </Menu>
  );

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
        <QuestionContainer />
        <ReplyContainer />
      </div>
      <Modals
        isAddModalVisible={isAddModalVisible}
        setIsAddModalVisible={setIsAddModalVisible}
        currentClass={currentClass}
      />
    </InteractionWrapper>
  );

  function showAddModal() {
    setIsAddModalVisible(true);
  }
});

export default ClassInteraction;
