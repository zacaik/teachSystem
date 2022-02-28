import React, { memo } from "react";
import { HeaderWrapper } from "./style";

import { Input } from "antd";
import icon1 from "../../assets/img/icon1.png";
import icon2 from "../../assets/img/icon2.png";
import { Avatar, Image } from "antd";

export default memo(function MyHeader() {
  const { Search } = Input;

  const onSearch = (value) => console.log(value);

  return (
    <HeaderWrapper>
      <Search
        placeholder="查找项目/员工"
        onSearch={onSearch}
        enterButton
        className="search"
      />
      <div className="right">
        <div className="hint">
          <img src={icon1} alt="" />
          <div className="point red"></div>
        </div>
        <div className="message">
          <img src={icon2} alt="" />
          <div className="point green"></div>
        </div>
        <div className="head">
          <Avatar
            src={
              <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            size={41}
            className="head-img"
          ></Avatar>
          <p className="userName">Eliza Hart</p>
          <div className="point"></div>
        </div>
      </div>
    </HeaderWrapper>
  );
});
