var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var db = require('../lib/db');
var auth = require('../lib/auth');
var alert = require('alert');

module.exports = function(passport){
    router.post('/login_process', 
      passport.authenticate('local', {
        successRedirect: '/home', // 성공했을 때
        failureRedirect: '/auth/register', // 로그인 실패했을 때
        failureFlash:true,
        successFlash:true
      }
    ))

    router.get('/login_process', 
      passport.authenticate('local', {
        successRedirect: '/home', // 성공했을 때
        failureRedirect: '/auth/register', // 로그인 실패했을 때
        failureFlash:true,
        successFlash:true
      }
    ))

    router.get('/register', function(request, response){ // 회원가입 페이지
        var fmsg = request.flash();
        var feedback = '';
        if(fmsg.error){
            feedback = fmsg.error[0];
        }
        console.log(fmsg);

        var title = 'Dutch Pay System';
        var subtitle = `
            <form action="/auth/back_login" method="post">
                Register Page
                <p><input type="submit" value="👈🏻" class="back_button"></p>
            </form>
        `;
        var body = `
        `;
        var button = `
            <form action="/auth/register_process" method="post">
                <div class = "buttonArea">
                    <p><input type="text" name="id" placeholder="ID" class="blank"></p>
                    <p><input type="password" name="pw" placeholder="Password" class="blank"></p>
                    <p><input type="text" name="account" placeholder="Account" class="blank"></p>
                    <p><input type="text" name="phone" placeholder="Phone-Number" class="blank"></p>
                </div>
                <div class = "buttonArea2">
                    <p><input type="submit" value="Register" class="button"></p>
                </div>
            </form>
            
        
        <style>
            .back_button{
                font-size: 30px;
                border: none;
                background-color: transparent;
                color: black;
                text-align: center;
                position: relative;
                top: -78px;
                right: 200px;
                width: 80px;
                height: 50px;
            }
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
                margin-top: -70px;
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

    router.post('/register', function(request, response){ // 회원가입 페이지
        var fmsg = request.flash();
        var feedback = '';
        if(fmsg.error){
            feedback = fmsg.error[0];
        }
        console.log(fmsg);

        var title = 'Dutch Pay System';
        var subtitle = `
            <form action="/auth/back_login" method="post">
                Register Page
                <p><input type="submit" value="👈🏻" class="back_button"></p>
            </form>
        `;
        var body = `
        `;
        var button = `
            <form action="/auth/register_process" method="post">
                <div class = "buttonArea">
                    <p><input type="text" name="id" placeholder="ID" class="blank"></p>
                    <p><input type="password" name="pw" placeholder="Password" class="blank"></p>
                    <p><input type="text" name="account" placeholder="Account" class="blank"></p>
                    <p><input type="text" name="phone" placeholder="Phone-Number" class="blank"></p>
                </div>
                <div class = "buttonArea2">
                    <p><input type="submit" value="Register" class="button"></p>
                </div>
            </form>
            
        
        <style>
            .back_button{
                font-size: 30px;
                border: none;
                background-color: transparent;
                color: black;
                text-align: center;
                position: relative;
                top: -78px;
                right: 200px;
                width: 80px;
                height: 50px;
            }
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
                margin-top: -70px;
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

    router.get('/register_process', function(request, response){ // 회원가입 처리
        console.log('register');
        var post = request.body;
        var id = post.id;
        var pw = post.pw;
        var account = post.account;
        var phone = post.phone;

        if(id === '' || pw === '' || account === '' || phone === ''){ // 빈칸이 있으면 넘어가지 않도록 예외처리
            alert("빈칸을 입력한 후 register 버튼을 눌러주세요 :)");
        } else{
            db.query(`SELECT * FROM user`, function(err, result){
                if(err){
                    throw err;
                }
    
                if(result.length === 0){
                    var user = {
                        id:id,
                        pw:pw,
                        account:account,
                        phone:phone
                    };
    
                    db.query(`INSERT INTO user (id, pw, account, phone) VALUES(?, ?, ?, ?)`,
                        [id, pw, account, phone], function(err, result){
                            if(err){
                                throw err;
                            }
                    });
                    request.login(user, function(err){
                        return response.redirect(`/home`);
                    });
                    // response.redirect(`/`);
                } else{
                    for(var i = 0 ; i < result.length ; i++){
                        // console.log(result[i].phone);
                        if(result[i].phone === phone){
                            console.log('이미 있는 유저 정보');
                            return response.redirect('/');
                        }
                    }
    
                    var user = {
                        id:id,
                        pw:pw,
                        account:account,
                        phone:phone
                    };
    
                    db.query(`INSERT INTO user (id, pw, account, phone) VALUES(?, ?, ?, ?)`,
                    [id, pw, account, phone], function(err, result){
                        if(err){
                            throw err;
                        }
                    });
    
                    request.login(user, function(err){
                        return response.redirect(`/home`);
                    });
                }
            });
        }
    });

    router.post('/register_process', function(request, response){
        console.log('register');
        var post = request.body;
        var id = post.id;
        var pw = post.pw;
        var account = post.account;
        var phone = post.phone;

        if(id === '' || pw === '' || account === '' || phone === ''){
            alert("빈칸을 입력한 후 register 버튼을 눌러주세요 :)");
        } else{
            db.query(`SELECT * FROM user`, function(err, result){
                if(err){
                    throw err;
                }
    
                if(result.length === 0){
                    var user = {
                        id:id,
                        pw:pw,
                        account:account,
                        phone:phone
                    };
    
                    db.query(`INSERT INTO user (id, pw, account, phone) VALUES(?, ?, ?, ?)`,
                        [id, pw, account, phone], function(err, result){
                            if(err){
                                throw err;
                            }
                    });
                    request.login(user, function(err){
                        return response.redirect(`/home`);
                    });
                    // response.redirect(`/`);
                } else{
                    for(var i = 0 ; i < result.length ; i++){
                        // console.log(result[i].phone);
                        if(result[i].phone === phone){
                            console.log('이미 있는 유저 정보');
                            return response.redirect('/');
                        }
                    }
    
                    var user = {
                        id:id,
                        pw:pw,
                        account:account,
                        phone:phone
                    };
    
                    db.query(`INSERT INTO user (id, pw, account, phone) VALUES(?, ?, ?, ?)`,
                    [id, pw, account, phone], function(err, result){
                        if(err){
                            throw err;
                        }
                    });
    
                    request.login(user, function(err){
                        return response.redirect(`/home`);
                    });
                }
            });
        }
    });
    
    router.get('/logout', function(request, response){ // 로그아웃
        request.logout(function(err){
            request.session.save(function(){
                response.redirect('/');
            });
        });
    });

    router.post('/logout', function(request, response){
        request.logout(function(err){
            request.session.save(function(){
                response.redirect('/');
            });
        });
    });

    router.post('/back_login', function(request, response){ // 로그인 페이지로 돌아가게
        response.redirect(`/`);
    });

    router.get('/back_login', function(request, response){
        response.redirect(`/`);
    });

    return router;
}