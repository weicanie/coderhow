import React, { useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';

export default function MdEditor(props) {
	const [value, setValue] = React.useState();
	const { setContent } = props;
	useEffect(() => {
		setContent(value);
	}, [value]);
	console.log('MdEditor', value);
	//默认亮色主题

	//默认高度
	useEffect(() => {
		document.querySelector('div.w-md-editor-show-live').style.height = '500px';
		document.documentElement.setAttribute('data-color-mode', 'light');
		return () => {
			document.documentElement.setAttribute('data-color-mode', '');
		};
	}, []);

	return (
		<div className="container">
			<MDEditor value={value} onChange={setValue} />
			{/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
		</div>
	);
}
