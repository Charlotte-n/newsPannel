//进行设置路由
const express = require('express');
const ProductRouter = express.Router();
///图片上传
const multer = require('multer');
//拿到前端上传给后端的图片信息
const upload = multer({dest: 'public/newsuploads/'});
const ProductHandler = require('../../router-handler/admin/ProductRouter');
const NewsHandler = require("../../router-handler/admin/NewsRouter");

ProductRouter.post('/adminapi/product/add',upload.single('file'),ProductHandler.add);
//获得新闻列表
ProductRouter.get('/adminapi/product/getProductList',ProductHandler.getList)
ProductRouter.get('/adminapi/product/getProductList/:id',ProductHandler.getList)
//删除产品
ProductRouter.post('/adminapi/product/delete',ProductHandler.delete)

ProductRouter.post('/adminapi/product/updateProduct',upload.single('file'),ProductHandler.updateProduct);

module.exports = ProductRouter