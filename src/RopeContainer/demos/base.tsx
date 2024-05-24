import React from 'react';
import { RopeContainer } from 'lucky-bird-ui';
import { Button } from 'antd';

const Demo = () => {
  return (
    <div>
      <RopeContainer
        modalConfirm={{ content: '确定吗?', title: '标题' }}
        onClick={async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
          console.log('abc');
        }}
      >
        <Button>RopeContainer</Button>
      </RopeContainer>

      <RopeContainer
        modalConfirm="确定删除？"
        onClick={async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 2000);
          });
          console.log('abc');
        }}
      >
        <Button>RopeContainer</Button>
      </RopeContainer>
    </div>
  );
};

export default Demo;
