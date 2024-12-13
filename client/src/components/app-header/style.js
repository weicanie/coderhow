import styled from 'styled-components';

const HeaderWrapper = styled.div`
	transition: all 0.2s;
	color: ${props => {
		if (props.bgColor === 'transparent') {
			return 'white';
		} else {
			return 'black';
		}
	}};
	svg {
		color: ${props => {
			if (props.bgColor === 'transparent') {
				return 'white';
			} else {
				return 'red';
			}
		}};
	}
	display: flex;
	align-items: center;
	/* position: fixed; */
	position: ${props => {
		if (props.isFixed) {
			return 'fixed';
		} else {
			return 'relative';
		}
	}};
	min-width: 1032px;
	width: 100%;
	height: 80px;
	background-color: ${props => {
		return props.bgColor;
	}};
	z-index: 999;
	.search-bar {
	}
`;
export default HeaderWrapper;
