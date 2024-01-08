var express = require("express");
const NewsController = require("../../controllers/web/NewsController");
var NewsRouter = express.Router();

//获取新闻列表
NewsRouter.get("/webapi/news/getNewsList", NewsController.getList);
//获取新闻详情数据
NewsRouter.get("/webapi/news/getNewsList/:id", NewsController.getList);
NewsRouter.get("/webapi/news/getNewNews", NewsController.getTopList);

module.exports = NewsRouter;
