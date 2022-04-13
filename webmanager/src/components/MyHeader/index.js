import React, { memo } from "react";
import { HeaderWrapper } from "./style";
import { Avatar, Select } from "antd";

export default function MyHeader(props) {
  const { currentClass, setCurrentClass, classList } = props;
  const { Option } = Select;
  console.log(classList);
  return (
    <HeaderWrapper>
      <div className="left">
        当前课程：
        <Select
          defaultValue={(classList || [])[0]}
          style={{ width: 300 }}
          onChange={handleChange}
        >
          {(classList || []).map((item) => {
            return (
              <Option value={item.id} key={item.id}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </div>
      <div className="right">
        <div className="user">
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} className="avatar">凡</Avatar>
          <p className="userName">欢迎您，{'刘'}老师</p>
        </div>
      </div>
    </HeaderWrapper>
  );

  function handleChange(value, option) {
    console.log(value);
    console.log(option);
    setCurrentClass(value);
  }
};
