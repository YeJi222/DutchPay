var db = require('./db');
var alert = require('alert');

module.exports = function(app){
    // passport는 session을 내부적으로 사용하기 때문에 express-session을
    // 활성화시키는 코드 다음에 사용해야 한다.
    var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize()); // app.use() : express에 미들웨어를 설치하는 것
    app.use(passport.session()); // passport는 내부적으로 session에 쓰겠다

    // 로그인을 성공했다는 사실을 session store에 저장하는 기능을 하는 것
    // 로그인에 성공하면 딱 한 번 호출
    passport.serializeUser(function(user, done){
        console.log('serializeUser', user);
        done(null, user.id); // user.id : 식별자 
    });

    // 로그인이 됐을 때, 리로드할 때마다 호출되게 약속되어 있음
    passport.deserializeUser(function(id, done){
        db.query('SELECT * FROM USER WHERE id=?' , 
            [id], function (err, result) {
            if(err) throw err;    
            done(null, result[0]);
        })   
    });

    passport.use(new LocalStrategy(
    {
        usernameField: 'id',
        passwordField: 'pw',
    },
    function(id, password, done) {
        console.log('LocalStrategy');
        db.query(`SELECT * FROM user WHERE id=? AND pw=?` , 
        [id, password], function (err, result) {
            if(err) throw err;

            // 입력받은 ID와 비밀번호에 일치하는 회원정보가 없는 경우   
            if(result.length === 0){
                console.log("회원 정보 없음");
                alert("회원 정보가 등록되어 있지 않습니다. 회원가입을 해주세요 :)");
                return done(null, false, { message: 'Incorrect User Info.' });
            } else{
                console.log("user id: " + result[0].id);
                return done(null, result[0], {
                    message: 'Welcome.'
                });  // result값으로 받아진 회원정보를 return해줌
            }
        });
        }
    ));

    return passport;
}

