import React, { memo } from 'react';
import ButtonWrapper from './style';
import IconAvatar from '@/assets/svg/icon_avatar';
import IconMenu from '@/assets/svg/icon_menu';
import { useSelector } from 'react-redux';
import useNavigator from '@/hooks/useNavigator';

const ProfileButton = memo(() => {
	// console.log('ProfileButton')
	const { bgColor } = useSelector(state => {
		return {
			bgColor: state.header.bgColor
		};
	});
	const navigator = useNavigator();
	return (
		<ButtonWrapper bgColor={bgColor} onClick={() => navigator('/user-center')}>
			<div className="toolkit">
				<IconMenu />
			</div>
			<div className="avater">
				<IconAvatar />
			</div>
		</ButtonWrapper>
	);
});

export default ProfileButton;
