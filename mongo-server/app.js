var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const UsersRoute = require("./routes/admin/UsersRoute");
const NewsRoute = require("./routes/admin/NewsRoute");
const ProductRoute = require("./routes/admin/ProductRoute");
//使用web的接口
const webNewsRoute = require("./routes/web/NewsRoute");
const webProductRoute = require("./routes/web/ProductRoute");
const cors = require("cors");
const JWT = require("./utils/JWT");
var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(webNewsRoute);
app.use(webProductRoute);
app.use((req, res, next) => {
  // 如果token有效 ,next()
  // 如果token过期了, 返回401错误
  if (req.url === "/adminapi/user/login") {
    next();
    return;
  }
  //登录成功后，生成token，返回给前端作为响应头
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);
  console.log(req.headers);
  if (token) {
    const payload = JWT.verify(token);
    if (payload) {
      const newToken = JWT.generate(
        {
          _id: payload._id,
          username: payload.username,
        },
        "1d",
      );
      res.header("Authorization", newToken);
      next();
    } else {
      res.status(401).send({ errCode: "-1", errorInfo: "token过期" });
    }
  }
});
app.use(NewsRoute);
app.use(UsersRoute);
app.use(ProductRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
