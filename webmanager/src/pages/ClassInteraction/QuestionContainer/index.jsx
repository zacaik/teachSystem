import React, { memo, useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Button, Card } from "antd";
import QuestionContentItem from "../QuestionContentItem";
import "./index.less";

export default function QuestionContainer() {
  const { questionList } = useSelector(
    (state) => state.classInteract,
    shallowEqual
  );

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
