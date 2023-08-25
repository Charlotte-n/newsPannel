//进行设置路由
const express = require('express');
const NewsRouter = express.Router();
///图片上传
const multer = require('multer');
//拿到前端上传给后端的图片信息
const upload = multer({dest: 'public/newsuploads/'});
const NewsHandler = require('../../router-handler/admin/NewsRouter');

NewsRouter.post('/adminapi/news/add',upload.single('file'),NewsHandler.add);
NewsRouter.get('/adminapi/news/getNewsList',NewsHandler.getList)
//获得某一个新闻数据
NewsRouter.get('/adminapi/news/getNewsList/:id',NewsHandler.getList)
//发布新闻
NewsRouter.post('/adminapi/news/publish',NewsHandler.publish)
//删除新闻
NewsRouter.post('/adminapi/news/delete',NewsHandler.delete)
//更新某个新闻信息
NewsRouter.post('/adminapi/news/updateNews',upload.single('file'),NewsHandler.updateNews);

module.exports = NewsRouter