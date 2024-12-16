const Router = require('@koa/router');
const aichatController = require('../controller/aichat.controller');
const authMiddleware = require('../middleware/auth.middleware');
const aichatMiddleware = require('../middleware/aichat.middleware');
const { loginVerify } = authMiddleware;
const { getAnswer, storeConversation, getConversationList } = aichatMiddleware;
const aichatRouter = new Router({ prefix: '/aichat' });
aichatRouter.post('/', loginVerify, getAnswer);
aichatRouter.post('/store', loginVerify, storeConversation);
aichatRouter.get('/', loginVerify, getConversationList);

module.exports = aichatRouter;
