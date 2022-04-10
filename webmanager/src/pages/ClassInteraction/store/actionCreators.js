import * as actionTypes from "./constants";

export function showStartModal() {
  return {
    type: actionTypes.SET_START_MODAL_VISIBLE,
    payload: {
      isStartModalShow: true,
    },
  };
}

export function showStopModal() {
  return {
    type: actionTypes.SET_STOP_MODAL_VISIBLE,
    payload: {
      isStopModalShow: true,
    },
  };
}

export function hideStartModal() {
  return {
    type: actionTypes.SET_START_MODAL_VISIBLE,
    payload: {
      isStartModalShow: false,
    },
  };
}

export function hideStopModal() {
  return {
    type: actionTypes.SET_STOP_MODAL_VISIBLE,
    payload: {
      isStopModalShow: false,
    },
  };
}

export function setInteractIsStart(index, isStart) {
  return {
    type: actionTypes.SET_INTERACT_IS_START,
    payload: {
      index,
      isStart,
    },
  };
}

export function setInteractIsFinished(index, isFinished) {
  return {
    type: actionTypes.SET_INTERACT_IS_FINISHED,
    payload: {
      index,
      isFinished,
    },
  };
}

export function setQuestionList(list) {
  return {
    type: actionTypes.SET_QUESTION_LIST,
    payload: {
      list,
    },
  };
}

export function setCurrentIndex(index) {
  return {
    type: actionTypes.SET_CURRENT_INDEX,
    payload: {
      index,
    },
  };
}