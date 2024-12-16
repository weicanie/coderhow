require('dotenv').config();
const OpenAI = require('openai');
const { API_KEY } = require('../config/server');
const client = new OpenAI({
	apiKey: API_KEY,
	baseURL: 'https://api.chatanywhere.tech'
});
module.exports = client;
