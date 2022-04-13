import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #001628;
  .left{
    color: #fff;
    margin-left: 50px;
  }
  .right {
    .user {
      display: flex;
      width: 200px;
      .avatar {
        margin-top: 16px;
      }
      .userName {
        height: 50px;
        margin-left: 15px;
        font-size: 16px;
        font-family: Avenir-Medium;
        color: #fff;
      }
    }
  }
`;
