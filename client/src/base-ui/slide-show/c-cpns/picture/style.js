import styled from 'styled-components';

const PictruesWrapper = styled.div`
	height: 153px;
	width: 212px;
	overflow: hidden;
	.pic {
		img {
			height: 153px;
			width: 212px;
			border-radius: 10px;
		}
	}
	.pic-containner {
		transition: transform 0.2s;
		transform: translate(${props => props.move}px);
		height: 143px;
		width: 212px;
		display: flex;
	}
`;
export default PictruesWrapper;
