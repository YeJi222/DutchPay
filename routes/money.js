var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({storage : storage});
var db = require('../lib/db');
var template = require('../lib/template.js');
var auth = require('../lib/auth');
var alert = require('alert');

router.post('/create', function(request, response){ // 정산하기 버튼 누르면
    db.query(`SELECT * FROM user` ,function (err, result) {
        db.query(`SELECT * FROM room` ,function (err2, room) {
            var roomId = roomid_check(room);
            db.query(`SELECT * FROM roomMember WHERE roomNo=?`, [roomId], function (err2, phone) {
                var title = `
                    <form action="/home" method="post">
                        정산하기
                        <p><input type="submit" value="👈🏻" class="back_button"></p>
                    </form>
                `;
                var html = template.HTML_form(title,
                `
                <div class="left_text">
                    <h4>계좌번호</h4>
                    <h4>멤버</h4>
                </div>

                <div class="right_blank">
                    <div class="css_margin">
                        <form action="/money/account_update" method="post">
                            <p><input type="text" name="account" value="${result[0].account}" class="blank">
                            <input type="submit" value="Update" class="update_button"></p>
                        </form>
                        <form action="/money/plus" method="post">
                            <p><input type="text" name="phone" placeholder="Phone Number" class="blank">
                            <input type="submit" value="+" class="plus_button"></p>
                            <input type="hidden" value="${roomId}" name="roomId">
                        </form>
                    </div>
                    <div class="table_css">
                        ${template.memberAddTable(phone)}   
                        <p class="total">Total: ${phone.length} members</p>
                    </div>
                </div>

                <div class="left_text2">
                    <h4>정산할 내용</h4>
                    <h4>금액</h4>
                </div>

                <div class="right_blank2">
                    <form action="/money/create_process" method="post">
                        <p><input type="text" name="content" placeholder="Content" class="blank"></p>
                        <p><input type="number" name="totalMoney" placeholder="Total Money" class="blank"></p>
                        <div class="ok_button">
                            <input type="hidden" name ="totalPerson" value="${phone.length}">
                            <input type="hidden" name ="roomID" value="${phone.length}">
                            <input type="submit" value="정산하기" class="submit_button">
                        </div>
                    </form>
                </div>

                <style>
                    .back_button{
                        font-size: 30px;
                        border: none;
                        background-color: transparent;
                        color: black;
                        text-align: center;
                        position: relative;
                        top: -78px;
                        right: 100px;
                        width: 80px;
                        height: 50px;
                    }
                    .total{
                        font-size: 25px;
                        font-weight: bold;
                        color: tomato;
                        margin-left: 5px;
                    }
                    .table_css{
                        margin-left: 100px;
                    }
                    .css_margin{
                        position: relative;
                    }
                    .left_text{
                        width: 100px;
                        text-align:center;
                        float: left;
                    }
                    .left_text2{
                        width: 100px;
                        text-align:center;
                        float: left;
                    }
                    .right_blank{
                        margin-top: 37px;
                        width: 700px;
                    }
                    .right_blank2{
                        margin-top: 37px;
                        width: 700px;
                    }
                    .blank{
                        width: 300px;
                        height: 30px;
                        background-color: lightgrey;
                        border-radius: 10px;
                        border: none;
                        padding: 3px 10px;;
                    }
                    .ok_button{
                        position: relative;
                        top: 30px;
                        left: 30px;
                    }
                    .submit_button{
                        text-align: center;
                        padding: 8px 15px;
                        border-radius: 40px;
                        margin-left: 60px;
                        font-size: 20px;
                        border: none;
                        color: white;
                        background-color: tomato;
                        width: 130px;
                    }
                    .update_button{
                        padding: 8px 15px;
                        border-radius: 40px;
                        margin-left: 8px;
                        font-size: 15px;
                        border: none;
                        color: white;
                        background-color: green;
                    }
                    .plus_button{
                        padding: 8px 15px;
                        border-radius: 40px;
                        margin-left: 8px;
                        font-size: 15px;
                        border: none;
                        color: white;
                        background-color: tomato;
                    }
                    .delete_button{
                        padding: 8px 15px;
                        border-radius: 10px;
                        margin-left: 8px;
                        font-size: 15px;
                        border: none;
                        color: white;
                        background-color: orange;
                    }
                    h4{
                        margin-bottom: 35px;
                        margin-right: 10px;
                    }
                    .phoneNo{
                        border: 2px solid grey;
                        border-radius: 10px;
                        padding: 3px 10px;
                        width: 150px;
                        height: 30px;
                        margin-bottom: 10px;
                    }
                    </style>
                    `, '');
                response.send(html);
            });
        });
    });
});

