import styled from "styled-components";
export const InteractionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .interactHeader {
    width: 100%;
    height: 40px;
    margin: 10px auto 0;
    /* background-color: #fff; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .leftHeader {
      width: 50%;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      /* color: #ccc; */
      .btn {
        /* margin-top: 5px; */
        margin-right: 20px;
      }
    }
    .rightHeader {
      width: 50%;
      line-height: 40px;
    }
  }
  .interactContent {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .left,
    .right {
      width: 49%;
      max-height: 80vh;
      overflow-y: scroll;
    }
    .right::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const QuestionItem = styled.div`
  width: 100px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  > p {
    font-size: 14px;
    margin-left: 6px;
  }
`;
