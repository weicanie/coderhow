import styled from 'styled-components';
const width = 840;
const height = 560;
const picWidth = width;

const PictruesWrapper = styled.div`
	height: ${height}px;
	width: ${width}px;
	overflow: hidden;
	.pic {
		img {
			height: ${height}px;
			width: ${width}px;
		}
	}
	.pic-containner {
		transition: transform 0.2s;
		transform: translate(${props => props.move}px);
		height: ${height}px;
		width: ${width}px;
		display: flex;
	}
`;
export default PictruesWrapper;
export { picWidth };
