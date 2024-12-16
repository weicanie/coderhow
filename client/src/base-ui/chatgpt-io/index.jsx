import {Bubble,Conversations,Prompts,Sender,Welcome,useXAgent,useXChat,} from '@ant-design/x';
import React, { useEffect } from 'react';
import {
  EllipsisOutlined,
  PlusOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Avatar, Button, message, message as messager, Space } from 'antd';
import postQuestionToAI from '@/services/modules/aichat/post-to-AI';
import  { useStyle } from './style';
import useNavigator from '@/hooks/useNavigator';
import { aiAvatar, placeholderPromptsItems, senderPromptsItems } from './config';
import getFromLS from '@/utils/ls_get';
import postConversation from '@/services/modules/aichat/postConversation';
import getConversationList from '@/services/modules/aichat/getConversationList';

// *会话栏
let defaultConversationsItems ;
// *更新会话和会话列表
async function getConversationListAndUpdate(setMessages, activeKey, setConversationsItems) {
  const conversationList = await getConversationList();
  // console.log('getConversationListAndUpdate', conversationList)
  //浅拷贝
  const newMessages = conversationList&&conversationList[activeKey]?.content.map(item => item)
  setMessages(newMessages? newMessages : [])
  if (!conversationList) {
    defaultConversationsItems = [
      {
        key: '0',
        label: 'Conversation 0',
      },
    ];
  } else {
    defaultConversationsItems = conversationList.map(item => ({
      key: item.keyname,
      label: item.label
    }))
  }
  setConversationsItems(defaultConversationsItems)
// console.log('defaultConversationsItems', defaultConversationsItems)
}

const avatar_url = getFromLS('user')?.avatar_url;
// *聊天气泡配置
const roles = {
  //ai聊天气泡
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
    avatar:<Avatar src={'http://47.102.108.122:8000/avatar/14'} alt="默认头像" size={60}/>,
  },
  //用户聊天气泡
  local: {
    placement: 'end',
    avatar:<Avatar src={avatar_url} alt="默认头像" size={60}/>,
  },
};
const AIChat = () => {
  const token = getFromLS('user')?.token
  const navigator = useNavigator()
  const toHome = () => {
    navigator('/home')
  }

  const { styles } = useStyle();

  const [headerOpen, setHeaderOpen] = React.useState(false);
  const [content, setContent] = React.useState('');
  // *会话栏
  const [conversationsItems, setConversationsItems] = React.useState();
  // 哪个历史会话被选中
  const [activeKey, setActiveKey] = React.useState(0);

  const [agent] = useXAgent({
    request: async (conversation, { onSuccess }) => {
      // messages保存了本次会话的问答数据
      // *作为上下文发送给服务器（考虑token长度，限制其长度，先定为字符串总长不超过2500）
      const {message, messages} = conversation;
      messages.pop();
      // *回到首页功能
      if (message === '回到首页') toHome()

      try {
        // 将提问上传服务器给chatgpt进行解答
        const answer = await postQuestionToAI(message, messages);
        // 展示回答
        if (answer) onSuccess(answer);
      } catch (error) {
        console.log('useXAgent error', error)
        messager.info('网络出了点问题，修复中~')
      }

    },
  });

  // ! messages是当前的会话数据（不是新增）
  const { onRequest, messages, setMessages } = useXChat({
    agent,
  });

  // *展示服务器储存的会话列表，且可以由用户续写
  useEffect(() => {
    getConversationListAndUpdate(setMessages, activeKey, setConversationsItems)
  }, [activeKey])


  const onSubmit = (nextContent) => {
    if (!nextContent) return;
    onRequest(nextContent);
    setContent('');
  };
  const onPromptsItemClick = (info) => {
    onRequest(info.data.description);
  };
  const onAddConversation = async () => {
    if (!token) {
      message.info('请先登录~')
      return
    }
    // *上传上一会话和新建这一会话
    await postConversation(activeKey, conversationsItems[activeKey].label, messages)
    await postConversation((+conversationsItems[conversationsItems.length - 1].key) + 1, `Conversation ${conversationsItems.length}`, [])
    setConversationsItems([
      ...conversationsItems,
      {
        key: `${conversationsItems.length}`,
        label: `Conversation ${conversationsItems.length}`,
      },
    ]);
    setActiveKey(`${conversationsItems.length}`);
  };
 // *切换历史会话前，将上一个会话上传服务器
  const onConversationClick = async (key) => {
    if (!token) {
      message.info('请先登录~')
      return
    }
    await postConversation(activeKey, conversationsItems[activeKey].label, messages)
    setActiveKey(key);
  };

  const placeholderNode = (
    <Space direction="vertical" size={16} className={styles.placeholder}>
      <Welcome
        variant="borderless"
        icon={aiAvatar}
        title="亻尔女子，这是 coderhow AI 助手~"
        description="coderhow AI 助手"
        styles={{
          list: {
            width: 500,
          },
        }}
/*         extra={
          <Space>
            <Button icon={<ShareAltOutlined />} />
            <Button icon={<EllipsisOutlined />} />
          </Space>
        } */
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

  // *将消息内容列表映射到聊天框
  const items = messages.map(({ id, message, status }) => ({
    key: id,
    loading: status === 'loading',
    role: status === 'local' ? 'local' : 'ai',
    content: message,
  }));

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
    </Sender.Header>
  );
  const logoNode = (
    <div className={styles.logo}>
      <img
        src={aiAvatar}
        draggable={false}
        alt="logo"
      />
      <span>coderhow AI</span>
    </div>
  );

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
export default AIChat;
