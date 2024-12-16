import React, { memo, useEffect, useState } from 'react';
import DetailWrapper from './style';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import PictureShow from '@/base-ui/select-show';
import PictureBrowser from '@/base-ui/picture-browser';
import { setBgColor, setIsOut, setPageName } from '@/store/modules/header';
import Header from '@/components/app-header';
import Comments from './c-cpns/comment';
import UserCard from '@/components/user-card';
import CommentInput from '@/components/comment-input';
import useFetchData from '@/hooks/useFetchData';
import MdShow from '@/base-ui/md-show';
import getArticle from '@/services/modules/article/getArticle';
import fetchData from '@/utils/fetchData';
import articleMdShow from '@/utils/articleMdShow';
export const detailContext = React.createContext();

const Detail = memo(() => {
	const [isBrowserShow, setIsBrowserShow] = useState(false);
	const [articleDetail, setArticleDetail] = useState();
	const [update, updateNow] = useState(0);
	const index = useParams().index;
	// 为了在detail处刷新页面时能重新请求数据
	// 问题：组件重新渲染时不重新执行useFetchData（自定义hook）
	useFetchData(
		setArticleDetail,
		{
			fetcher: getArticle
		},
		index
	);

	fetchData(setArticleDetail, getArticle, update, index);

	const { username, avatar_url } = articleDetail ? articleDetail.author : {};

	useEffect(() => {
		document.body.style.backgroundColor = ' rgb(242,243,245)';
		return () => (document.body.style.backgroundColor = '');
	}, []);

	// *图片浏览器
	const clickHandler = () => {
		window.scrollTo(0, 0);
		setIsBrowserShow(!isBrowserShow);
	};
	const isBrowserShow_pass = input => {
		window.scrollTo(0, 0);
		setIsBrowserShow(input);
	};

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setPageName('detail'));
		dispatch(setIsOut(false));
		dispatch(setBgColor('white'));
	}, [dispatch]);
	// *评论列表是否触发输入框
	const [out, setOut] = useState(false);
	const out_passDetail = i => setOut(i);

	// console.log(articleDetail)
	return (
		<detailContext.Provider value={{ update, updateNow, out_passDetail }}>
			{articleDetail && (
				<DetailWrapper>
					<Header flashControl={false} isFixed={false} />
					<PictureShow
						pictureURLs={articleDetail.imagelist}
						isBrowserShow_pass={isBrowserShow_pass}
					/>

					{isBrowserShow && (
						<PictureBrowser
							pictureURLs={articleDetail.imagelist}
							isBrowserShow_pass={isBrowserShow_pass}
						/>
					)}

					<div className="showBrowser" onClick={clickHandler}>
						浏览图片
					</div>
					<div className="section">
						<UserCard username={username} avatar_url={avatar_url} />
						{/* 文章内容展示 */}
						<div className="underline top"></div>
						<MdShow value={articleMdShow(articleDetail.title, articleDetail.content, false, articleDetail.ai_summary)} />
						<div className="underline bottom"></div>
						{/* 评论区 */}
						{/* 添加评论 */}
						{!out && (
							<CommentInput
								articleId={articleDetail.id}
								setArticleDetail={setArticleDetail}
								updateNow={updateNow}
								update={update}
								clickHandler={e => {
									e.stopPropagation();
									out_passDetail(true);
								}}
							/>
						)}
						{articleDetail && <Comments articleDetail={articleDetail} />}
					</div>
				</DetailWrapper>
			)}
		</detailContext.Provider>
	);
});

export default Detail;
