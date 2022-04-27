import React, { memo, useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Button, Card } from "antd";
import QuestionContentItem from "../QuestionContentItem";
import { useHttp } from "../../../utils/http";
import { setQuestionList } from "../store/actionCreators";

export default function QuestionContainer(props) {
  const { currentClass } = props;
  const request = useHttp();
  const dispatch = useDispatch();

  const { questionList } = useSelector(
    (state) => state.classInteract,
    shallowEqual
  );

  const fetchInteractList = async (currentClass) => {
    const interactList = await request("scweb/interaction", {
      data: { classId: currentClass || 1, sort: 1 },
    });
    console.log(interactList);
    dispatch(setQuestionList(interactList.data));
  };

  useEffect(() => {
    fetchInteractList(currentClass);
  }, [currentClass]);

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
