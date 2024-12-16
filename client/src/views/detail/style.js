import styled from 'styled-components';

const DetailWrapper = styled.div`
	.showBrowser {
		cursor: pointer;
		position: absolute;
		right: 20px;
		top: 630px;
		width: 100px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #00848a;
		color: white;
		font-size: 14px;
		border-radius: 5px;
	}

	.title {
		margin-top: 20px;
		margin-bottom: 20px;
		font-weight: 600;
		font-size: 18px;
		position: relative;
		left: 30px;
	}

	//文章内容
	.container p {
		margin-bottom: 10px !important;
		width: 80%;
	}

	//去掉空数据提示
	.ant-empty-image {
		display: none;
	}
	.ant-empty-description {
		display: none;
	}

	/* 划分区域 */
	.section {
		width: 1162px;
		background-color: #fff !important;
		border-radius: 5px;
		height: 2000px;
		padding-top: 40px;
		padding-left: 50px;
		position: relative;
		left: 120px;
	}
	.underline {
		border-bottom: 1px solid rgb(216,222,228);
		width: 100%;
		position: relative;
		left: 50%;
		transform: translate(-50%);
	}
	.underline.top {
		margin-top: 0px;
		margin-bottom: 70px;
	}
	.underline.bottom {
		margin-top: 20px;
		margin-bottom: 50px;
	}
`;
export default DetailWrapper;
