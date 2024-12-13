import {
  Attachments,
  Bubble,
  Conversations,
  Prompts,
  Sender,
  Welcome,
  useXAgent,
  useXChat,
} from '@ant-design/x';
import { createStyles } from 'antd-style';
import React, { useEffect } from 'react';
import {
  CheckCircleOutlined,
  CloudUploadOutlined,
  CommentOutlined,
  EllipsisOutlined,
  FireOutlined,
  HeartOutlined,
  HomeOutlined,
  PaperClipOutlined,
  PlusOutlined,
  ReadOutlined,
  ShareAltOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Badge, Button, Space } from 'antd';
import postQuestionToAI from '@/services/modules/post-to-AI';
import BtnWrapper from './style';
import { useNavigate } from 'react-router';
import useNavigator from '@/hooks/useNavigator';
const renderTitle = (icon, title) => (
  <Space align="start">
    {icon}
    <span>{title}</span>
  </Space>
);

// *推荐提示词（随一个进行展示）
const hotPrompt = [
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
const guidePrompt = [
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
// *历史会话栏
const defaultConversationsItems = [
  {
    key: '0',
    label: '历史会话功能制作中~',
  },
];
// *组件样式
const useStyle = createStyles(({ token, css }) => {
  return {
    //整体
    layout: css`
      width: 100%;
      min-width: 1032px;
      height: 722px;
      min-height:722px;
      border-radius: ${token.borderRadius}px;
      display: flex;
      background: ${token.colorBgContainer};
      background-color:rgb(242,243,245);
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;

      .ant-prompts {
        color: ${token.colorText};
      }
    `,
    //历史会话栏 
    menu: css`
      background: ${token.colorBgLayout}80;
      width: 200px;
      height: 100%;
      display: flex;
      flex-direction: column;
    `,
    conversations: css`
      padding: 0 12px;
      flex: 1;
      overflow-y: auto;
    `,

    //聊天框
    chat: css`
      height: 100%;
      width: 100%;
      max-width: 900px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: ${token.paddingLG}px;
      gap: 16px;
    `,
    messages: css`
      flex: 1;
    `,
    // *撑起聊天框的宽度
    placeholder: css`
      min-width:800px;
      padding-top: 32px;
    `,
    sender: css`
      box-shadow: ${token.boxShadow};
    `,
    logo: css`
      display: flex;
      height: 72px;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;

      img {
        width: 24px;
        height: 24px;
        display: inline-block;
      }

      span {
        display: inline-block;
        margin: 0 8px;
        font-weight: bold;
        color: ${token.colorText};
        font-size: 16px;
      }
    `,
    addBtn: css`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      width: calc(100% - 24px);
      margin: 0 12px 24px 12px;
    `,
  };
});

// *会话界面初始提示
const placeholderPromptsItems = [
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
const senderPromptsItems = [
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

const roles = {
  ai: {
    placement: 'start',
    typing: {
      step: 5,
      interval: 20,
    },
    styles: {
      content: {
        borderRadius: 16,
      },
    },
  },
  local: {
    placement: 'end',
    variant: 'shadow',
  },
};
const Independent = () => {
  const navigator = useNavigator()
  const toHome = () => {
    navigator('/home')
  }
  // ==================== Style ====================
  const { styles } = useStyle();

  // ==================== State ====================
  const [headerOpen, setHeaderOpen] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [conversationsItems, setConversationsItems] = React.useState(defaultConversationsItems);
  const [activeKey, setActiveKey] = React.useState(defaultConversationsItems[0].key);
  const [attachedFiles, setAttachedFiles] = React.useState([]);

  // ==================== Runtime ====================
  const [agent] = useXAgent({
    request: async ({ message }, { onSuccess }) => {
      // *回到首页功能
      if (message === '回到首页') toHome()
      try {
        // *将提问上传服务器给chatgpt进行解答
        const answer = await postQuestionToAI(message);
        // *展示回答
        if (answer) onSuccess(answer);
      } catch (error) {
        console.log('useXAgent error', error)
        message.info('网络出了点问题，修复中~')
      }

    },
  });
  const { onRequest, messages, setMessages } = useXChat({
    agent,
  });
  useEffect(() => {
    if (activeKey !== undefined) {
      setMessages([]);
    }
  }, [activeKey]);

  // ==================== Event ====================
  const onSubmit = (nextContent) => {
    if (!nextContent) return;
    onRequest(nextContent);
    setContent('');
  };
  const onPromptsItemClick = (info) => {
    onRequest(info.data.description);
  };
  const onAddConversation = () => {
    setConversationsItems([
      ...conversationsItems,
      {
        key: `${conversationsItems.length}`,
        label: `New Conversation ${conversationsItems.length}`,
      },
    ]);
    setActiveKey(`${conversationsItems.length}`);
  };
  const onConversationClick = (key) => {
    setActiveKey(key);
  };
  const handleFileChange = (info) => setAttachedFiles(info.fileList);

  // ==================== Nodes ====================
  const placeholderNode = (
    <Space direction="vertical" size={16} className={styles.placeholder}>
      <Welcome
        variant="borderless"
        icon="http://47.102.108.122:8000/avatar/12"
        title="亻尔女子，这是 coderhow AI 助手~"
        description="coderhow AI 助手"
        styles={{
          list: {
            width: 500,
          },
        }}
        extra={
          <Space>
            <Button icon={<ShareAltOutlined />} />
            <Button icon={<EllipsisOutlined />} />
          </Space>
        }
      />
      <Prompts
        title="对什么感兴趣?"
        items={placeholderPromptsItems}
        styles={{
          list: {
            width: '100%',
          },
          item: {
            flex: 1,
          },
        }}
        onItemClick={onPromptsItemClick}
      />
    </Space>
  );
  const items = messages.map(({ id, message, status }) => ({
    key: id,
    loading: status === 'loading',
    role: status === 'local' ? 'local' : 'ai',
    content: message,
  }));
  // *附件按钮
  const attachmentsNode = (
    <Badge dot={attachedFiles.length > 0 && !headerOpen}>
      <Button type="text" icon={<PaperClipOutlined />} onClick={() => setHeaderOpen(!headerOpen)} />
    </Badge>
  );
  const senderHeader = (
    <Sender.Header
      title="Attachments"
      open={headerOpen}
      onOpenChange={setHeaderOpen}
      styles={{
        content: {
          padding: 0,
        },
      }}
    >
      {/* 附件弹出框 */}
      {/* <Attachments
        beforeUpload={() => false}
        items={attachedFiles}
        onChange={handleFileChange}
        placeholder={(type) =>
          type === 'drop'
            ? {
                title: 'Drop file here',
              }
            : {
                icon: <CloudUploadOutlined />,
                title: 'Upload files',
                description: 'Click or drag files to this area to upload',
              }
        }
      /> */}
    </Sender.Header>
  );
  const logoNode = (
    <div className={styles.logo}>
      <img
        src="http://47.102.108.122:8000/avatar/12"
        draggable={false}
        alt="logo"
      />
      <span>coderhow AI</span>
    </div>
  );

  // ==================== Render =================
  return (
    <div className={styles.layout}>
      <div className={styles.menu}>
        {/* 🌟 Logo */}
        {logoNode}
        {/* 🌟 添加会话 */}
        <Button
          onClick={onAddConversation}
          type="link"
          className={styles.addBtn}
          icon={<PlusOutlined />}
          disabled
        >
          新会话
        </Button>
        {/* 🌟 会话管理 */}
        <Conversations
          items={conversationsItems}
          className={styles.conversations}
          activeKey={activeKey}
          onActiveChange={onConversationClick}
        />
      </div>
      <div className={styles.chat}>
        {/* 🌟 消息列表 */}
        <Bubble.List
          items={
            items.length > 0
              ? items
              : [
                  {
                    content: placeholderNode,
                    variant: 'borderless',
                  },
                ]
          }
          roles={roles}
          className={styles.messages}
          style={{padding:'0px 40px;'}}
        />
        {/* 🌟 提示词 */}
        <Prompts items={senderPromptsItems} onItemClick={onPromptsItemClick} />
        {/* 🌟 输入框 */}
        <Sender
          value={content}
          header={senderHeader}
          onSubmit={onSubmit}
          onChange={setContent}
          // prefix={attachmentsNode}
          loading={agent.isRequesting()}
          className={styles.sender}
        />
      </div>
    </div>
  );
};
export default Independent;
