const mysql = require('mysql2');
const config = require('../../config/db');

const connection = mysql.createPool(config).promise();

module.exports = connection;
