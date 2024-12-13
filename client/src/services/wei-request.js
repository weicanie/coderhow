import axios from 'axios';

class WeiRequester {
	constructor(config) {
		this.requester = axios.create(config);
	}
	request(config) {
		return this.requester.request(config);
	}

	get(url, config) {
		return this.requester.request({ url, method: 'get', ...config });
	}

	post(url, data, config) {
		return this.requester.request({ url, method: 'post', data, ...config });
	}

	setRequestInterceptor(fn1, fn2) {
		return this.requester.interceptors.request.use(fn1, fn2);
	}

	setResponseInterceptor(fn1, fn2) {
		return this.requester.interceptors.response.use(fn1, fn2);
	}

	/*   setDefault (
    {
    baseURL,
    headers,
    timeout,
    } = {}
  ) {
    this.requester.defaults.baseURL = baseURL
    this.requester.defaults.headers = headers
    this.requester.defaults.timeout = timeout
  } */
}

export default WeiRequester;
