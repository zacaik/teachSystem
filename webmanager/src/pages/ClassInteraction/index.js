import React, { memo } from "react";
import { InterationWrapper } from "./style";
import { Button, Card } from "antd";

const ClassInteraction = memo(() => {
  return (
    <InterationWrapper>
      <div className="interactHeader">
        <div className="leftHeader">
          <p style={{ marginLeft: 10 }}>提问区</p>
          <Button type="primary" className="btn">
            新建问题
          </Button>
        </div>
        <div className="rightHeader">
          <p style={{ marginLeft: 20 }}>回答区</p>
        </div>
      </div>
      <div className="interactContent">
        <Card style={{ width: "49%" }} className="left">
          <div className="leftContent"></div>
        </Card>
        <Card style={{ width: "49%" }} className="right">
          <div className="rightContent"></div>
        </Card>
      </div>
    </InterationWrapper>
  );
});

export default ClassInteraction;
