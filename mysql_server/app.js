var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const JWT = require('./utils/JWT');

var indexRouter = require('./routes/index');
const usersRouter = require('./routes/admin/UserRouter');
const newsRouter = require('./routes/admin/NewsRouter')
const productRouter = require('./routes/admin/ProductRouter')


var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//1.优化代码错误处理的中间件,优化代码
app.use(function (req, res, next) {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
});
//进行token验证,中间件
app.use((req,res,next)=>{
    if(req.url === '/adminapi/user/login'){
        next();
        //login不需要验证token
        return
    }
    //拿到前端的token
    const token = req.headers['authorization'].split(' ')[1];
    console.log(token)
    if(token){
        //有token，解析token
        const  payload = JWT.verify(token);
        if(payload){
            //如果相等的话
            const newToken = JWT.generage({
                id:payload.id,
                username:payload.username,
                password:payload.password
            },'1d');
            console.log(newToken)
            res.setHeader('Authorization',newToken);
            next();
        }else{
            return res.status(405).send({errCode:"-1",erroInfo:"token过期了"});
        }
    }

})
//注册路由
app.use(usersRouter);
app.use(newsRouter);
app.use(productRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
