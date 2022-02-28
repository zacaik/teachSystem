import styled from "styled-components";

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .search {
    width: 400px;
    margin: 17px 20px;
    margin-left: 100px;
    .ant-input {
      opacity: 1;
      background: #f5f6f9;
      border-radius: 4px;
    }
  }
  .right {
    display: flex;
    float: right;
    width: 700px;
    height: 100%;
    .hint,
    .message {
      position: relative;
      height: 100%;
      width: 100px;
      padding-left: 38px;
      border-left: 2px solid #f5f6f9;
      .point {
        position: absolute;
        left: 51px;
        top: 20px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .red {
        background-color: red;
      }
      .green {
        left: 55px;
        background-color: #01df01;
      }
    }
    .head {
      display: flex;
      padding-left: 38px;
      width: 200px;
      position: relative;
      border-left: 2px solid #f5f6f9;
      .head-img {
        margin-top: 10px;
      }
      .userName {
        height: 50px;
        margin-left: 15px;
        font-size: 16px;
        font-family: Avenir-Medium;
        color: #6672fb;
      }
      .point {
        position: absolute;
        left: 64px;
        top: 43px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #01df01;
      }
    }
  }
`;
