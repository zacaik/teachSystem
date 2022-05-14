import React, { useEffect } from "react";
import { HeaderWrapper } from "./style";
import { Avatar, Select, Button } from "antd";
import { useSelector, shallowEqual } from "react-redux";

export default function MyHeader(props) {
  const { currentClass, setCurrentClass, classList } = props;
  const { Option } = Select;

  const { user } = useSelector(
    (state) => ({
      user: state.user.user,
    }),
    shallowEqual
  );

  useEffect(() => {
    // 初始化当前选中课程
    setCurrentClass(classList?.[0]?.id);
  }, [classList])

  return (
    <HeaderWrapper>
      <div className="left">
        当前课程：
        <Select
          value={currentClass}
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
          {/* <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} className="avatar">凡</Avatar> */}
          <p className="userName">欢迎您，{user.name}</p>
          <Button className="logout" onClick={handleLogOut} type="primary">退出</Button>
        </div>
      </div>
    </HeaderWrapper>
  );

  function handleChange(value, option) {
    setCurrentClass(value);
  }

  function handleLogOut() {
    localStorage.removeItem("__auth-provider-token__");
    window.location.reload();
  }
};
