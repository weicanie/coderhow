import React, { memo } from 'react';
import HeaderWrapper from './style';
import SearchBar from './c-cpns/search-bar';
import Profile from './c-cpns/profile';
import Logo from './c-cpns/logo';
import { shallowEqual, useSelector } from 'react-redux';
const Header = memo(props => {
	const { flashControl, isFixed } = props;
	const { bgColor } = useSelector(state => {
		return {
			bgColor: state.header.bgColor
		};
	}, shallowEqual);
	return (
		<HeaderWrapper isFixed={isFixed} bgColor={bgColor}>
			<Logo />
			<SearchBar flashControl={flashControl} />
			<Profile />
		</HeaderWrapper>
	);
});

export default Header;
