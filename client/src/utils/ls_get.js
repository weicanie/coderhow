export default function getFromLS(name) {
	let data;
	try {
		data = localStorage.getItem(name);
	} catch (error) {
		console.log('getFromLS failed', error);
	}
	return JSON.parse(data);
}
