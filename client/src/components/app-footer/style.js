import styled from 'styled-components';

const FooterWrapper = styled.div`
	/* position: relative;
top:200px; */
	position: absolute;
	width: 100%;
	bottom: 0;
	.top {
		border-top: 1px solid gray;
		border-bottom: 1px solid gray;
		display: flex;
		font-weight: bold;
		> div {
			padding: 50px 0px 40px 60px;
			flex: 1;
		}
	}
	.buttom {
		margin-top: 10px;
		text-align: center;
	}
`;
export default FooterWrapper;
