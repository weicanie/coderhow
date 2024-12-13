export default function storeInLS(name, item) {
	try {
		localStorage.setItem(name, JSON.stringify(item));
	} catch (error) {
		console.log('storeInLS failed', error);
	}
}
