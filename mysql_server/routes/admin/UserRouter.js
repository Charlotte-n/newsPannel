//进行设置路由
const express = require('express');
const router = express.Router();
///图片上传
const multer = require('multer');
//拿到前端上传给后端的图片信息
const upload = multer({dest: 'public/avataruploads/'});
const UserHandler = require('../../router-handler/admin/UserRouter');
router.post('/adminapi/user/login', UserHandler.login);
router.post('/adminapi/user/upload', upload.single('file'), UserHandler.upload);
//添加用户
router.post('/adminapi/user/add', upload.single('file'), UserHandler.add)
//获取用户列表
router.get('/adminapi/user/list', UserHandler.getuserlist)
//删除用户
router.post('/adminapi/user/remove', UserHandler.remove)
//获取单个用户列表
router.get('/adminapi/user/list/:id', UserHandler.getoneuserlist)
//更新某一个id的用户
router.post('/adminapi/user/updateUserlist', UserHandler.update)
module.exports = router;
