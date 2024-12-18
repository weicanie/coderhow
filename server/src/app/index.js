const Koa = require('koa');
const { PORT } = require('../config/server');
const bodyParser = require('koa-bodyparser');
const registerRouters = require('../router');

const app = new Koa();
//开启CORS
app.use(async (ctx, next) => {
	// 1.允许简单请求开启CORS
	ctx.set('Access-Control-Allow-Origin', '*');
	// 2.非简单请求开启下面的设置
	// ctx.set("Access-Control-Allow-Headers", "Accept, AcceptEncoding, Connection, Host, Origin")//课程里给的代码无效！
	ctx.set(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept,Authorization'
	); //专业网站给的代码，有效！
	ctx.set('Access-Control-Allow-Credentials', true); // cookie
	ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
	// 3.发起的是一个options请求
	if (ctx.method === 'OPTIONS') {
		ctx.status = 204;
	} else {
		await next();
	}
});


app.use(bodyParser());
registerRouters(app);
app.listen(PORT);

module.exports = app;
