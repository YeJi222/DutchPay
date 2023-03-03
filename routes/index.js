var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var auth = require('../lib/auth');

// route, routing
router.get('/', function(request, response){ // 로그인 페이지가 첫 화면
    // request.user -> deserializeUser 콜백함수가 호출될 때 
    // done의 두번째 인자로 주입한 data가 
    // request.user 객체로 전달되도록 약속되어 있다module.exports = router;
    // passport를 사용하지 않으면 request가 user라는 객체를 가지고 있지X

    var title = 'Dutch Pay System';
    var subtitle = 'Login Page';
    var body = `
    `;
    var button = `
        <form action="/auth/login_process" method="post">
            <div class = "buttonArea">
                <p><input type="text" name="id" placeholder="ID" class="blank"></p>
                <p><input type="password" name="pw" placeholder="Password" class="blank"></p>
            </div>
            <div class = "buttonArea2">
                <p><input type="submit" value="Login" class="button"></p>
            </div>
        </form>
        <form action="/auth/register" method="post">
            <div class = "buttonArea2">
                <p><input type="submit" value="Register" class="button2"></p>
            </div>
        </form>
    
        <style>
            .button{
                border-radius: 40px;
                font-size: 20px;
                border: none;
                background-color: tomato;
                color: white;
                text-align: center;
                margin: auto;
                margin-bottom: -30px;
                width: 240px;
                height: 50px;
            }
            .button2{
                // display: inline;
                // padding: 25px 30px;
                border-radius: 40px;
                font-size: 20px;
                border: none;
                background-color: green;
                color: white;
                text-align: center;
                margin-top: -25px;
                width: 240px;
                height: 50px;
            }
            .buttonArea{
                margin: auto;
                width: 310px;
                padding: 3px 10px;
            }
            .buttonArea2{
                margin: auto;
                width: 250px;
                padding: 3px 10px;
            }
            h1{
                text-align: center;
            }
            .blank{
                width: 280px;
                height: 40px;
                background-color: lightgrey;
                border-radius: 10px;
                border: none;
                padding: 3px 10px;;
            }
        </style>
    `;
    var html = template.HTML(title,
        `<h1>${subtitle}</h1>`, 
        body, button, auth.statusUI(request, response)
    );
    response.send(html);
});

module.exports = router;