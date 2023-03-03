var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compression = require('compression')
var helmet = require('helmet');
app.use(helmet());
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var flash = require('connect-flash');
var page = require('./lib/page');

// 정적인 파일 서비스하고자 하는 디렉토리를 지정(public 디렉토리 아래에 있는 파일을 url을 통해 접근 가능)
// app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(session({
  secret: 'sfdfsfesfedsf', // 필수적으로 들어가야 하는 부분
  resave: false,
  saveUninitialized: true,
  // store: new FileStore() // 주석처리해야 flash memory가 잘 뜸
}))
app.use(flash()); // session 다음에!

var passport = require('./lib/passport')(app);
var indexRouter = require('./routes/index');
var moneyRouter = require('./routes/money');
var authRouter = require('./routes/auth')(passport);

app.use('/', indexRouter);
app.use('/money', moneyRouter); // '/money'으로 시작하는 주소들에게 moneyRouter이라는 미들웨어를 적용하겠다
app.use('/auth', authRouter);

app.get('/home', function(request, response) {
  page.home(request, response);
});

app.post('/home', function(request, response) {
  page.home(request, response);
});

app.get('/view', function(request, response) {
  page.view(request, response);
});

app.post('/view', function(request, response) {
  page.view(request, response);
});

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});