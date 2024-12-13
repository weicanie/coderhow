import styled from 'styled-components';

const CommentsWrapper = styled.div`
	// * 去掉没用但占位的单评论组件部分
	.ant-list-something-after-last-item {
		height: 0px !important;
	}
	.child-comment {
		position: relative;
		top: 10px;
	}
	.ant-list-item-meta-description {
		height: auto;
	}
`;
export default CommentsWrapper;
