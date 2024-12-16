import styled from 'styled-components';

const UserCardWrapper = styled.div`
	.desc {
		color: #8a919f;
		font-size: 14px;
		margin-top: 10px;
		position: relative;
		left:115px;
		bottom:40px;
	}
	.username {
		font-weight: 500;
		position: relative;
		left: 15px;
		font-size: 24px;
	}
	.option {
		width: 150px;
		height: 30px;
		margin-top:20px;
		text-align:center;
		line-height:25px;
		border: 1px solid  #8a919f;;
		border-radius:5px;
		cursor: pointer;
		label {
			cursor: pointer;
			color: #8a919f;
			transition:color .2s;
			&:hover {
				color:rgb(2, 9, 22);
			}
		}
	}
	.avatar{

	}
	.sign {

	}
	.quit {

	}
`;
export default UserCardWrapper;
