const app = require('../app');

const errorMap = {
	'-1001': {
		code: '-1001',
		message: 'username and password can not be empty!'
	},
	'-1002': {
		code: '-1002',
		message: 'username has been used!'
	},
	'-1003': {
		code: '-1003',
		message: 'username is not exist!'
	},
	'-1004': {
		code: '-1004',
		message: 'password is not correct, please try again!'
	},
	'-1005': {
		code: '-1005',
		message: 'invalid token, request denied!'
	},
	'-1006': {
		code: '-1006',
		message: 'empty token, request denied!'
	},
	'-1007': {
		code: '-1007',
		message: 'no permission!'
	},
	'-1008': {
		code: '-1008',
		message: 'duplicated tag!'
	},
	'-1009': {
		code: '-1009',
		message: 'database internal error!'
	}
};

function errorHandler(err, ctx) {
	const errcode = err.message;
	ctx.body = errorMap[errcode];
}

app.on('error', errorHandler);
