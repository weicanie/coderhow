const crypto = require('crypto');

function passwordEncryption(password) {
	const md5pwd = crypto.createHash('md5').update(password).digest('hex'); //每次加密都需要建立新的，crypto.createHash('md5')，用用过的会报错。
	return md5pwd;
}

module.exports = passwordEncryption;
