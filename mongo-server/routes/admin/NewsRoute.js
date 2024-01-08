var express = require('express');
const NewsController = require('../../controllers/admin/NewsController');
var NewsRouter = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

//涉及文件上传, 普通post不行, 需要加上 multer中间件
NewsRouter.post("/adminapi/news/add",upload.single("file"),NewsController.add)
//获取新闻列表
NewsRouter.get("/adminapi/news/getNewsList",NewsController.getList)
//删除新闻
NewsRouter.post("/adminapi/news/delete",NewsController.delete)
//新闻发布
NewsRouter.post("/adminapi/news/publish",NewsController.publish)
//获得某一新闻列表
NewsRouter.get("/adminapi/news/getNewsList/:id",NewsController.getList)
//更新某一新闻列表
NewsRouter.post("/adminapi/news/updateNews",upload.single("file"),NewsController.updateList)


module.exports = NewsRouter