import * as actionTypes from "./constants";

const defaultState = {
  isStartModalShow: false,
  isStopModalShow: false,
  questionList: [],
  currentIndex: 0, // 当前控制的问题的下标
};

function reducer(state = defaultState, action) {
  const newQuestionList = [...state.questionList];
  switch (action.type) {
    case actionTypes.SET_START_MODAL_VISIBLE:
      return { ...state, isStartModalShow: action.payload.isStartModalShow };
    case actionTypes.SET_STOP_MODAL_VISIBLE:
      return { ...state, isStopModalShow: action.payload.isStopModalShow };
    case actionTypes.SET_INTERACT_IS_START:
    const { index, isStart } = action.payload;
      newQuestionList[index].isStart = isStart;
      return {
        ...state,
        questionList: newQuestionList,
      };
    case actionTypes.SET_INTERACT_IS_FINISHED:
    const { isFinished } = action.payload;
      newQuestionList[action.payload.index].isFinished = isFinished;
      console.log(isFinished);
      return {
        ...state,
        questionList: newQuestionList,
      };
    case actionTypes.SET_QUESTION_LIST:
      return {
        ...state,
        questionList: [...state.questionList, ...action.payload.list],
      };
    case actionTypes.SET_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.payload.index,
      };
    default:
      return state;
  }
}

export default reducer;
