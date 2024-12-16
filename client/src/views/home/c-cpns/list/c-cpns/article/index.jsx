import React, { createContext, memo } from 'react';
import ArticleWrapper from './style';
import SlideShow from '@/base-ui/slide-show';
import MdShow from '@/base-ui/md-show';
import useNavigator from '@/hooks/useNavigator';
import { Tag } from 'antd';
import articleMdShow from '@/utils/articleMdShow';
export const articleContext = createContext();
const Article = memo(props => {
	const { imageList, article } = props;
	console.log('Article',article )
	const pictureUrls = imageList;
	const naviagtor = useNavigator();
	return (
		<ArticleWrapper>
			<div className="article" onClick={() => naviagtor(`/detail/${article?.id}`)}>
				{/* <div className="title">{article?.title}</div> */}
				<MdShow value={articleMdShow(article?.title, article?.content, true)} />
				<div className="data">
					<div className="author">作者：{article?.author.username}</div>
					{/* <div className="read-count">阅读数</div> */}
					{/* <div className="prise-count">点赞数</div> */}
					<div className="place-holder"></div>
					<div className="tag">
						{
							article.tag?.map(item => (
								<Tag
									key={item.content}
									style={{color: '#8a919f'}}
								>
									{item.content}
								</Tag>
							))
						}
			</div>
				</div>
			</div>
			<div className="image">
				<articleContext.Provider value={{ articleId: article?.id }}>
					<SlideShow pictureUrls={pictureUrls} />
				</articleContext.Provider>
			</div>
			<div className="underline"></div>
		</ArticleWrapper>
	);
});

export default Article;
