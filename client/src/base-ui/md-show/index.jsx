import React, { useEffect } from 'react';
import MDEditor from '@uiw/react-md-editor';

export default function MdShow(props) {
	const { value } = props;
	//默认亮色主题
	useEffect(() => {
		document.documentElement.setAttribute('data-color-mode', 'light');
		return () => {
			document.documentElement.setAttribute('data-color-mode', '');
		};
	}, []);

	return (
		<div className="container">
			<MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
		</div>
	);
}
