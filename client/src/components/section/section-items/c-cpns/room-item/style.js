import styled from 'styled-components';

const RoomItemWrapper = styled.div`
	height: 100%;
	padding: 8px;
	.picture-container {
		height: 66.777%;
		img {
			width: 100%;
			height: 100%;
		}
	}
	.type {
		color: ${props => props.textColor};
	}
	.desc {
		${props => props.theme.mixin.textEllipsis}
	}

	.MuiRating-root {
		font-size: 14px;
		color: #008489;
	}
`;
export default RoomItemWrapper;
