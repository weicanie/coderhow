import styled from 'styled-components';

const LogoWrapper = styled.div`
	flex: 1;
	color: ${props => props.color};
	-webkit-text-stroke: ${props => {
		if (props.color === 'transparent') {
			return 'white 0.2px';
		} else return '';
	}};
	font-size: 32px;
	font-weight: 800;
	padding-left: 40px;
`;
export default LogoWrapper;
