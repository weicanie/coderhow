import WeiRequester from './wei-request';
// const SERVER = 'http://47.102.108.122:8000';
const SERVER = 'http://localhost:8000';
//创建、配置实例并导出
const config1 = {
	baseURL: `${SERVER}`,
	timeout: 10000
};
const instance1 = new WeiRequester(config1);
//响应拦截器
instance1.setResponseInterceptor(res => {
	return res.data;
});

const config2 = {
	baseURL: `${SERVER}`,
	timeout: 30000,// chatgpt可能回复得慢
};
const instance2 = new WeiRequester(config2);
//响应拦截器
instance2.setResponseInterceptor(res => {
	return res.data;
});

//不管是CJS还是ESM，都只会运行一遍，然后导出引用。因此所有模块拿到同一个实例。
export default instance1;
export { instance2 };
export { SERVER };
