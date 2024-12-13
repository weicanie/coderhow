import styled from 'styled-components';

const SlideShowWrapper = styled.div`
	position: relative;
	width: 212px;
	cursor: pointer;
	svg {
		color: white;
	}
	&:hover {
		.left,
		.right {
			visibility: visible;
		}
	}
	.left,
	.right {
		cursor: pointer;
		border-radius: 10px;
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 30%;
		display: flex;
		justify-content: center;
		align-items: center;
		visibility: hidden;
	}
	.right {
		background: linear-gradient(-90deg, rgb(0, 0, 0, 0.6), rgb(0, 0, 0, 0));
		right: 0px;
	}
	.left {
		z-index: 1;
		background: linear-gradient(90deg, rgb(0, 0, 0, 0.6), rgb(0, 0, 0, 0));
	}
`;
export default SlideShowWrapper;
