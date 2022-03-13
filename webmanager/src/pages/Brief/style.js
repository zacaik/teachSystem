import styled from "styled-components";
export const BriefWrapper = styled.div`
  width: 100%;
  padding: 20px;
  .ant-card-body {
    margin: 20px 0;
  }
  .classSelect {
    margin-top: 20px;
  }

  .class-summary > .ant-card-body {
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    .gender-proportion {
      width: 50%;
      display: flex;
      flex-direction: row;
      
    }
    .pieWrapper {
        /* height: 250px; */
        width: 70%;
      }
    .studentNumber {
      display: flex;
      flex-direction: row;
      width: 50%;
    }

    .static-number-item {
      margin-left: 20px;
      width: 100px;
      margin-bottom: 20px;
    }

    .static-number {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;
