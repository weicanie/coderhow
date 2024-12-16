import styled from 'styled-components';

const ArticleWrapper = styled.div`
	width: 1032px;
	height: 170px;
	margin: 0px auto;
	border-top: none;
	background-color: white;
	position: relative;
	.article {
		width: 75%;
		height: 100%;
		padding: 25px 20px;
		float: left;
		.title {
			margin-bottom: 20px;
			font-weight: 600;
			font-size: 16px;
		}
		/* 首页文章MD展示 */
		.container p {
			font-size: 14px;
			color: #8a919f;
			${props => props.theme.mixin.textEllipsis}
			/* 层叠 */
			strong {
			font-size: 19px;
			color:black;
			${props => props.theme.mixin.textEllipsis}
			/* 首页取消md加粗 */
		}
		}
		

		.data {
			font-size: 13px;
			margin-top: 45px;
			color: #8a919f;
			display: flex;

			.place-holder {
				flex:3;
			}

			.tag {
				flex:3;
				span {
					float:right;
				}
			}
			.author {
				flex:3;
			}
		}
	}
	.image {
		width: 25%;
		height: 100%;
		float: left;

		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10px;
	}
	.underline {
		border-bottom: 1px solid rgb(241, 242, 243);
		width: 95%;
		position: relative;
		left: 50%;
		transform: translate(-50%);
	}
`;
export default ArticleWrapper;
