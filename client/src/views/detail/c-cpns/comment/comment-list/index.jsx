import React, { useContext, useEffect, useState } from 'react';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, Button, ConfigProvider, List, Space } from 'antd';
import CommentInput from '@/components/comment-input';
import deepCopy from '@/utils/wei_deepCopy';
import { detailContext } from '@/views/detail';
import CommentListWrapper from './style';

const CommentList = props => {
	const { childComment, articleId, out_pass, hideF } = props;
	const { update, updateNow } = useContext(detailContext);
	// 弹出评论框的评论id
	const [commentOutId, setCommentOutId] = useState(-1);
	// 子评论列表
	const data = childComment?.map((comment, i) => ({
		//评论自身id
		id: comment.id,
		//用户名
		title: comment.user.username,
		//用户头像
		avatar: comment.user.avatar_url,
		//用户个性签名

		//评论内容
		content: comment.comment_content,
		//评论id（父评论）
		commentId: comment.id,
		answer: comment.commentTo?.user?.username
	}));
	//展示收藏、点赞、评论数的组件
	const IconText = ({ icon, text }) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);

	function likeClickHandler(e) {
		//点赞 : 向服务器POST, 该评论的点赞数+1
		console.log('likeClickHandler');
	}

	function commentClickHandler(e) {
		//点击其它位置：评论
		// *怎么获取父评论id，组件不能直接绑属性，则将id绑在其图片上(data-*)
		e.stopPropagation();
		const commentId = e.currentTarget.lastChild.lastChild.dataset.commentid;
		//弹出评论框
		setCommentOutId(Number(commentId));
		hideF();
	}

	return (
		<CommentListWrapper>
			<List
				itemLayout="vertical"
				size="small"
				//分页器
				pagination={{
					//切页事件处理程序
					onChange: page => {
						console.log('pagination', page);
					},
					pageSize: 100
				}}
				footer={<div></div>}
				//列表数据源
				dataSource={data}
				renderItem={item => {
					// *弹出评论框
					let extra, close;
					if (item.commentId === commentOutId) {
						out_pass(true);
						extra = (
							<CommentInput
								articleId={articleId}
								commentToId={item.commentId}
								updateNow={updateNow}
								update={update}
								clickHandler={e => {
									e.stopPropagation();
									out_pass(false);
									setCommentOutId(-1);
								}}
							/>
						);
						close = (
							<Button type="primary" id="close-input">
								关闭
							</Button>
						);
					}
					return (
						<ConfigProvider>
							{/* 列表项展示配置 */}
							<List.Item
								//FIXME列表项被点击时（重新渲染）错位
								// !deepCopy导致错位！？去掉deepCopy后就好了
								key={item.id}
								onClick={commentClickHandler}
								// 点赞、评论
								actions={[
									<IconText
										icon={LikeOutlined}
										text="0"
										key="list-vertical-like"
										// clickFlag = 'list-like' 只是成为了组件的参数，没有成为组件内HTML的属性
									/>,
									<IconText icon={MessageOutlined} text="0" key="list-vertical-message" />
								]}
								//右侧添加：图像
								extra={
									<img
										//  绑定评论id，注意dataset中会小驼峰会变成全小写
										data-commentid={item.commentId}
										width={272}
										alt=""
									/>
								}
							>
								<List.Item.Meta
									avatar={<Avatar src={item.avatar} size={50} />}
									title={<p>{item.title}</p>}
									description={item.description}
								/>
								{/* 评论内容 */}
								{item.answer ? `回复${item.answer}：` : ''}
								{item.content}
								{extra}
							</List.Item>
							{/* 弹出评论框 */}
						</ConfigProvider>
					);
				}}
			/>
		</CommentListWrapper>
	);
};

export default CommentList;
