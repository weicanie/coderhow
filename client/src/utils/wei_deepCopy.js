export default function deepCopy(obj) {
	//解决循环引用
	const set = new Set();
	set.add(obj);
	let first = true; //第一次不看（obj本身），以后都看
	return deepCopy(obj);

	function deepCopy(obj) {
		if (set.has(obj) && !first) {
			//解决循环引用
			return obj;
		}
		first = false;
		if (typeof obj === 'symbol') {
			return Symbol(obj.description);
		}
		if (typeof obj === 'function') {
			//函数不建
			set.add(obj);
			return obj;
		}
		if (typeof obj !== 'object' || obj === null) {
			//为原始值或者BigInt
			return obj;
		}

		//能到这则为对象，所有object:Object, Array, Set, Map
		if (obj instanceof Set) {
			set.add(obj);
			const set = new Set();
			for (const item of obj) {
				Set.add(deepCopy(item));
			}
			return set;
		}
		if (obj instanceof Map) {
			set.add(obj);
			const map = new Map();
			for (const item of obj.entries()) {
				const [key, val] = item;
				map.set(deepCopy(key), deepCopy(val));
			}
			return map;
		}
		if (Array.isArray(obj)) {
			//数组需要和对象区分
			set.add(obj);
			return obj.map(item => deepCopy(item));
		}

		const copy = {};
		const keys = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
		for (const key of keys) {
			copy[key] = deepCopy(obj[key]);
		}
		return copy;
	}
}
