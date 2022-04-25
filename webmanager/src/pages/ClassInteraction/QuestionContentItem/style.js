import styled from "styled-components";
export const QuestionContentItemWrapper = styled.div`
    width: 100%;
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    .question-header {
        display: flex;
        justify-content: space-between;
        .title {
            display: flex;
        }
        .action {
            display: flex;
            height: 40px;
            cursor: pointer;
            .stop {
                display: flex;
            }
        }
    }
`;