import React, { memo, useState } from "react";
import { QuestionContentItemWrapper } from "./style";
import { Comment, Play, PauseOne, Clear } from "@icon-park/react";
import { Statistic, Tooltip, Progress, Modal } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { showStartModal } from '../store/actionCreators';
import moment from "moment";
import { useEffect } from "react";

const QuestionContentItem = memo((props) => {
  // console.log(props);
  const { Countdown } = Statistic;
  const time = 60 * 1000;
  const [countdownTime, setCountdownTime] = useState(time);
  const [percent, setPercent] = useState(100);
  const [isStart, setIsStart] = useState(false);
  const dispatch = useDispatch();
  // const res = useSelector((state) => state.classInteract, shallowEqual);
  // console.log(res);

  useEffect(() => {
      setCountdownTime(time);
  }, [isStart]);

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
        <div className="action">
          {isStart ? (
            <div className="stop">
              <Countdown
                value={Date.now() + countdownTime}
                onChange={handleCountDownChange}
                style={{ marginRight: 10 }}
              />
              <Tooltip title="终止互动">
                <Progress
                  type="circle"
                  width={34}
                  percent={percent}
                  strokeColor="#d0021b"
                  format={() => (
                    <StopOutlined style={{ color: "#d0021b", fontSize: 24 }} onClick={handleStop} />
                  )}
                />
              </Tooltip>
            </div>
          ) : (
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
          )}
        </div>
      </div>
      <div className="question-content">{props.content.questionContent}</div>
    </QuestionContentItemWrapper>
  );

  function handleCountDownChange(number) {
    setCountdownTime(number);
    const num = (number / time) * 100;
    setPercent(num.toFixed(0));
  }

  function handleStart() {
    dispatch(showStartModal())
    // setIsStart(true);
    // 向服务端发送请求，答题开始
  }

  function handleStop() {
    setIsStart(false);
  }

  // function countDown() {
  //   console.log(countdownTime);
  //   let clear = setInterval(() => {
  //     if (countdownTime > 0) {
  //       setCountdownTime((countdownTime) => countdownTime - 10);
  //     }
  //   }, 10);
  //   setClear(clear);
  // }
});

export default QuestionContentItem;
