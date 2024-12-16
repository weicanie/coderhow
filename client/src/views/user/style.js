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
	}
	#add-image {
		transition: color 0.2s;
		margin-left: 100px;
		cursor: pointer;
		&:hover {
			color: #1677ff;
		}
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
		display: none;
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

	#user-card {
		border: 2.5px solid rgb(245, 245, 245);
		border-radius: 7px;
	}
	#control-box {
		width: 150px;
		height: 243px;
	}

	//dashboard mui组件，去掉多余内容
	h6.MuiTypography-root {
		display: none;
	}
	div.css-yzjoij {
		display: none;
	}
`;
export default UserWrapper;
