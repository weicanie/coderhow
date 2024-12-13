import styled from 'styled-components';

const ToolkitWrapper = styled.div`
	background-color: white;
	position: absolute;
	top: 70px;
	right: 35px;
	width: 280px;
	height: 290px;

	border: 1px solid gray;
	border-radius: 10px;

	color: black !important;
	font-weight: bold;
	.top {
		padding-left: 15px;
		border-bottom: 1px solid gray;
		height: 40%;
		.login,
		.sumit {
			height: 50%;
			display: flex;
			align-items: center;
		}
	}
	.buttom {
		padding-left: 15px;
		height: 60%;
		.rent,
		.open,
		.help {
			height: 33.33333%;
			display: flex;
			align-items: center;
		}
	}
`;
export default ToolkitWrapper;
