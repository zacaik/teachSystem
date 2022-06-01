import React, { useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Card } from "antd";
import QuestionContentItem from "../QuestionContentItem";
import { useHttp } from "../../../utils/http";
import {
  setQuestionList,
  setReplyList,
  setIntervalAction,
  setHasMoreList,
} from "../store/actionCreators";

export default function QuestionContainer(props) {
  const { currentClass } = props;
  const request = useHttp();
  const dispatch = useDispatch();

  const { questionList, fetchReplyListIntervals } = useSelector(
    (state) => state.classInteract,
    shallowEqual
  );

  const fetchInteractList = async (currentClass) => {
    const interactList = await request("scweb/interaction", {
      data: { classId: currentClass, sort: 1 },
    });
    dispatch(setQuestionList(interactList.data));
  };

  useEffect(() => {
    fetchInteractList(currentClass);
  }, [currentClass]);

  useEffect(() => {
    questionList.forEach((item) => {
      if (
        item.start === 1 &&
        item.finish !== 1 &&
        fetchReplyListIntervals[item.id] == undefined
      ) {
        const interval = setInterval(async () => {
          const replyList = await request(`scweb/replay/${item.id}`);
          dispatch(setReplyList(replyList.data, item.id));
        }, 1000 * 30);
        dispatch(setIntervalAction(interval, item.id));
        dispatch(setHasMoreList(true, item.id));
      }
      if (item?.finish === 1) {
        clearInterval(fetchReplyListIntervals[item.id]);
      }
      if (item.start === 0 && item.finish === 0) {
        dispatch(setHasMoreList(false, item.id));
      }
    });
  }, [questionList, fetchReplyListIntervals]);

  return (
    <Card style={{ width: "49%" }} className="left">
      <div className="leftContent">
        {questionList.map((item) => {
          return (
            <QuestionContentItem
              data={item}
              key={item.id}
            ></QuestionContentItem>
          );
        })}
      </div>
    </Card>
  );
}
