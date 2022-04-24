import * as actionTypes from "./constants";

const defaultState = {
  isStartModalShow: false,
  isStopModalShow: false,
  isDeleteModalShow: false,
  questionList: {},
  currentQuestionItemId: 0, // 当前选中的问题的id
};

function reducer(state = defaultState, action) {
  // const newQuestionList = [...state.questionList];
  switch (action.type) {
    //   case actionTypes.SET_START_MODAL_VISIBLE:
    //     return { ...state, isStartModalShow: action.payload.isStartModalShow };
    //   case actionTypes.SET_STOP_MODAL_VISIBLE:
    //     return { ...state, isStopModalShow: action.payload.isStopModalShow };
    //   case actionTypes.SET_INTERACT_IS_START:
    //   const { index, isStart } = action.payload;
    //     newQuestionList[index].isStart = isStart;
    //     return {
    //       ...state,
    //       questionList: newQuestionList,
    //     };
    //   case actionTypes.SET_INTERACT_IS_FINISHED:
    //   const { isFinished } = action.payload;
    //     newQuestionList[action.payload.index].isFinished = isFinished;
    //     console.log(isFinished);
    //     return {
    //       ...state,
    //       questionList: newQuestionList,
    //     };
    case actionTypes.SET_DELETE_MODAL_VISIBLE:
      return { ...state, isDeleteModalShow: action.payload.isDeleteModalShow };
    case actionTypes.SET_QUESTION_LIST:
      return {
        ...state,
        questionList: { ...action.payload.list },
      };
    case actionTypes.SET_CURRENT_QUESTION_ITEM_ID:
      return {
        ...state,
        currentQuestionItemId: action.payload.id,
      };
    default:
      return state;
  }
}

export default reducer;
