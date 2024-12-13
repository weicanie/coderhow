import styled from 'styled-components';

const SectionItemsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin: 0px -8px;
	.room-item {
		width: ${props => props.width || '25%'};
		height: 350px;
	}
`;
export default SectionItemsWrapper;
