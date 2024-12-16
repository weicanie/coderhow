const Router = require('@koa/router');

const testRouter = new Router({ prefix: '/test' });

testRouter.get('/', (ctx, next) => {
	ctx.body = '服务器响应';
});

module.exports = testRouter;
