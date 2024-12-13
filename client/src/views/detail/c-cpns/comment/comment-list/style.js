import styled from 'styled-components';

const CommentListWrapper = styled.div`
	// * 去掉空数据提示
	position: relative;
	top: 80px;
	.ant-empty-image {
		display: none;
	}
	.ant-empty-description {
		display: none;
	}
`;
export default CommentListWrapper;
