import styled from 'styled-components';

const PictureBrowserWrapper = styled.div`
	display: flex;
	justify-content: center;
	padding-top: 40px;

	background-color: gray;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	.close {
		cursor: pointer;
		position: fixed;
		right: 10px;
		top: 10px;
	}
`;
export default PictureBrowserWrapper;
