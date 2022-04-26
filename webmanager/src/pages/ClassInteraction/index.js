import React, { memo, useEffect, useState } from "react";
import { InteractionWrapper, QuestionItem } from "./style";
import {
  Button,
  Card,
  Menu,
  Dropdown,
  Modal,
  Input,
  InputNumber,
  Switch,
  Form,
  message,
  notification,
  List,
  Skeleton,
  Divider,
} from "antd";
import { PlusOutlined, SmileOutlined } from "@ant-design/icons";
import { Comment } from "@icon-park/react";
import QuestionContentItem from "./QuestionContentItem";
import ReplyItem from "./ReplyItem";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  showStartModal,
  hideStartModal,
  setInteractIsStart,
  hideStopModal,
  setInteractIsFinished,
  setQuestionList,
  hideDeleteModal,
  setReplyList,
  addReplyList,
} from "./store/actionCreators";
import { useHttp } from "../../utils/http";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";

const ClassInteraction = memo((props) => {
  const { currentClass } = props;
  console.log(props);
  const request = useHttp();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allReplyLength, setAllReplyLength] = useState(0);
  const [curQuestionItem, setCurQuestionItem] = useState(null);

  const {
    isStartModalShow,
    isStopModalShow,
    questionList,
    replyList,
    currentQuestionItemId,
    isDeleteModalShow,
  } = useSelector((state) => state.classInteract, shallowEqual);

  console.log(questionList);
  const key = `open${Date.now()}`;

  console.log(currentClass);
  console.log(replyList);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const loadMoreFinishReplyList = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    loadReplyListByOffset(currentQuestionItemId, offset + 1);
    setOffset(offset + 1);
  };

  const loadMoreStartingReplyList = () => {
    const replyList = await request(
      `scweb/replay/${currentQuestionItemId}`
    );
    console.log(replyList);
    dispatch(setReplyList(replyList.data));
  }

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
    const questionListArr = [...questionList.notStartList, ...questionList.startingList, ...questionList.finishList];
    const curQuestionItem = questionListArr.find((item) => item.id === currentQuestionItemId);
    setCurQuestionItem(curQuestionItem);
  }, [questionList]);

  const openNotification = () => {
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => notification.close(key)}
      >
        我知道了
      </Button>
    );
    notification.open({
      description: "您发布的题目已经终止回答，快来看看答题结果吧",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      btn,
      key,
      duration: 2,
    });
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <QuestionItem onClick={showModal}>
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
        <Card style={{ width: "49%" }} className="left">
          <div className="leftContent">
            {questionList?.startingList?.map((item) => {
              return (
                <QuestionContentItem
                  data={item}
                  key={item.id}
                ></QuestionContentItem>
              );
            })}
            {questionList?.notStartList?.map((item) => {
              return (
                <QuestionContentItem
                  data={item}
                  key={item.id}
                ></QuestionContentItem>
              );
            })}
            {questionList?.finishList?.map((item) => {
              return (
                <QuestionContentItem
                  data={item}
                  key={item.id}
                ></QuestionContentItem>
              );
            })}
          </div>
        </Card>
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
              next={curQuestionItem.finish === 1 ? loadMoreFinishReplyList : loadMoreStartingReplyList}
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
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <div>
          <div
            style={{
              display: "flex",
            }}
            className="question-header"
          >
            <Comment
              theme="outline"
              size="24"
              fill="#4a90e2"
              style={{ marginRight: 6 }}
            />
            <p>问答题</p>
          </div>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              label="请输入问题"
              rules={[{ required: true, message: "请输入问题" }]}
              name="questionContent"
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Modal
        title="注意"
        visible={isStartModalShow}
        onOk={handleStartModalOk}
        onCancel={handleStartModalCancel}
        okText="确认发布"
        cancelText="取消发布"
      >
        <p>您即将发布题目到20级软件工程1-3班</p>
        <p>发布后学生即可开始答题</p>
      </Modal>
      <Modal
        title="注意"
        visible={isStopModalShow}
        onOk={handleStopModalOk}
        onCancel={handleStopModalCancel}
        okText="确定"
        cancelText="取消"
      >
        <p>您确定要终止此次答题吗？</p>
        <p>终止后，可重新发布该题目</p>
      </Modal>
      <Modal
        title="注意"
        visible={isDeleteModalShow}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
        okText="确认删除"
        cancelText="取消"
      >
        <p>您确定要删除该互动项吗？</p>
        <p>删除后，与之相关的所有回复记录也会被删除</p>
      </Modal>
    </InteractionWrapper>
  );

  function onFinish(values) {
    console.log(values);
    request("scweb/interaction", {
      data: {
        classId: currentClass || "1",
        title: values.questionContent,
        createTime: moment().format("YYYY-MM-DD"),
        type: "0",
        content: "",
      },
      method: "POST",
    }).then(() => {
      message.success("操作成功");
      setIsModalVisible(false);
      fetchInteractList();
    });
  }

  function handleStartModalOk() {
    // 发送网络请求，开始答题
    request(`scweb/interaction/operation/${currentQuestionItemId}`, {
      method: "PUT",
      data: {
        operation: 0,
      },
    })
      .then((res) => {
        console.log(res);
        message.success("题目发布成功！");
        dispatch(hideStartModal());
        fetchInteractList();
        let interval = setInterval(() => {
          const replyList = await request(
            `scweb/replay/${id}?offset=${offset}&limit=10`
          );
          console.log(replyList);
          dispatch(setReplyList(replyList.data));
          if (replyList.length > 10) {
            clearInterval(interval);
          }
        }, 1000 * 30);
      })
      .catch((err) => {
        console.log(err);
        message.error(err);
      });
  }

  function handleStartModalCancel() {
    dispatch(hideStartModal());
  }

  function handleStopModalOk() {
    // 发送网络请求，终止答题
    request(`scweb/interaction/operation/${currentQuestionItemId}`, {
      method: "PUT",
      data: {
        operation: 2,
      },
    })
      .then((res) => {
        console.log(res);
        message.success("互动已结束！");
        dispatch(hideStopModal());
        fetchInteractList();
      })
      .catch((err) => {
        console.log(err);
        message.error(err);
      });
  }

  function handleStopModalCancel() {
    dispatch(hideStopModal());
  }

  function handleDeleteModalOk() {
    request(`scweb/interaction/${currentQuestionItemId}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        openNotification();
        dispatch(hideDeleteModal());
        fetchInteractList();
      })
      .catch((err) => {
        console.log(err);
        message.error(err);
      });
  }

  function handleDeleteModalCancel() {
    dispatch(hideDeleteModal());
  }
});

export default ClassInteraction;
