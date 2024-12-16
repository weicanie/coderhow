import styled from 'styled-components';

const SearchBarrWrapper = styled.div`
	width: 375px;
	height: 48px;
	cursor: pointer;
	svg {
		color: white !important;
	}
	.cover {
		position: absolute;
		top: 80px;
		transition: all 0.2s;
		height: ${props => {
			return props.isOut ? 90 : 0;
		}}px;
		right: 0;
		left: 0;
		background-color: ${props => {
			return props.bgColor;
		}};
	}


	.search-bar {
		background-color: white;
		border: 1px solid;
		border-radius:30px;
		border-color: ${props => {
			if (props.bgColor === 'transparent') return 'white';
			return '#8a919f';
		}};
		height: 48px;
		width: 100%;
		position: relative;
		left: 50%;
		transform: translate(-50%);

		padding-right: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.text {
			display: flex;
			align-items:center;
			transition:all .2s;
			height: 100%;
			border-radius:30px;
			&:hover {
				background-color: rgb(206, 210, 234);
			}
			padding-left: 40px;
			padding-right:40px;
			font-weight: 500;
			font-size: 18px;
			color: #8a919f;
			color: ${props => {
				if (props.bgColor === 'transparent') return 'white';
				return '#8a919f';
			}};
		}
		.theme,.input,.label {
			font-size:22px;
		}
		.label {
			position: relative;
			left:11px;
		}
		/* 搜索按钮 */
		.icon {
			width: 35px;
			height: 35px;
			border-radius: 50%;
			background-color: rgb(186, 170, 188);
			color: white;

			display: flex;
			justify-content: center;
			align-items: center;
		}

		${props => {
			return props.theme.mixin.boxShadow;
		}}
	}
	.search-bar-out {
		height: 48px;
		width: 50%;
		position: fixed;
		left: 50%;
		transform: translate(-50%);
		display: flex;
		justify-content: center;
		padding-right: 10px;
		.text0 {
			margin-right: 10px;
			font-size: 19px;
			position: relative;
			left: 30px;
			color: ${props => {
				if (props.bgColor === 'transparent') return 'white';
				return '#8a919f';
			}};
		}
		.text1 {
			font-weight: bold;
		}
	}
	/* 动画 */
	.search-enter,
	.search-exit-done {
		border-radius: 24px;
		height: 48px;
		width: 100%;
		transform: translate(-50%, 0);
		background-color: white;
	}
	.search-enter-active {
		border-radius: 46px;
		height: 68px;
		width: 200%;
		background-color: ${props => {
			return props.bgColor;
		}};
		transform: translate(-50%, 50px);
		transition: all 0.2s !important;
	}
	.search-enter-done,
	.search-exit {
		border-radius: 46px;
		height: 68px;
		width: 200%;
		transform: translate(-50%, 50px);
		background-color: ${props => {
			return props.bgColor;
		}};
	}
	.search-exit-active {
		border-radius: 24px;
		height: 48px;
		transform: translate(-50%, 0);
		width: 100%;
		transition: all 0.2s !important;
	}
`;
export default SearchBarrWrapper;
