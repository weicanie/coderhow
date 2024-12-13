function trottle(fn, interval, { first = true, last = false } = {}, ...arg) {
	let startTime = 0;
	let timerId = null; //用于控制一个间隔内的计时器数量为1
	function cancel() {
		clearTimeout(timerId);
		timerId = null;
	}
	function exec() {
		let result = null;
		// 1.首次执行控制
		if (!first) {
			first = true;
			return;
		}
		let nowTime = new Date().getTime();
		if (nowTime - startTime >= interval) {
			cancel(); //间隔满了就取消尾部执行（临界情况：两个都可能执行，但一个执行了另一个就不会执行）
			exec.result = fn.call(this, ...arg);
			startTime = nowTime;
		}
		// 2.尾部执行控制、取消
		if (last && timerId === null) {
			new Promise((resolve, reject) => {
				try {
					timerId = setTimeout(
						() => {
							resolve(fn.call(this, ...arg));
							startTime = new Date().getTime();
							timerId = null;
						},
						interval - (nowTime - startTime)
					); //为间隔末设置一个定时器回调
				} catch (err) {
					reject(err);
				}
			}).then(res => {
				exec.result = res;
			});
		}
	}
	exec.cancel = cancel;
	return exec;
}
export default trottle;
