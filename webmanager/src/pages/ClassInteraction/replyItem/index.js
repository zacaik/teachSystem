import React, { memo, useEffect, useState } from "react";
import { AnswerItemWrapper } from "./style";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";

const ReplyItem = memo((props) => {
  const { content } = props.data;
  return (
    <AnswerItemWrapper>
      <Comment
        author={<a>Han Solo</a>}
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={<p>{content}</p>}
        datetime={
          <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
            <span>{moment().fromNow()}</span>
          </Tooltip>
        }
      />
    </AnswerItemWrapper>
  );
});

export default ReplyItem;
