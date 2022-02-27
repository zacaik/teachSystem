import { Button, Card, Divider } from "antd";
import { useState } from "react";
import styled from "styled-components";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import left from "../../assets/left.svg";
import right from "../../assets/right.svg";

const UnAutnPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "注 册" : "登 录"}</Title>
        {isRegister ? (
          <RegisterPage />
        ) : (
          <LoginPage />
        )}
        <Divider />
        <Button
          type="link"
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          {isRegister ? "已有账号？直接登录" : "没有账号？注册账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

export default UnAutnPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.div`
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;
