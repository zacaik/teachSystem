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
} from "../store/actionCreators";

export default function ReplyContainer() {
  const request = useHttp();
  const dispatch = useDispatch();

  const [curQuestionItem, setCurQuestionItem] = useState(null);
  const [allReplyLength, setAllReplyLength] = useState(0);
  const [offset, setOffset] = useState(0);

  const { questionList, replyList, currentQuestionItemId } = useSelector(
    (state) => state.classInteract,
    shallowEqual
  );

  useEffect(() => {
    const curQuestion = questionList.find(
      (item) => item.id === currentQuestionItemId
    );
    setCurQuestionItem(curQuestion);
  }, [questionList, currentQuestionItemId]);

  useEffect(async () => {
    if (!replyList[currentQuestionItemId]) {
      const replyList = await fetchReplyList({ id: currentQuestionItemId });
      console.log(replyList);
      dispatch(setReplyList(replyList, currentQuestionItemId));
      setOffset(0);
    } else {
      setOffset(Math.floor(replyList[currentQuestionItemId].length / 10));
    }
    reloadAllLength();
  }, [currentQuestionItemId]);

  console.log(replyList[currentQuestionItemId]);

  return (
    <Card style={{ width: "49%" }} className="right">
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
          hasMore={getHasMore()}
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
    </Card>
  );

  function getHasMore() {
    if (curQuestionItem?.finish === 1) {
      return replyList[currentQuestionItemId]?.length < allReplyLength
    } else if (curQuestionItem?.start === 1 && curQuestionItem?.finish === 0) {
      // 正在进行的互动，需要一直获取数据
      return true;
    } else {
      // 暂未开始的互动，没有数据需要获取
      return false;
    }
  }

  async function reloadAllLength() {
    const allReplyList = await fetchReplyList({
      id: currentQuestionItemId,
      isAll: true,
    });
    setAllReplyLength(allReplyList.length);
  }

  async function fetchReplyList(option) {
    const { id, offset = 0, limit = 10, isAll } = option;
    let replyList = null;
    isAll
      ? (replyList = await request(`scweb/replay/${id}`))
      : (replyList = await request(
          `scweb/replay/${id}?offset=${offset}&limit=${limit}`
        ));
    return replyList.data;
  }

  async function loadMoreReplyList() {
    console.log(curQuestionItem);
    const newReplyList = await fetchReplyList({
      id: currentQuestionItemId,
      offset: offset + 1,
    });
    dispatch(addReplyList(newReplyList, currentQuestionItemId));
    setOffset(offset + 1);
    reloadAllLength();
  }
}
