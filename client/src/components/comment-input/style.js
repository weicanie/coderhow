import styled from 'styled-components';

const CommentInputWrapper = styled.div`
	overflow: auto; //BFC清除浮动
	margin-top: 50px;
	#add-image {
		transition: color 0.2s;
		margin-left: 100px;
		cursor: pointer;
		&:hover {
			color: #1677ff;
		}
	}

	#file-image {
		display: none;
	}

	.ant-form-item-required::before {
		display: none !important;
	}
	#add-comment {
		/* background-color: #00848a; */
		background-color: white;
		position: relative;
		bottom: 20px;
		right: 0px;
		opacity: 0.7;
		border: none;
	}
	#close-comment {
		background-color: white;
		position: relative;
		bottom: 20px;
		opacity: 0.7;
		border: none;
	}
	#input-comment {
		background-color: rgb(238, 232, 236);
	}
`;
export default CommentInputWrapper;
