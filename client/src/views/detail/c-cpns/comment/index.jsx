import React, { useContext,  useMemo,  useState } from 'react';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import commentListTrans from '@/utils/commentListTrans';
import CommentInput from '@/components/comment-input';
import CommentList from './comment-list';
import CommentsWrapper from './style';
import { detailContext } from '../..';
import commentListTransPlus from '@/utils/commentListTransPlus';

const Comments = props => {
	const { articleDetail } = props;
	const { update, updateNow, out_passDetail } = useContext(detailContext);
	//弹出评论框的评论id
	const [commentOutId, setCommentOutId] = useState();
	//评论列表
	const commentList = articleDetail?.comment;
	let commentListDone;
	useMemo(
		() => commentListDone = commentList && commentList.length < 50 ?  
		commentListTrans(commentList) : commentListTransPlus(commentList)
	, [commentList])
	// console.log('commentListDone',commentListDone )

	const data = commentListDone?.map((comment, i) => ({
		//评论自身id
		id: comment.id,
		//用户名
		title: comment.user?.username,
		//用户头像
		avatar: comment.user?.avatar_url,
		//用户个性签名
		sign: '',
		//评论内容
		content: comment.comment_content,
		//父评论id
		commentId: comment.id,
		childComment: comment.childComments
	}));
	//展示收藏、点赞、评论数的组件
	const IconText = ({ icon, text }) => (
		<Space>
			{React.createElement(icon)}
			{text}
		</Space>
	);

	// *点赞功能实现思路
	// 用stopPropagation(); 事件默认注册在冒泡阶段
	function likeClickHandler(e) {
		// 点赞：向服务器POST, 该评论的点赞数+1
		// ? 如何让一个用户只能赞一次？
		// 进行防抖，避免用户频繁点赞，造成频繁请求
		e.stopPropagation();
		console.log('likeClickHandler');
	}

	function commentClickHandler(e) {
		// 点击其它位置：评论
		// 怎么获取父评论id：组件不能直接绑属性，故可将id绑在img元素上(data-*)
		e.stopPropagation();
		const commentId = e.currentTarget.firstChild.lastChild.firstChild.dataset.commentid;
		// 弹出评论框
		setCommentOutId(Number(commentId));
		out_passDetail(true);
	}

	// *子评论列表是否触发输入框
	const [out, setOut] = useState(false);
	const out_pass = i => setOut(i);
	return (
		<CommentsWrapper>
			<List
				itemLayout="vertical"
				size="small"
				//分页器
        /*pagination={{
					//切页事件处理程序
					onChange: page => {
						console.log('pagination', page);
					},
					pageSize: 100
				}} */
				footer={<div></div>}
				//列表数据源
				dataSource={data}
				renderItem={item => {
					// * 弹出评论框
					let extra;
					// *占位div高度（为了子评论列表能撑开高度）

					let plHeight = item.childComment?.length ? item.childComment.length * 170.89 + 70 : 0;
					if (out) plHeight += 170.89;
					if (item.commentId === commentOutId) {
						extra = (
							<CommentInput
								articleId={articleDetail?.id}
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
					}
					// 空评论情况
					if (item.content === null) return (extra = null);

					const childComment = (
						<div className="child-comment">
							{/* 弹出评论框 */}
							{extra}
							{/* 子评论列表 */}
							<div>
								<CommentList
									index={0}
									childComment={item.childComment}
									articleId={articleDetail.id}
									hideF={() => setCommentOutId(-1)}
									out_pass={out_pass}
								/>
							</div>
						</div>
					);
					return (
						//{列表项展示配置
						<div onClick={e => commentClickHandler(e)}>
							<List.Item
								key={item.id}
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
										//  绑定评论id，注意dataset中会小驼峰会变成全小写，且数字会转为字符串
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
								{item.content}
								{childComment}
							</List.Item>
							<div className="place-holder" style={{ height: `${plHeight}px` }}></div>
						</div>
					);
				}}
			/>
		</CommentsWrapper>
	);
};
export default Comments;