const express = require('express')
const UsersRoute = express.Router()
const UserController = require('../../controllers/admin/UsersController')
//上传图片
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })
//登录
UsersRoute.post('/adminapi/user/login',UserController.login)
//上传
UsersRoute.post('/adminapi/user/upload',upload.single('file'),UserController.upload)
//添加用户
UsersRoute.post('/adminapi/user/add',upload.single('file'),UserController.add)
//对用户的增删改查
UsersRoute.get('/adminapi/user/list',UserController.getlist)
//删除用户
UsersRoute.post("/adminapi/user/remove",UserController.delete)
//更新
UsersRoute.get('/adminapi/user/list/:id', UserController.getoneuserlist)
//更新某一个用户
UsersRoute.post('/adminapi/user/updateUserlist', UserController.update)


module.exports = UsersRoute