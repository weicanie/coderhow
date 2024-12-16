const fs = require('fs');

/* 
fs.readFile(相对path) 相对的是项目根目录
const privateKey = fs.readFileSync('./key/private_key.pem') 
*/
const privateKey = fs.readFileSync('./src/config/key/private_key.pem');
const publicKey = fs.readFileSync('./src/config/key/public_key.pem');

const keyPair = {
	privateKey,
	publicKey
};
module.exports = keyPair;
