import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { List, Card, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import ReplyItem from "../ReplyItem";
import { useHttp } from "../../../utils/http";
import {
  setQuestionList,
  setReplyList,
  addReplyList,
  setHasMoreList,
  setIntervalAction,
} from "../store/actionCreators";

export default function ReplyContainer() {
  const request = useHttp();
  const dispatch = useDispatch();

  const [curQuestionItem, setCurQuestionItem] = useState(null);

  const {
    questionList,
    replyList,
    currentQuestionItemId,
    fetchReplyListIntervals,
    hasMoreList,
  } = useSelector((state) => state.classInteract, shallowEqual);

  useEffect(() => {
    const curQuestion = questionList.find(
      (item) => item.id === currentQuestionItemId
    );
    console.log(curQuestion);
    setCurQuestionItem(curQuestion);
  }, [questionList, currentQuestionItemId]);

  useEffect(() => {
    if (hasMoreList[currentQuestionItemId] == undefined) {
      dispatch(setHasMoreList(true, currentQuestionItemId));
    }
  }, [hasMoreList, currentQuestionItemId]);

  useEffect(async () => {
    if (!replyList[currentQuestionItemId]) {
      const replyList = await fetchReplyList({ id: currentQuestionItemId });
      dispatch(setReplyList(replyList, currentQuestionItemId));
    }
  }, [replyList, currentQuestionItemId]);

  return (
    <Card style={{ width: "49%" }} className="right">
      {currentQuestionItemId ? (
        <div
          className="rightContent"
          id="scrollableDiv"
          style={{
            height: "100%",
            overflow: "auto",
          }}
        >
          <InfiniteScroll
            dataLength={replyList[currentQuestionItemId]?.length || 0}
            next={loadMoreReplyList}
            hasMore={!!hasMoreList[currentQuestionItemId]}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>已加载完全部回答 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={replyList[currentQuestionItemId] || []}
              split
              renderItem={(item) => (
                <ReplyItem data={item} key={item.id}></ReplyItem>
              )}
            />
          </InfiniteScroll>
        </div>
      ) : (
        "暂无数据"
      )}
    </Card>
  );

  async function fetchReplyList(option) {
    const { id, offset = 0, limit = 10, isAll } = option;
    let replyList = null;
    isAll
      ? (replyList = await request(`scweb/replay/${id}`))
      : (replyList = await request(
          `scweb/replay/${id}?offset=${offset}&limit=${limit}`
        ));
    const curQuestionItem = questionList.find(
      (item) => item.id === currentQuestionItemId
    );
    console.log(curQuestionItem);
    if (curQuestionItem?.finish === 1 && replyList.data.length < limit) {
      dispatch(setHasMoreList(false, currentQuestionItemId));
    }
    return replyList.data;
  }

  async function loadMoreReplyList() {
    if (curQuestionItem?.finish === 1) {
      const offset = Math.floor(replyList[currentQuestionItemId].length / 10);
      const newReplyList = await fetchReplyList({
        id: currentQuestionItemId,
        offset: offset,
      });
      dispatch(addReplyList(newReplyList, currentQuestionItemId));
    } else if (curQuestionItem?.start === 1) {
      // 正在进行的互动
      const newReplyList = await fetchReplyList({
        id: currentQuestionItemId,
        isAll: true,
      });
      dispatch(setReplyList(newReplyList, currentQuestionItemId));
    } else {
      // 暂未开始的互动
      dispatch(setHasMoreList(true, currentQuestionItemId));
    }
  }
}
