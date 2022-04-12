import styled from "styled-components";
import { Button, Input, Form, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { loginAction } from "./store/actionCreators";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      console.log(values);
      dispatch(loginAction(values));
      navigate("brief");
    } catch (error) {}
  };

  return (
    <Form onFinish={handleSubmit} >
      <Form.Item
        name="phone"
        rules={[{ required: true, message: "请输入注册时填写的手机号!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="手机号码"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
        style={{ margin: 0 }}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ span: 8, offset: 19 }} style={{ margin: "5px 0px" }}>
        <Checkbox>记住我</Checkbox>
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;

export const LongButton = styled(Button)`
  width: 90%;
`;
