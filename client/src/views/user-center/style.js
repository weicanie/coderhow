import styled from 'styled-components';

const UserWrapper = styled.div`
	.place-holder {
		height: 80px;
	}

	#basic {
		position: relative;
		left: 50%;
		top: 40px;
		transform: translate(-66%);
	}

	#register {
		position: relative;
		left: 50%;
		transform: translate(-66%);
		top: 40px;
	}
	#toCommit {
		transition: color 0.2s;
		margin-left: 160px;
		cursor: pointer;
		&:hover {
			color: #1677ff;
		}
	}
	#area {
		position: relative;
		bottom: 250px;
		left: 150px;
		width: 80%;
	}
	#add-image,
	#span-btn {
		transition: color 0.2s;
		margin-left: 100px;
		cursor: pointer;
		&:hover {
			color: #1677ff;
		}
	}
	#span-btn-preview {
		display: block;
		transition: color 0.2s;
		margin-left: 100px;
		cursor: pointer;
		position: relative;
		right: 100px;
		top: 20px;
		font-size: 16px;
		width: 100px;
		height: 35px;
		text-align: center;
		line-height: 35px;
		color: white;
		border-radius: 7px;
		background-color: rgb(0, 132, 137);

		${props => {
			return props.theme.mixin.boxShadow;
		}}
	}

	#add-tag {
		transition: color 0.2s;
		margin-left: 100px;
		cursor: pointer;
		&:hover {
			color: #1677ff;
		}
	}
	#file-image {
		opacity: 0;
	}

	#avatar {
		opacity: 0.5;
		transition: opacity, 0.2s;
		svg {
			transition: opacity, 0.2s;
			opacity: 0.5;
		}
		cursor: pointer;
		&:hover {
			opacity: 1;
			svg {
				opacity: 1;
			}
		}
	}
	#quit {
		opacity: 0.5;
		transition: opacity, 0.2s;
		svg {
			transition: opacity, 0.2s;
			opacity: 0.5;
		}
		cursor: pointer;
		&:hover {
			opacity: 1;
			svg {
				opacity: 1;
			}
		}
	}

	#user-card {
		border: 2.5px solid rgb(245, 245, 245);
		border-radius: 7px;
	}

	#control-box {
		width: 150px;
		height: 243px;
	}
	#post-article {
		background-color: #00848a;
		position: relative;
		left: 50px;
	}
	.ant-form-item-required::before {
		display: none !important;
	}

	//dashboard mui组件，去掉多余内容
	h6.MuiTypography-root {
		display: none;
	}
	div.css-yzjoij {
		display: none;
	}

	//左侧控制按钮
	div.ant-segmented-vertical {
		width: 95px !important;
	}
	//预览标题
	.title {
		margin-top: 40px;
		margin-bottom: 20px;
		font-weight: 600;
		font-size: 18px;
	}
`;
export default UserWrapper;
