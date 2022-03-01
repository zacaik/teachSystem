import React, { memo } from "react";
import { HeaderWrapper } from "./style";
import { Avatar } from "antd";

export default memo(function MyHeader() {
  return (
    <HeaderWrapper>
      <div className="right">
        <div className="user">
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} className="avatar">凡</Avatar>
          <p className="userName">欢迎您，{'刘'}老师</p>
        </div>
      </div>
    </HeaderWrapper>
  );
});
