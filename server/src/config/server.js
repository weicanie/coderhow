const PORT = 8000;
const HOST = 'http://47.102.108.122';
// const HOST = 'http://localhost';
const API_KEY = 'sk-gCeio5p1x6iAItcynuSWVqt2IHqqQTDzG34VcZhxmOxxMMOF';
module.exports = {
	PORT,
	HOST,
	API_KEY
};
// const dotenv = require('dotenv')

// dotenv.config()

// module.exports = {
//   PORT,
//   HOST
// } = process.env

//创建环境变量：.env
//环境变量注入全局的process.env：dotenv
//安全、方便
//但为什么我的服务器因此无法在云主机运行？
