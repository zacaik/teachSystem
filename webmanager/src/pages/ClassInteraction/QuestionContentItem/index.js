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
} from "../store/actionCreators";
import moment from "moment";
import { useEffect } from "react";

const QuestionContentItem = memo((props) => {
  // console.log(props);
  const { Countdown } = Statistic;
  const { isAutoAnswerTime, questionContent } = props.content;
  const { index } = props;
  const dispatch = useDispatch();
  const { questionList } = useSelector(
    (state) => state.classInteract,
    shallowEqual
  );
  const { remainTime, isStart, isFinished } = questionList[index];

  // useEffect(() => {
  //   setCountdownTime(time);
  // }, [isStart]);

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
          {!isAutoAnswerTime && (
            <Countdown
              value={Date.now() + remainTime}
              onChange={handleCountDownChange}
              style={{ marginRight: 10 }}
              onFinish={handleCountDownFinished}
            />
          )}
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
    <QuestionContentItemWrapper>
      <div className="question-header">
        <div className="title">
          <Comment
            theme="outline"
            size="24"
            fill="#4a90e2"
            style={{ marginRight: 6 }}
          />
          <p>问答题</p>
        </div>
        <div className="action">{renderAction()}</div>
      </div>
      <div className="question-content">{questionContent}</div>
    </QuestionContentItemWrapper>
  );

  function handleCountDownChange(number) {
    dispatch(setQuestionItemCountDownTime(index, number));
  }

  function handleStart() {
    dispatch(showStartModal());
    dispatch(setCurrentIndex(index));
  }

  function handleStop() {
    dispatch(showStopModal());
  }

  function handleCountDownFinished() {
    dispatch(setInteractIsFinished(index, true));
  }
});

export default QuestionContentItem;
