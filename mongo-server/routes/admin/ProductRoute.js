//进行设置路由
const express = require('express');
const ProductRouter = express.Router();
///图片上传
const multer = require('multer');
//拿到前端上传给后端的图片信息
const upload = multer({dest: 'public/productuploads/'});
const ProductController = require('../../controllers/admin/ProductController');

ProductRouter.post('/adminapi/product/add',upload.single('file'),ProductController.add);
//获得产品列表
ProductRouter.get('/adminapi/product/getProductList',ProductController.getList)
//获取某一个产品的信息
ProductRouter.get('/adminapi/product/getProductList/:id',ProductController.getList)
// //删除产品
ProductRouter.post('/adminapi/product/delete',ProductController.delete)
//更新产品
ProductRouter.post('/adminapi/product/updateProduct',upload.single('file'),ProductController.updateProduct);

module.exports = ProductRouter