const Router = require('@koa/router');
const loginMiddleware = require('../middleware/login.mddleware');
const loginController = require('../controller/login.controller');

const loginRouter = new Router({ prefix: '/user' });
const { userInfoCheck, userVerify, tokenDispatch } = loginMiddleware;
loginRouter.post('/login', loginController.login, userInfoCheck, userVerify, tokenDispatch);

module.exports = loginRouter;
