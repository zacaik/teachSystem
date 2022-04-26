import React, { memo, useEffect, useState } from "react";
import { AnswerItemWrapper } from "./style";
import { Comment, Tooltip, Avatar } from "antd";
import moment from "moment";

const ReplyItem = memo((props) => {
  const { content, name, createTime, avatarUrl } = props.data;
  // console.log(props);
  return (
    <AnswerItemWrapper>
      <Comment
        author={<a>{name}</a>}
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={<p>{content}</p>}
        datetime={
          <span>{createTime}</span>
        }
      />
    </AnswerItemWrapper>
  );
});

export default ReplyItem;
