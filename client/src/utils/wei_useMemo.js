class Wei_useMemo {
	constructor() {
		this.lastVal = null;
	}
	wei_useMemo(fn, dep) {
		if (!Object.is(this.lastVal, dep)) {
			fn();
			this.lastVal = dep;
		}
	}
}
export default Wei_useMemo;