router.get('/create', function(request, response){ // 정산하기 버튼 누르면
    db.query(`SELECT * FROM user` ,function (err, result) {
        db.query(`SELECT * FROM room` ,function (err2, room) {
            var roomId = roomid_check(room);
            db.query(`SELECT * FROM roomMember WHERE roomNo=?`, [roomId], function (err2, phone) {
                var title = `
                    <form action="/home" method="post">
                        정산하기
                        <p><input type="submit" value="👈🏻" class="back_button"></p>
                    </form>
                `;
                var html = template.HTML_form(title,
                `
                <div class="left_text">
                    <h4>계좌번호</h4>
                    <h4>멤버</h4>
                </div>

                <div class="right_blank">
                    <div class="css_margin">
                        <form action="/money/account_update" method="post">
                            <p><input type="text" name="account" value="${result[0].account}" class="blank">
                            <input type="submit" value="Update" class="update_button"></p>
                        </form>
                        <form action="/money/plus" method="post">
                            <p><input type="text" name="phone" placeholder="Phone Number" class="blank">
                            <input type="submit" value="+" class="plus_button"></p>
                            <input type="hidden" value="${roomId}" name="roomId">
                        </form>
                    </div>
                    <div class="table_css">
                        ${template.memberAddTable(phone)}   
                        <p class="total">Total: ${phone.length} members</p>
                    </div>
                </div>

                <div class="left_text2">
                    <h4>정산할 내용</h4>
                    <h4>금액</h4>
                </div>

                <div class="right_blank2">
                    <form action="/money/create_process" method="post">
                        <p><input type="text" name="content" placeholder="Content" class="blank"></p>
                        <p><input type="number" name="totalMoney" placeholder="Total Money" class="blank"></p>
                        <div class="ok_button">
                            <input type="hidden" name ="totalPerson" value="${phone.length}">
                            <input type="hidden" name ="roomID" value="${phone.length}">
                            <input type="submit" value="정산하기" class="submit_button">
                        </div>
                    </form>
                </div>

                <style>
                    .back_button{
                        font-size: 30px;
                        border: none;
                        background-color: transparent;
                        color: black;
                        text-align: center;
                        position: relative;
                        top: -78px;
                        right: 100px;
                        width: 80px;
                        height: 50px;
                    }
                    .total{
                        font-size: 25px;
                        font-weight: bold;
                        color: tomato;
                        margin-left: 5px;
                    }
                    .table_css{
                        margin-left: 100px;
                    }
                    .css_margin{
                        position: relative;
                    }
                    .left_text{
                        width: 100px;
                        text-align:center;
                        float: left;
                    }
                    .left_text2{
                        width: 100px;
                        text-align:center;
                        float: left;
                    }
                    .right_blank{
                        margin-top: 37px;
                        width: 700px;
                    }
                    .right_blank2{
                        margin-top: 37px;
                        width: 700px;
                    }
                    .blank{
                        width: 300px;
                        height: 30px;
                        background-color: lightgrey;
                        border-radius: 10px;
                        border: none;
                        padding: 3px 10px;;
                    }
                    .ok_button{
                        position: relative;
                        top: 30px;
                        left: 30px;
                    }
                    .submit_button{
                        text-align: center;
                        padding: 8px 15px;
                        border-radius: 40px;
                        margin-left: 60px;
                        font-size: 20px;
                        border: none;
                        color: white;
                        background-color: tomato;
                        width: 130px;
                    }
                    .update_button{
                        padding: 8px 15px;
                        border-radius: 40px;
                        margin-left: 8px;
                        font-size: 15px;
                        border: none;
                        color: white;
                        background-color: green;
                    }
                    .plus_button{
                        padding: 8px 15px;
                        border-radius: 40px;
                        margin-left: 8px;
                        font-size: 15px;
                        border: none;
                        color: white;
                        background-color: tomato;
                    }
                    .delete_button{
                        padding: 8px 15px;
                        border-radius: 10px;
                        margin-left: 8px;
                        font-size: 15px;
                        border: none;
                        color: white;
                        background-color: orange;
                    }
                    h4{
                        margin-bottom: 35px;
                        margin-right: 10px;
                    }
                    .phoneNo{
                        border: 2px solid grey;
                        border-radius: 10px;
                        padding: 3px 10px;
                        width: 150px;
                        height: 30px;
                        margin-bottom: 10px;
                    }
                    </style>
                    `, '');
                response.send(html);
            });
        });
    });
});

