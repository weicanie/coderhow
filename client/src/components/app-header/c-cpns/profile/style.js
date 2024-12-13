import styled from 'styled-components';

const ProfilerWrapper = styled.div`
	flex: 1;
	display: flex;
	justify-content: flex-end;
	height: 48px;

	.profile-login,
	.profile-submit,
	.profile-global {
		margin-right: 20px;
		display: flex;
		justify-content: center;
		align-items: center;

		font-weight: 500;
		font-size:15px;
		padding: 0 10px;
		transition: background-color 0.2s;
		border-radius: 25px;
		cursor: pointer;
		&:hover {
			background-color: rgb(206, 210, 234);
		}
	}
	.profile-global svg {
		color: ${props => {
			if (props.bgColor === 'transparent') {
				return 'white';
			} else {
				return '#8a919f';
			}
		}};
	}
	span.ai {
		color: ${props => {
			if (props.bgColor === 'transparent') {
				return 'white';
			} else {
				return '#8a919f';
			}
		}};
		margin:0px 2px;
	}
	.profile-global {
		padding: 0 15px;
		transition: background-color 0.2s;
		&:hover {
			border-radius: 30px;
			background-color: rgb(206, 210, 234);
		}
	}
`;
export default ProfilerWrapper;
