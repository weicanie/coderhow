export default function removeFromLS(name) {
	try {
		localStorage.removeItem(name);
	} catch (error) {
		console.log('removeFromLS failed', error);
	}
}
