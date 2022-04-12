import { Form, Input, Button, message } from "antd";
// import { useAuth } from "context/AuthContext";
// import { useAsync } from "utils/useAsync";
import { LongButton } from "./LoginPage";
import { useState } from "react";
import { http } from "../../utils/http";

const RegisterPage = (props) => {
  const { setIsRegister } = props;
  // const { register } = useAuth();
  // const { run, isLoading } = useAsync();
  const [form] = Form.useForm();
  const [isGetCodeButtonDisabled, setIsGetCodeButtonDisabled] = useState(true);

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
            message: "请输入正确格式的邮箱",
          },
          {
            required: true,
            message: "请输入邮箱",
          },
        ]}
      >
        <Input onChange={handleEamilInputChange} />
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
          <Input style={{ width: "calc(100% - 102px)" }} onChange={handleCodeInputChange}/>
          <Button
            type="primary"
            onClick={handleGetCode}
            disabled={isGetCodeButtonDisabled}
          >
            获取验证码
          </Button>
        </Input.Group>
      </Form.Item>
      <Form.Item
        label="姓名"
        name="username"
        rules={[{ required: true, message: "请输入姓名" }]}
      >
        <Input type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        label="工号"
        name="jobId"
        rules={[{ required: true, message: "请输入工号" }]}
      >
        <Input type="jobId" id={"jobId"} />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        label="手机"
        name="phone"
        rules={[{ required: true, message: "请输入手机" }]}
      >
        <Input type="phone" id={"phone"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );

  async function handleSubmit(values) {
    console.log(values);
    http(`/scweb/login/register?code=${values.code}&email=${values.email}`, {
      data: { ...values },
      method: "POST",
    }).then(() => {
      message.success('注册成功！');
      setIsRegister(false);
    }, () => {
      message.error("网络错误，请稍后重试！");
    });
  }

  function handleCodeInputChange(e) {
    const fieldsValue = form.getFieldsValue(true);
    console.log(fieldsValue);
    form.setFieldsValue({...fieldsValue, code: e.target.value});
  }

  function handleEamilInputChange(e) {
    if (e.target.value.length) {
      setIsGetCodeButtonDisabled(false);
    } else {
      setIsGetCodeButtonDisabled(true);
    }
  }

  function handleGetCode() {
    console.log(form.getFieldError("email"));
    console.log(form.getFieldValue("email"));
    if (form.getFieldError("email").length) {
      message.error("请输入正确格式的邮箱");
    } else {
      http("/scweb/login/registerCode", {
        data: { email: form.getFieldValue("email") },
      }).then(() => {
        message.success('验证码已发送');
      }, () => {
        message.error("网络错误，请稍后重试！");
      });
    }
  }
};

export default RegisterPage;