function roomid_check(arr){
    var id = 1;
    for(var i = 0; i < arr.length; i++){
      if(Number(arr[0].roomID) > 1){ // 첫번째 항목의 room id가 1보다 크면 
        id = 1; // 1로 다시 세팅
        break;
      }
      if(i + 1 < arr.length){ // 중간중간 빈 부분 세팅해주기
        if(Number(arr[i+1].roomID) - Number(arr[i].roomID) > 1 ){
          id = Number(arr[i].roomID) + 1; // arr[i].roomID 다음 번호로 세팅
          break;
        }
      }
      else if(i === arr.length - 1){ // 마지막 항목의 경우
        id += Number(arr[i].roomID); // 마지막 번호에 id(1) 추가
      }
    };

    return id;
}

router.post('/create_process', function(request, response){ // 정산하기 페이지에서 정보를 입력한 후, 정산하기 버튼 눌렀을 때
    if(!auth.isOwner(request, response)){ // 로그인 상태가 아니면 처리가 되지 않게
        response.redirect('/');
        return false;
    }

    var post = request.body;
    console.log('content: ', post.content);
    if(post.content === '' || post.totalMoney === 0){
        alert("빈칸을 입력해 주세요");
    } else{
        db.query(`SELECT * FROM user WHERE id=?`, 
        [request.user.id],function (err, userInfo) {
            db.query(`SELECT * FROM room` ,function (err2, result) {
                var roomId = roomid_check(result);
                db.query(`INSERT INTO room (roomID, owner_phone, totalMoney, content, totalPerson) VALUES(?, ?, ?, ?, ?)`,
                    [roomId, userInfo[0].phone, post.totalMoney, post.content, post.totalPerson], function(err3, room){
                        db.query(`SELECT * FROM room WHERE roomID=?`, [roomId], function (err3, roomInfo) {
                            var totalMoney = roomInfo[0].totalMoney;
                            var totalPerson = roomInfo[0].totalPerson + 1; // 자기 자신까지 
                            var nMoney = 0;
                            nMoney = Math.ceil(totalMoney / totalPerson);

                            db.query(`SELECT * FROM roomMember WHERE roomNo=?`, [roomId], function (err4, member) {
                                console.log('roomMember Table view');

                                for(var i = 0 ; i < member.length ; i++){
                                    db.query(`UPDATE roomMember SET nMoney=? WHERE roomNo=?`,
                                        [nMoney, roomId], function(err5, updateNmoney){
                                    });
                                }
                            });
                        });
                    response.redirect(`/money/create_result?roomId=${roomId}`);
                });
            });
        });
    }
});

