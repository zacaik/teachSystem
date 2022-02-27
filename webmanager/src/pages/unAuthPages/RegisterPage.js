import { Form, Input } from "antd";
// import { useAuth } from "context/AuthContext";
// import { useAsync } from "utils/useAsync";
import { LongButton } from "./LoginPage";

const RegisterPage = (props) => {
  // const { onError } = props;
  // const { register } = useAuth();
  // const { run, isLoading } = useAsync();

  const handleSubmit = async (values) => {
    try {
      // await run(register(values));
    } catch (error) {
      // onError(error);
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
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterPage;
