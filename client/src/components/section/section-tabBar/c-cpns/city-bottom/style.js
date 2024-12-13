import styled from 'styled-components';

const BottomrWrapper = styled.div`
	cursor: pointer;
	width: 190px;
	flex-shrink: 0;
	height: 250px;
	margin-right: 20px;
	/* 放在这无效且下面的样式也失效，放下面就生效了，为什么？？？？？
background:url(${props => props.bgImage}) */
	.city-bottom {
		width: 100%;
		position: relative;
		top: 170px;
		.city-name {
			text-align: center;
			color: white;
			font-size: 18px;
			font-weight: bold;
		}
		.city-price {
			text-align: center;
			color: white;
		}
	}
	background:
		linear-gradient(0deg, rgb(0, 0, 0) 3%, rgba(0, 0, 0, 0) 50%),
		url(${props => props.bgImage}) center/cover;
`;
export default BottomrWrapper;
