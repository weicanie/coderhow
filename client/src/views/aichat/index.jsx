import Independent from '@/base-ui/chatgpt-io'
import { setBgColor, setIsOut, setPageName } from '@/store/modules/header';
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux';

const AIChat = memo(() => {
  React.useEffect(() => {
		document.body.style.backgroundColor = ' rgb(242,243,245)';
		return () => (document.body.style.backgroundColor = '');
	}, []);

  const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageName('user-center'));
		dispatch(setIsOut(false));
		dispatch(setBgColor('white'));
	}, [dispatch]);
  return (
    <Independent/>
  )
})

export default AIChat