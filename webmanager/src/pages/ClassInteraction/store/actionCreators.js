import * as actionTypes from "./constants";
import { http } from "../../../utils/http";

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

export function showDeleteModal() {
  return {
    type: actionTypes.SET_DELETE_MODAL_VISIBLE,
    payload: {
      isDeleteModalShow: true,
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

export function hideDeleteModal() {
  return {
    type: actionTypes.SET_DELETE_MODAL_VISIBLE,
    payload: {
      isDeleteModalShow: false,
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

export function setReplyList(list, id) {
  return {
    type: actionTypes.SET_REPLY_LIST,
    payload: {
      list,
      id,
    },
  };
}

export function addReplyList(list, id) {
  return {
    type: actionTypes.ADD_REPLY_LIST,
    payload: {
      list,
      id,
    },
  };
}

export function setCurrentQuestionItemId(id) {
  return {
    type: actionTypes.SET_CURRENT_QUESTION_ITEM_ID,
    payload: {
      id,
    },
  };
}

export function deleteQuestionItem(id) {
  return {
    type: actionTypes.SET_CURRENT_QUESTION_ITEM_ID,
    payload: {
      id,
    },
  };
}

