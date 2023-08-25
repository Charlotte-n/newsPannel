//连接数据库
const mysql = require('mysql');

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'admin123',
    database:'node_quanzhan',
    charset : 'utf8mb4'
})

//导出数据库连接对象
module.exports = db;