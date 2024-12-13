import styled from 'styled-components';
const slideCount = 7;
const width = 106.5;
const height = 70;
const margin = 8;
const step = width + margin * 2;
const IndicatorWrapper = styled.div`
	overflow: hidden;
	width: ${step * slideCount}px;
	position: absolute;

	left: 420px;
	top: 600px;
	transform: translate(-50%);

	.list_container {
		display: flex;
		align-items: center;
		transition: transform 0.2s;
		transform: translate(${props => props.move}px);

		.point {
			position: relative;
			margin: 0px ${margin}px;
			flex: 0 0 ${width}px;
			height: ${height}px;

			background-color: white;
			img {
				height: 100%;
				width: 100%;
			}
			.cover {
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				background-color: black;
				opacity: 0.7;
			}
		}
		.curIndex {
			background-color: pink;
			.cover {
				opacity: 0;
			}
		}
	}
`;
export default IndicatorWrapper;
export { step };
