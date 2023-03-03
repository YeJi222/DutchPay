var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1q2w3e8255',
    database:'dutchPay_DB'
});
db.connect();
module.exports = db;