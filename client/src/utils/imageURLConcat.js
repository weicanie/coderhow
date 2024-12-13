import { SERVER } from '@/services/config';

export default function imageURLConcat(filename, mimetype) {
	//名字里的特殊字符转义
	mimetype = mimetype.replace('/', '%2');
	return `${SERVER}/file/image/${filename}/${mimetype}`;
}
