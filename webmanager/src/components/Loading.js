import styled from "styled-components";
import { Spin } from "antd";

export const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => (
  <FullPage>
    <Spin size="large" />
  </FullPage>
);

export default Loading;
