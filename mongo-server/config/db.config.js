//连接数据库
const mongoose = require("mongoose");
// mongoose.com('mongodb://127.0.0.1:27017/comony-system
mongoose.connect("mongodb://127.0.0.1/comony-system");
mongoose.connection.on("open", () => {
  console.log("连接成功");
});
