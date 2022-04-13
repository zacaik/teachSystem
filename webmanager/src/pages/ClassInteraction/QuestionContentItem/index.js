import React, { memo, useState } from "react";
import { QuestionContentItemWrapper } from "./style";
import { Comment, Play, PauseOne, Clear } from "@icon-park/react";
import { Statistic, Tooltip, Button, Modal } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  showStartModal,
  showStopModal,
  setInteractIsFinished,
  setQuestionItemCountDownTime,
  setCurrentIndex,
  setCurrentQuestionItemId,
} from "../store/actionCreators";
import moment from "moment";
import { useEffect } from "react";

const QuestionContentItem = memo((props) => {
  // console.log(props);;
  const { id, title, isStart, isFinished, createTime } = props.data;
  const dispatch = useDispatch();

  const renderAction = () => {
    if (!isStart) {
      return (
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

    if (isStart && !isFinished) {
      return (
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

    if (isFinished) {
      return (
        <div className="restart">
          <Button type="primary">重新发布</Button>
        </div>
      );
    }
  };

  return (
    <QuestionContentItemWrapper onClick={handleQuestionItemClick}>
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
        <div className="action">{renderAction()}</div>
      </div>
      <div className="question-content">{title}</div>
    </QuestionContentItemWrapper>
  );

  function handleStart() {
    dispatch(showStartModal());
    dispatch(setCurrentQuestionItemId(id));
  }

  function handleStop() {
    dispatch(showStopModal());
  }

  function handleQuestionItemClick() {
    dispatch(setCurrentQuestionItemId(id));
  }
});

export default QuestionContentItem;