router.post('/send_update', upload.single('imgUpload'), function(request, response){ // 이미지 첨부하고 send 버튼 누르는 경우
    console.log('send update!');
    if(!auth.isOwner(request, response)){
        response.redirect('/');
        return false;
    }

    if(request.file != undefined){
        var imgBuffer = request.file.buffer;
        var base64Format = Buffer.from(imgBuffer).toString('base64');
    }

    var post = request.body;
    db.query(`SELECT * FROM roomMember WHERE id=?`, 
        [post.id], function (err, member) {
        if(member[0].send === 0){
            if(request.file != undefined){
                db.query(`UPDATE roomMember SET imgData=?, mimeType=?, send=? WHERE id=?`,
                    [base64Format, request.file.mimetype, true, post.id], function(err2, result){
                    response.redirect(`/home`);
                });
            } else{
                alert('송금 내역 인증 사진을 첨부하세요 :)');
            }
        } else{
            db.query(`UPDATE roomMember SET send=? WHERE id=?`,
                [false, post.id], function(err2, result){
                    response.redirect(`/home`);
            });
        }
    });
});

router.get('/money_update', function(request, response){ // 개인별로 money 업데이트 가능한 기능
    if(!auth.isOwner(request, response)){
        response.redirect('/');
        return false;
    }

    var post = request.body;
    db.query(`UPDATE roomMember SET nMoney=? WHERE id=?`,
        [post.nMoney, post.id],
        function(err2, result){
            alert('금액이 수정되었습니다!');
            response.redirect(`/money/create_result?roomId=${post.roomId}`);
    });
});

router.post('/money_update', function(request, response){ // 개인별로 money 업데이트 가능한 기능
    if(!auth.isOwner(request, response)){
        response.redirect('/');
        return false;
    }

    var post = request.body;
    db.query(`UPDATE roomMember SET nMoney=? WHERE id=?`,
        [post.nMoney, post.id],
        function(err2, result){
            alert('금액이 수정되었습니다!');
            response.redirect(`/money/create_result?roomId=${post.roomId}`);
    });
});

router.get('/create_result', function(request, response){ // 정산하기 버튼 누르고 나서 정산 결과가 나오는 페이지
    console.log('request room id: ', request.query.roomId);
    var roomId = request.query.roomId;
    db.query(`SELECT * FROM user` ,function (err2, result) {
        db.query(`SELECT * FROM roomMember WHERE roomNo=?`, [roomId], function (err3, phone) {
            var title = '정산 결과';
            var html = template.HTML_form(title,
            `
            <div class="table_css">
                ${template.memberEditTable(phone)}   
            </div>
            <div class="buttonArea">
                <form action="/money/back" method="post">
                    <input type="submit" value="OK" class="ok_button">
                </form>
            </div>

            <style>
                .table_css{
                    display: flex;
                    justify-content: center;
                }
                .buttonArea{
                    display: flex;
                    justify-content: center;
                    margin-top: 40px;
                }
                .ok_button{
                    padding: 8px 15px;
                    border-radius: 40px;
                    font-size: 20px;
                    border: none;
                    color: white;
                    background-color: tomato;
                    width: 130px;
                }
                .update_button{
                    padding: 8px 15px;
                    border-radius: 40px;
                    margin-left: 5px;
                    font-size: 15px;
                    border: none;
                    color: white;
                    background-color: green;
                }
                h4{
                    margin-bottom: 35px;
                    margin-right: 10px;
                }
                .num{
                    border: 2px solid grey;
                    border-radius: 10px;
                    padding: 3px 10px;
                    width: 150px;
                    margin-bottom: 10px;
                    margin-right: 20px;
                }
                .nMoney{
                    background-color: lightgrey;
                    border-radius: 10px;
                    padding: 3px 10px;
                    width: 100px;
                    height: 30px;
                    border: none;
                    margin-left: 5px;
                }
            </style>
            `, '');
            response.send(html);
        });
    });
});

