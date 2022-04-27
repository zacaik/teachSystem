import * as actionTypes from "./constants";

const defaultState = {
  isAddModalShow: false,
  isStartModalShow: false,
  isStopModalShow: false,
  isDeleteModalShow: false,
  questionList: [],
  replyList: {},
  currentQuestionItemId: 0, // 当前选中的问题的id
};

function reducer(state = defaultState, action) {
  const newReplyList = { ...state.replyList };
  switch (action.type) {
    case actionTypes.SET_START_MODAL_VISIBLE:
      return { ...state, isStartModalShow: action.payload.isStartModalShow };
    case actionTypes.SET_STOP_MODAL_VISIBLE:
      return { ...state, isStopModalShow: action.payload.isStopModalShow };
    case actionTypes.SET_DELETE_MODAL_VISIBLE:
      return { ...state, isDeleteModalShow: action.payload.isDeleteModalShow };
    case actionTypes.SET_QUESTION_LIST:
      return {
        ...state,
        questionList: [
          ...action.payload.list.startingList,
          ...action.payload.list.notStartList,
          ...action.payload.list.finishList,
        ],
      };
    case actionTypes.SET_REPLY_LIST:
      newReplyList[action.payload.id] = action.payload.list;
      return {
        ...state,
        replyList: newReplyList,
      };
    case actionTypes.ADD_REPLY_LIST:
      newReplyList[action.payload.id].push(...action.payload.list);
      return {
        ...state,
        replyList: newReplyList,
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
