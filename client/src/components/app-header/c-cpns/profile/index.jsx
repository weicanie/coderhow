import React, { memo, useEffect, useState } from 'react';
import ProfilerWrapper from './style';
import ProfileButton from './c-cpns/prifile-button';
import Toolkit from './c-cpns/toolkit';
import { useSelector } from 'react-redux';
import useNavigator from '@/hooks/useNavigator';
import getFromLS from '@/utils/ls_get';
import { RobotFilled, RobotOutlined } from '@ant-design/icons';

const Profile = memo(() => {
	//控制toolkit的显示
	const [isShow, setIsShow] = useState(false);
	useEffect(() => {
		window.addEventListener(
			'click',
			() => {
				setIsShow(false);
			},
			true
		); //注册在捕获阶段。flase或者省略则注册在冒泡阶段。决定了事件处理程序的执行顺序。
	}, []);
	//控制登录何注册按钮显示
	const [isBtnShow, setIsBtnShow] = useState(true);
	const token = getFromLS('user')?.token;
	useEffect(() => {
		if (token) {
			setIsBtnShow(false);
		} else {
			setIsBtnShow(true);
		}
	}, [token]);

	const navigator = useNavigator();

	function clickHandler() {
		setIsShow(!isShow);
	}
	const { bgColor } = useSelector(state => {
		return {
			bgColor: state.header.bgColor
		};
	});
	const toCustomerPage = useNavigator('/user');
	// console.log('Profile')
	const toAI = () => {
		navigator('/aichat')
	}
	return (
		<ProfilerWrapper bgColor={bgColor}>
			{isBtnShow && (
				<>
					<div className="profile-login" onClick={() => toCustomerPage()}>
						登录 / 注册
					</div>
					{/* <div className="profile-submit" onClick={() => toCustomerPage()}>注册</div> */}
				</>
			)}
			<div className="profile-global"
			onClick={toAI}
			>
			{/* <OpenAIOutlined
				spin
				style={{
					fontSize:'30px'
				}}
			/> */}
			<RobotOutlined 

					style={{
						fontSize:'25px'
					}}
			/>
			<span className='ai'>AI</span>
			
			<RobotFilled
				spin
				style={{
					fontSize:'25px'
				}}
			/>
			</div>
			<ProfileButton
				onClick={() => {
					//TODO为什么点击无反应？
					console.log('ProfileButton');
					clickHandler();
					navigator('/user-center');
				}}
			/>
			{isShow && <Toolkit />}
		</ProfilerWrapper>
	);
});

export default Profile;
