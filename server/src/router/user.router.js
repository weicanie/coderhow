const Router = require('@koa/router');
const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');
const authMiddleware = require('../middleware/auth.middleware');
const { loginVerify } = authMiddleware;
const userRouter = new Router({ prefix: '/user' });

const { userInfoCheck, passwordEncryption, createUser, uploadSign, getUserInfo } = userMiddleware;

userRouter.post('/commit', userController.commit, userInfoCheck, passwordEncryption, createUser);
userRouter.post('/sign', loginVerify, uploadSign);
userRouter.get('/:userId', getUserInfo);
module.exports = userRouter;