router.post('/back', function(request, response){ // 홈으로 redirection
    response.redirect(`/home`);
});

router.post('/back_view', function(request, response){ // view 화면(정산 확인 페이지)으로 redirection
    response.redirect(`/view`);
});

router.get('/enter', function(request, response){ // 정산 확인 페이지에서 방 별로 enter 버튼 누르면
    if(!auth.isOwner(request, response)){
        response.redirect('/');
        return false;
    }
    var roomId = request.query.roomId;
    db.query(`SELECT * FROM room WHERE roomID=?`, [roomId], function (err2, room) {
            db.query(`SELECT * FROM roomMember WHERE roomNo=?`, [roomId], function (err3, member) {
                console.log("len: ", member.length);
                    var title = '확인하기';
                    var html = template.HTML_form(title,
                    `
                    <div class="left_text">
                        <h4>정산할 내용</h4>
                        <h4>금액</h4>
                        <h4>멤버</h4>
                    </div>

                    <div class="right_blank">
                        <p class="info">${room[0].content}</p>
                        <p class="info">${room[0].totalMoney}</p>
                    </div>
                    ${template.memberViewTable(member)}
                
                    <form action="/money/back_view" method="post">
                        <input type="submit" value="OK" class="ok_button">
                    </form>

                    <style>
                        .delete_button{
                            padding: 8px 15px;
                            border-radius: 10px;
                            font-size: 15px;
                            border: none;
                            color: white;
                            background-color: orange;
                        }
                        .no{
                            background-color: red;
                            color: white;
                            border-radius: 40px;
                            text-align: center;
                            width: 35px;
                            height: 35px;
                            font-size: 20px;
                            padding: 10px 10px;
                        }
                        .yes{
                            background-color: green;
                            color: white;
                            border-radius: 40px;
                            text-align: center;
                            padding: 10px 10px;
                            width: 35px;
                            height: 35px;
                            font-size: 20px;
                        }
                        table{
                            border-collapse: collapse;
                            margin-left: 50px;
                            margin-top: 8px;
                        }
                        td{
                            border: 1px solid black;
                            padding: 7px 10px;
                        }
                        .info{
                            font-weight: bold;
                            color: green;
                            // background-color: yellow;
                            border: 2px solid grey;
                            border-radius: 10px;
                            padding: 7px 10px;
                            width: 240px;
                            font-size: 18px;
                        }
                        .total{
                            font-size: 25px;
                            font-weight: bold;
                            color: tomato;
                            margin-left: 5px;
                        }
                        .left_text{
                            // background-color: yellow;
                            width: 100px;
                            text-align:center;
                            float: left;
                        }
                        .right_blank{
                            // background-color: yellow;
                            margin-top: 30px;
                            margin-left: 110px;
                            width: 300px;
                        }
                        .ok_button{
                            border-radius: 40px;
                            font-size: 20px;
                            border: none;
                            background-color: tomato;
                            color: white;
                            text-align: center;
                            width: 120px;
                            height: 40px;
                            display: block;
                            margin: auto;
                            margin-top: 20px;
                        }
                        h4{
                            margin-bottom: 35px;
                            margin-right: 10px;
                        }
                        .enter_button{
                            padding: 8px 15px;
                            border-radius: 10px;
                            font-size: 15px;
                            border: none;
                            color: white;
                            background-color: orange;
                        }
                        .phoneNo{
                            border: 2px solid grey;
                            border-radius: 10px;
                            padding: 3px 10px;
                            width: 150px;
                            height: 30px;
                            margin-bottom: 10px;
                        }
                    </style>
                    `, '');
                    response.send(html);
        });
    });
});

