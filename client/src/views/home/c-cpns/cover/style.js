import styled from 'styled-components';

const CoverWrapper = styled.div`
	width: 100%;
	margin-bottom:50px;
	img {
		width: 100%;
		min-height: 598px;
		min-width: 1063px;
		transition:all .5s;
		transform: ${props => {
			if (props.bgColor === 'transparent') {
				return 'scale(1.05)';
			} else {
				return 'scale(1.0)';
			}
		}};
	}
`;
export default CoverWrapper;
