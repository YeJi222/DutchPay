var db = require('./db');
var template = require('../lib/template.js');
var auth = require('../lib/auth');

exports.home = function(request, response){ // 로그인하면 나타나는 첫 홈 페이지(보내야하는 돈 리스트)
    // console.log('home function: ', request.user.id);
    db.query(`SELECT * FROM user WHERE id=?`, [request.user.id], function (err, user) {
        db.query(`SELECT * FROM room LEFT JOIN user ON user.phone = room.owner_phone LEFT JOIN roomMember ON roomMember.roomNo = room.roomID WHERE roomMember.phone=?`, 
            [request.user.phone], function (err2, member) {

            var title = 'Dutch Pay System';
            var subtitle = '보내야 하는 돈';
            var body = `
                ${template.moneyTable(member)}
            `;
            var button = `
                <form action="/money/create" method="post">
                    <p><input type="submit" value="정산 하기" class="button2"></p>
                </form>
                <form action="/view" method="post">
                    <p><input type="submit" value="정산 확인" class="button"></p>
                </form>
                <style>
                    .no{
                        background-color: orange;
                        color: white;
                        text-align: center;
                        width: 80px;
                        height: 35px;
                        border-radius: 40px;
                        font-size: 16px;
                        border: none;
                    }
                    .yes{
                        background-color: lightgrey;
                        color: white;
                        text-align: center;
                        width: 80px;
                        height: 35px;
                        border-radius: 40px;
                        font-size: 16px;
                        border: none;
                    }
                    table{
                        border-collapse: collapse;
                        margin-left: 35px;
                        margin-top: -20px;
                    }
                    td{
                        border: 1px solid black;
                        padding: 7px;
                    }
                    .button{
                        border-radius: 40px;
                        font-size: 20px;
                        border: none;
                        background-color: tomato;
                        color: white;
                        text-align: center;
                        width: 130px;
                        height: 35px;
                        float: right;
                        margin-right: 8px;
                        margin-top: -15px;
                    }
                    .button2{
                        border-radius: 40px;
                        font-size: 20px;
                        border: none;
                        background-color: green;
                        color: white;
                        text-align: center;
                        width: 130px;
                        height: 35px;
                        float: right;
                        margin-right: 8px;
                        margin-top: -15px;
                    }
                    .subtitle{
                        margin-top: 100px;
                        margin-left: 40px;
                        font-weight: bold;
                        font-size: 30px;
                        color: purple;
                    }
                </style>
            `;
            var html = template.HTML(title, button,
            `<p class="subtitle">${subtitle}</p>`, body, 
            auth.statusUI(request, response)
            );

            response.send(html);
        });
    });
}

exports.view = function(request, response){ // 정산하기 버튼 누르면 나타나는 받아야 하는 돈 페이지
    console.log('home function: ', request.user.id);
    db.query(`SELECT * FROM user WHERE id=?`, [request.user.id], function (err, user) {
        db.query(`SELECT * FROM room WHERE owner_phone=?`, 
            [request.user.phone], function (err2, owner) {

            var title = 'Dutch Pay System';
            var subtitle = '받아야 하는 돈';
            var body = `
                ${template.viewTable(owner)}
            `;
            var button = `
                <form action="/home" method="post">
                    <p><input type="submit" value="Home" class="button"></p>
                </form>
                <style>
                    .enter_button{
                        background-color: orange;
                        color: white;
                        text-align: center;
                        width: 80px;
                        height: 35px;
                        border-radius: 40px;
                        font-size: 16px;
                        border: none;
                    }
                    table{
                        border-collapse: collapse;
                        margin-left: 35px;
                        margin-top: -20px;
                    }
                    td{
                        border: 1px solid black;
                        padding: 7px;
                    }
                    .button{
                        border-radius: 40px;
                        font-size: 20px;
                        border: none;
                        background-color: tomato;
                        color: white;
                        text-align: center;
                        width: 100px;
                        height: 35px;
                        float: right;
                        margin-right: 8px;
                        margin-top: -15px;
                    }
                    .subtitle{
                        margin-top: 100px;
                        margin-left: 40px;
                        font-weight: bold;
                        font-size: 30px;
                        color: purple;
                    }
                </style>
            `;
            var html = template.HTML(title, button,
            `<p class="subtitle">${subtitle}</p>`, body, 
            auth.statusUI(request, response)
            );

            response.send(html);
        });
    });
}