router.post('/enter', function(request, response){
    if(!auth.isOwner(request, response)){
        response.redirect('/');
        return false;
    }

    console.log('enter function: ', request.user.id);
    db.query(`SELECT * FROM user WHERE id=?`, [request.user.id], function (err, user) {
        var post = request.body;
        db.query(`SELECT * FROM roomMember WHERE roomNo=?`, [post.roomId], function (err2, member) {
            console.log(member);
            var title = '확인하기';
            var html = template.HTML_form(title,
            `
            <div class="left_text">
                <h4>정산할 내용</h4>
                <h4>금액</h4>
                <h4>멤버</h4>
            </div>

            <div class="right_blank">
                <p class="info">${post.content}</p>
                <p class="info">${post.totalMoney}</p>
            </div>
            ${template.memberViewTable(member)}
        
            
            <form action="/money/back_view" method="post">
                <input type="submit" value="OK" class="ok_button">
            </form>

            <style>
                .delete_button{
                    padding: 8px 15px;
                    border-radius: 10px;
                    font-size: 15px;
                    border: none;
                    color: white;
                    background-color: orange;
                }
                .no{
                    background-color: red;
                    color: white;
                    border-radius: 40px;
                    text-align: center;
                    width: 35px;
                    height: 35px;
                    font-size: 20px;
                    padding: 10px 10px;
                }
                .yes{
                    background-color: green;
                    color: white;
                    border-radius: 40px;
                    text-align: center;
                    padding: 10px 10px;
                    width: 35px;
                    height: 35px;
                    font-size: 20px;
                }
                table{
                    border-collapse: collapse;
                    margin-left: 50px;
                    margin-top: 8px;
                }
                td{
                    border: 1px solid black;
                    padding: 7px 10px;
                }
                .info{
                    font-weight: bold;
                    color: green;
                    // background-color: yellow;
                    border: 2px solid grey;
                    border-radius: 10px;
                    padding: 7px 10px;
                    width: 240px;
                    font-size: 18px;
                }
                .total{
                    font-size: 25px;
                    font-weight: bold;
                    color: tomato;
                    margin-left: 5px;
                }
                .left_text{
                    // background-color: yellow;
                    width: 100px;
                    text-align:center;
                    float: left;
                }
                .right_blank{
                    // background-color: yellow;
                    margin-top: 30px;
                    margin-left: 110px;
                    width: 300px;
                }
                .ok_button{
                    border-radius: 40px;
                    font-size: 20px;
                    border: none;
                    background-color: tomato;
                    color: white;
                    text-align: center;
                    width: 120px;
                    height: 40px;
                    display: block;
                    margin: auto;
                    margin-top: 20px;
                }
                h4{
                    margin-bottom: 35px;
                    margin-right: 10px;
                }
                .enter_button{
                    padding: 8px 15px;
                    border-radius: 10px;
                    font-size: 15px;
                    border: none;
                    color: white;
                    background-color: orange;
                }
                .phoneNo{
                    border: 2px solid grey;
                    border-radius: 10px;
                    padding: 3px 10px;
                    width: 150px;
                    height: 30px;
                    margin-bottom: 10px;
                }
            </style>
            `, '');
            response.send(html);
        });
    });
});

router.post('/account_update', function(request, response){ // 계좌번호 업데이트 할 수 있게
        // console.log('update button!');
    if(!auth.isOwner(request, response)){
        response.redirect('/');
        return false;
    }

    var post = request.body;
    // console.log('update page: ', request.user.id);

    db.query(`UPDATE user SET id=?, pw=?, account=?, phone=? WHERE id=?`,
        [request.user.id, request.user.pw, post.account, request.user.phone, request.user.id],
        function(err, result){
            alert('계좌번호가 수정되었습니다!');
            response.redirect(`/money/create`);
    });
});

