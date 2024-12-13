import styled from 'styled-components';

const ButtonWrapper = styled.div`
	background-color: ${props => {
		return props.bgColor;
	}};
	margin-right: 20px;
	display: flex;
	justify-content: center;
	align-items: center;

	border: 1.5px solid;
	border-color: ${props => {
		if (props.bgColor === 'transparent') {
			return 'white';
		} else {
			return '#8a919f';
		}
	}};
	border-radius: 24px;
	padding: 10px 10px;
	.toolkit {
		margin-right: 10px;
	}
	${props => props.theme.mixin.boxShadow}

	.toolkit svg, .avater svg {
		color: ${props => {
			if (props.bgColor === 'transparent') {
				return 'white';
			} else {
				return '#8a919f';
			}
		}};
	}
`;
export default ButtonWrapper;
