import styled from 'styled-components';

const SlideShowWrapper = styled.div`
	position: relative;
	cursor: pointer;
	svg {
		color: white;
		width: 80px !important;
		height: 80px !important;
	}

	.left,
	.right {
		cursor: pointer;
		position: absolute;
		top: 0px;
		height: 700px;
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.right {
		right: -270px;
	}
	.left {
		left: -270px;
		z-index: 1;
	}

	.show-indicator,
	.hide-indicator {
		color: white;
		border: 1px solid white;
		width: 120px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		position: fixed;
		bottom: 10px;
		left: 50%;
		transform: translate(-50%);
		border-radius: 5px;
		font-size: 14px;
	}

	/* 照片列表动画 */
	/* 不设置transform动画的原因：组件本身使用了transform，需要在这基础上设置动画比较麻烦 */
	.rtg_list-enter {
		opacity: 0;
	}
	.rtg_list-enter-active {
		opacity: 1;
		transition: all 0.5s ease;
	}
	.rtg_list-enter-done {
		opacity: 1;
	}
	.rtg_list-exit {
		opacity: 1;
	}
	.rtg_list-exit-active {
		opacity: 0;
		transition: all 0.5s ease;
	}
	.rtg_list-exit-done {
		opacity: 0;
		transition: all 0.5s ease;
	}
`;
export default SlideShowWrapper;