function id_check(arr){ // id 계산하여 찾아주는 모듈
    var id = 1;
    for(var i = 0; i < arr.length; i++){
      if(Number(arr[0].id) > 1){ // 첫번째 항목의 id가 1보다 크면 
        id = 1; // 1로 다시 세팅
        break;
      }
      if(i + 1 < arr.length){ // 중간중간 빈 부분 세팅해주기
        if(Number(arr[i+1].id) - Number(arr[i].id) > 1 ){
          id = Number(arr[i].id) + 1;
          break;
        }
      }
      else if(i === arr.length - 1){ // 마지막 항목의 경우
        id += Number(arr[i].id); // 번호 추가
      }
    };

    return id;
}

router.post('/plus', function(request, response){ // 멤버 추가 버튼 누르면 
    // console.log('update button!');
    if(!auth.isOwner(request, response)){
        response.redirect('/');
        return false;
    }

    var post = request.body;
    var state = '';
    console.log('pass roomID: ', post.roomId);
    // console.log('update page: ', request.user.id);

    db.query(`SELECT * FROM user`, function (err, result) {
        db.query(`SELECT * FROM user WHERE id=?`, [request.user.id], function (err2, user) {
            db.query(`SELECT * FROM roomMember`, function (err3, member) {
                // console.log(result[0].phone);
                // console.log(post.phone);
                var id = id_check(member);
                // console.log(id);

                for(var i = 0 ; i < result.length ; i++){
                    if(result[i].phone === post.phone && post.phone != user[0].phone){
                        state = 'ok';
                        console.log('가능한 번호');
                        
                        break;
                    }
                    state = 'no';
                    console.log('추가할 수 없음');
                }

                if(state === 'ok'){
                
                    db.query(`INSERT INTO roomMember (id, roomNo, phone, send) VALUES(?, ?, ?, ?)`,
                            [id, post.roomId, post.phone, false], function(err5, result2){
                            if(err){
                                throw err;
                            }
                    });
                } else{
                    alert('올바르게 입력했는지 확인해 주세요\n(자기 자신은 멤버 번호로 등록할 수 없으며, 회원이 없는 전화번호도 추가가 되지 않습니다!)');
                }

                response.redirect(`/money/create`);
            });
        });
    });
});

router.post('/member_delete', function(request, response){ // 추가한 멤버 번호 삭제
    // console.log('delete');
    if(!auth.isOwner(request, response)){
        response.redirect('/');
        return false;
    }

    var post = request.body;
    db.query(
        `DELETE FROM roomMember WHERE id=?`,
        [post.id],
        function(err2, result){
            if(err2){
                throw err2;
            } 
            
            response.redirect('/money/create');
        }); 
});

router.post('/ok_delete', function(request, response){ // enter로 방에 들어가서 각 멤버별로 ok 버튼을 눌러 확인 후, 삭제가 가능
    if(!auth.isOwner(request, response)){
        response.redirect('/');
        return false;
    }

    var post = request.body;
    
    db.query(`SELECT * FROM roomMember WHERE roomNo=? AND id=?`, [post.roomId, post.id], function (err3, memberInfo) {
        console.log('send info: ', memberInfo[0].id);
        if(memberInfo[0].send === 1){
            db.query(`DELETE FROM roomMember WHERE id=? AND send=?`,
            [post.id, 1], function(err2, result){
                if(err2){
                    throw err2;
                } 
                db.query(`SELECT * FROM roomMember WHERE roomNo=?`, [post.roomId], function (err, member) {

                    console.log('delete len : ', member.length);
                    if(member.length === 0){
                        console.log('delete room : ', post.roomId);
                        db.query(`DELETE FROM room WHERE roomID=?`,
                            [post.roomId], function(err3, result2){
                                return response.redirect(`/view`);
                        });
                        alert(`${post.roomId}번 방이 삭제되었습니다 :)`);
                    } else{
                        response.redirect(`/money/enter?roomId=${post.roomId}`);
                    }
                });
            }); 
        } else{
            alert("아직 돈을 받지 못했습니다! :)");
        }
    }); 
});

module.exports = router;