import React, { memo, useEffect, useState } from "react";
import { InteractionWrapper, QuestionItem } from "./style";
import {
  Button,
  Card,
  Menu,
  Dropdown,
  Form,
  List,
  Skeleton,
  Divider,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Comment } from "@icon-park/react";
import ReplyItem from "./ReplyItem";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  setQuestionList,
  setReplyList,
  addReplyList,
} from "./store/actionCreators";
import { useHttp } from "../../utils/http";
import InfiniteScroll from "react-infinite-scroll-component";
import QuestionContainer from "./QuestionContainer";
import Modals from "./Modals";

const ClassInteraction = memo((props) => {
  const { currentClass } = props;
  console.log(props);
  const request = useHttp();
  const dispatch = useDispatch();

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allReplyLength, setAllReplyLength] = useState(0);
  const [curQuestionItem, setCurQuestionItem] = useState(null);

  const { questionList, replyList, currentQuestionItemId } = useSelector(
    (state) => state.classInteract,
    shallowEqual
  );

  console.log(questionList);

  console.log(currentClass);
  console.log(replyList);

  const loadMoreFinishReplyList = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    loadReplyListByOffset(currentQuestionItemId, offset + 1);
    setOffset(offset + 1);
  };

  const loadMoreStartingReplyList = async () => {
    const replyList = await request(`scweb/replay/${currentQuestionItemId}`);
    console.log(replyList);
    dispatch(setReplyList(replyList.data));
  };

  const fetchInteractList = async (currentClass) => {
    const interactList = await request("scweb/interaction", {
      data: { classId: currentClass || 1, sort: 1 },
    });
    console.log(interactList);
    dispatch(setQuestionList(interactList.data));
  };

  const loadReplyListByOffset = async (id, offset = 0) => {
    const replyList = await request(
      `scweb/replay/${id}?offset=${offset}&limit=20`
    );
    setLoading(false);
    dispatch(addReplyList(replyList.data));
  };

  const fetchReplyList = async (id, offset = 0) => {
    console.log(id);
    const replyList = await request(
      `scweb/replay/${id}?offset=${offset}&limit=10`
    );
    console.log(replyList);
    dispatch(setReplyList(replyList.data));
  };

  useEffect(() => {
    fetchInteractList(currentClass);
  }, [currentClass]);

  useEffect(async () => {
    fetchReplyList(currentQuestionItemId);
    setOffset(0);
    const replyList = await request(`scweb/replay/${currentQuestionItemId}`);
    setAllReplyLength(replyList.data.length);
  }, [currentQuestionItemId]);

  useEffect(() => {
    const questionListArr = [
      ...(questionList.notStartList || []),
      ...(questionList.startingList || []),
      ...(questionList.finishList || []),
    ];
    const curQuestionItem = questionListArr.find(
      (item) => item.id === currentQuestionItemId
    );
    setCurQuestionItem(curQuestionItem);
  }, [questionList]);

  const menu = (
    <Menu>
      <Menu.Item>
        <QuestionItem onClick={showAddModal}>
          <Comment theme="outline" size="24" fill="#4a90e2" />
          <p>问答题</p>
        </QuestionItem>
      </Menu.Item>
    </Menu>
  );

  return (
    <InteractionWrapper>
      <div className="interactHeader">
        <div className="leftHeader">
          <p style={{ marginLeft: 10 }}>提问区</p>
          <Dropdown overlay={menu} arrow trigger={["click"]}>
            <Button type="primary" className="btn">
              <PlusOutlined />
              新建问题
            </Button>
          </Dropdown>
        </div>
        <div className="rightHeader">
          <p style={{ marginLeft: 20 }}>回答区</p>
        </div>
      </div>
      <div className="interactContent">
        <QuestionContainer />
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
              dataLength={replyList.length}
              next={
                curQuestionItem?.finish === 1
                  ? loadMoreFinishReplyList
                  : loadMoreStartingReplyList
              }
              hasMore={replyList.length < allReplyLength}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>已加载完全部回答 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={replyList}
                split
                renderItem={(item) => (
                  <ReplyItem data={item} key={item.id}></ReplyItem>
                )}
              />
            </InfiniteScroll>
          </div>
        </Card>
      </div>
      <Modals
        isAddModalVisible={isAddModalVisible}
        setIsAddModalVisible={setIsAddModalVisible}
        currentClass={currentClass}
      />
    </InteractionWrapper>
  );

  function showAddModal() {
    setIsAddModalVisible(true);
  }
});

export default ClassInteraction;
