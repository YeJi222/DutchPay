var mysql = require('mysql');
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    port:'3307',
    password:'**********',
    database:'dutchPay_DB'
});
db.connect();
module.exports = db;
