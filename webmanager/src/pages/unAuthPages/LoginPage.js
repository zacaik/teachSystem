import styled from "styled-components";
import { Button, Input, Form } from "antd";
import { useDispatch } from "react-redux";
import { loginAction } from './store/actionCreators'


const LoginPage = (props) => {
  const dispatch = useDispatch();


  const handleSubmit = async (values) => {
    try {
      console.log(values);
      dispatch(loginAction(values));
    } catch (error) {
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"} >
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;

export const LongButton = styled(Button)`
  width: 100%;
`;
