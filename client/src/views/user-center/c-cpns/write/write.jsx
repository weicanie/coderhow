import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import uploadArticle from '@/services/modules/article/uploadArticleWithimage';
import FormData_wei from '@/utils/formdata_wei';
import MdEditor from '@/base-ui/md-editor';
import getFromLS from '@/utils/ls_get';
import { message } from 'antd';
import MdShow from '@/base-ui/md-show';
import TagList from './c-cpns/tagList';
import articleMdShow from '@/utils/articleMdShow';
const formdata_wei = new FormData_wei();
const formItemLayout = {};
const tailFormItemLayout = {};
// 获取标签
let tag = []
export const taglist_pass = (i) => {
	tag = i
}
const App = props => {
	const { token } = getFromLS('user');
	const [content, setContent] = useState();
	const [title, setTitle] = useState();
	const [isPreview, setIsPreview] = useState(false);
	const [isMD, setIsMD] = useState(true);
	const [form] = Form.useForm();

	const onFinish = async values => {

		if (isMD) {
			values = {
				content,
				title: values.title,
			};
		}
		if (!values.content) {
			message.info('内容不能为空~');
			return;
		}
		values.tag = tag;
		message.success('内容已提交审核~');
		await uploadArticle(values, token);
		await formdata_wei.removeAll('article_image');
		setContent(values.content);
		setTitle(values.title);
		setIsPreview(true);
	};
	//控制显示编辑器还是预览
	let item = (
		<>
			<Form.Item
				name="title"
				label="标题"
				rules={[
					{
						required: true,
						message: '请输入标题'
					}
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item name="content" label="内容">
				{!isMD && <Input.TextArea showCount maxLength={700} rows={20} />}
				{isMD && <MdEditor setContent={setContent} />}
			</Form.Item>

			<Form.Item {...tailFormItemLayout}>
				<Button type="primary" htmlType="submit" id="post-article">
					发布
				</Button>
				<label id="add-image" htmlFor="file-image">
					+ 添加配图
				</label>
				<span 
          id ='add-tag'
        >
          添加标签 :
        </span>
				
				<span id="span-btn" onClick={() => setIsMD(!isMD)}>
					{isMD ? '-> 切换到文本编辑器' : '-> 切换到md编辑器'}
				</span>
				<input
					type="file"
					id="file-image"
					multiple
					onChange={e => formdata_wei.addFiles('article_image', e.target.files)}
				/>
				<TagList taglist_pass={taglist_pass}/>
			</Form.Item>
		</>
	);
	if (isPreview)
		item = (
			<>
				<MdShow value={articleMdShow(title, content)} bgColor = {'rgb(242,243,245)'}/>
				<span
					id="span-btn-preview"
					style={{
						position: 'relative',
						right: '100px',
						top: '20px',
						fontSize: '14px'
					}}
					onClick={() => setIsPreview(false)}
				>
					{'结束预览'}
				</span>
			</>
		);
	return (
		<Form
			{...formItemLayout}
			form={form}
			name="write"
			onFinish={onFinish}
			style={{
				width: 930,
				position: 'relative',
				left: 100
			}}
			scrollToFirstError
		>
			{item}
		</Form>
	);
};
export default App;
export { formdata_wei };
