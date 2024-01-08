//进行设置路由
const express = require("express");
const ProductRouter = express.Router();
const ProductController = require("../../controllers/web/ProductController");

//获得产品列表
ProductRouter.get("/webapi/product/getProductList", ProductController.getList);

module.exports = ProductRouter;
