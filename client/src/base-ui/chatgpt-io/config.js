//一些默认展示

import { CheckCircleOutlined, CommentOutlined, FireOutlined, HomeOutlined, ReadOutlined, SmileOutlined } from "@ant-design/icons";
import { Space } from "antd";
export const aiAvatar = 'http://47.102.108.122:8000/avatar/12'
const renderTitle = (icon, title) => (
  <Space align="start">
    {icon}
    <span>{title}</span>
  </Space>
);
// *推荐提示词（随一个进行展示）
export const hotPrompt = [
  {
    key: '1-1',
    description: `chatgpt 有什么新功能?`,
  },
  {
    key: '1-2',
    description: `serverless 是什么?`,
  },
  {
    key: '1-3',
    description: `node 的官方文档在哪?`,
  },
];
export const guidePrompt = [
  {
    key: '2-1',
    icon: <CheckCircleOutlined />,
    description: `chatgpt 进阶使用技巧`,
  },
  {
    key: '2-2',
    icon: <SmileOutlined />,
    description: `serverless 的发展前景`,
  },
  {
    key: '2-3',
    icon: <CommentOutlined />,
    description: `node 国内开发者社区`,
  },
];

// *会话界面初始提示
export const placeholderPromptsItems = [
  {
    key: '1',
    label: renderTitle(
      <FireOutlined
        style={{
          color: '#FF4D4F',
        }}
      />,
      '热门主题',
    ),
    description: '看上哪一个了?',
    children: hotPrompt,
  },
  {
    key: '2',
    label: renderTitle(
      <ReadOutlined
        style={{
          color: '#1890FF',
        }}
      />,
      '使用指引',
    ),
    // description: '如何建立自己的知识库?',
    description: '需要哪一个?',
    children: guidePrompt,
  },
];
// *输入框上方提示
export const senderPromptsItems = [
  {
    key: '1',
    description: '热门主题',
    icon: (
      <FireOutlined
        style={{
          color: '#FF4D4F',
        }}
      />
    ),
  },
  {
    key: '2',
    description: '使用指引',
    icon: (
      <ReadOutlined
        style={{
          color: '#1890FF',
        }}
      />
    ),
  },
  {
    key: '2',
    description: '回到首页',
    icon: (
      <HomeOutlined
        style={{
          color: '#1890FF',
        }}
      />
    ),
  },
];

