import React, { memo, useState } from "react";
import { QuestionContentItemWrapper } from "./style";
import { Comment, Play, PauseOne, Clear } from "@icon-park/react";
import { Statistic, Tooltip, Button, Modal } from "antd";
import { StopOutlined, DeleteTwoTone } from "@ant-design/icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  showStartModal,
  showStopModal,
  showDeleteModal,
  setCurrentQuestionItemId,
} from "../store/actionCreators";
import { useEffect } from "react";
import classNames from "classnames";

const QuestionContentItem = memo((props) => {
  console.log(props);
  const { id, title, start, finish, createTime } = props.data;
  const dispatch = useDispatch();
  const [actionList, setActionList] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const { currentQuestionItemId } = useSelector(
    (state) => state.classInteract,
    shallowEqual
  );

  useEffect(() => {
    const newActionList = [];
    if (start === 0 && finish === 0) {
      newActionList.push(
        <div className="start">
          <Tooltip title="发布题目">
            <Play
              theme="filled"
              size="32"
              fill="#6ab11a"
              onClick={handleStart}
            />
          </Tooltip>
        </div>
      );
    }

    if (start === 1 && finish !== 1) {
      newActionList.push(
        <div className="stop">
          <Tooltip title="终止互动">
            <StopOutlined
              style={{ color: "#d0021b", fontSize: 24 }}
              onClick={handleStop}
            />
          </Tooltip>
        </div>
      );
    }

    if (finish === 1) {
      newActionList.push(
        <div className="restart">
          <Button type="primary">重新发布</Button>
        </div>
      );
    }

    newActionList.push(
      <div className="deleteWrapper" onClick={handleDeleteQuestionItem}>
        <Tooltip title="删除">
          <DeleteTwoTone
            style={{
              color: "#d0021b",
              fontSize: 24,
              marginLeft: 8,
              marginTop: 4,
            }}
          />
        </Tooltip>
      </div>
    );

    setActionList(newActionList);
  }, [start, finish]);

  return (
    <QuestionContentItemWrapper
      onClick={handleQuestionItemClick}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className={classNames("", {
        active: isActive || currentQuestionItemId === id,
      })}
    >
      <div className="question-header">
        <div className="title">
          <Comment
            theme="outline"
            size="24"
            fill="#4a90e2"
            style={{ marginRight: 6 }}
          />
          <p>问答题</p>
          <div
            className="time"
            style={{ fontSize: "12", color: "#ccc", marginLeft: 20 }}
          >
            创建于：{createTime}
          </div>
        </div>
        <div className="action">
          {actionList.map((item) => {
            return item;
          })}
        </div>
      </div>
      <div className="question-content">{title}</div>
    </QuestionContentItemWrapper>
  );

  function handleStart() {
    dispatch(setCurrentQuestionItemId(id));
    dispatch(showStartModal());
  }

  function handleStop() {
    dispatch(setCurrentQuestionItemId(id));
    dispatch(showStopModal());
  }

  function handleQuestionItemClick() {
    dispatch(setCurrentQuestionItemId(id));
  }

  function handleDeleteQuestionItem() {
    setCurrentQuestionItemId(id);
    dispatch(showDeleteModal());
  }
});

export default QuestionContentItem;
