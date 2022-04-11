import { Form, Input, Button } from "antd";
// import { useAuth } from "context/AuthContext";
// import { useAsync } from "utils/useAsync";
import { LongButton } from "./LoginPage";

const RegisterPage = (props) => {
  // const { onError } = props;
  // const { register } = useAuth();
  // const { run, isLoading } = useAsync();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      // await run(register(values));
    } catch (error) {
      // onError(error);
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 20,
      },
    },
  };

  return (
    <Form onFinish={handleSubmit} form={form} {...formItemLayout}>
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="code"
        label="验证码"
        rules={[
          {
            required: true,
            message: "请输入验证码",
          },
        ]}
      >
        <Input.Group compact>
          <Input
            style={{ width: "calc(100% - 102px)" }}
          />
          <Button type="primary">获取验证码</Button>
        </Input.Group>
      </Form.Item>
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
        <LongButton htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterPage;
