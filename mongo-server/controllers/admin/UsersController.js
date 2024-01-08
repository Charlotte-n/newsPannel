const UsersServices = require('../../services/admin/UsersServices')
const JWT = require('../../utils/JWT')
const UsersController = {
    //登录
    login: async (req, res) => {
        const result = await UsersServices.login(req.body)
        if (result.length === 0) {
            //获取失败
            return res.send({
                status: 1,
                message: '用户名或者密码不正确'
            })
        } else {
            //生成token
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, '1d')
            //把token发送给前端
            res.header("Authorization", token)
            //获取用户信息成功
            res.send({
                ActionType: "OK",
                status: 0,
                //发送信息
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0, //性别 ,0,1,2
                    introduction: result[0].introduction,//简介
                    avatar: result[0].avatar,
                    role: result[0].role,
                    token: token
                }
            })
        }
    },
    //上传
    upload: async (req, res) => {
        const {username, introduction, gender} = req.body
        const token = req.headers["authorization"].split(" ")[1]
        const payload = JWT.verify(token)
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
        await UsersServices.upload({_id: payload._id, username, introduction, gender: Number(gender), avatar})
        if (avatar) {
            res.send({
                ActionType: "OK",
                data: {
                    username, introduction,
                    gender: Number(gender),
                    avatar
                }
            })
        }else{
            res.send({
                ActionType: "OK",
                data: {
                    username, introduction,
                    gender: Number(gender),
                }
            })
        }
    },
    //添加用户
    add:async (req,res)=>{
        const {username,password,introduction,avatar,role} = req.body
        await UsersServices.add({username,password,introduction,avatar,role})
        res.send({
            ActionType: "OK",
        })
    },
    //对用户进行增删改查
    getlist:async (req,res)=>{
        const result = await UsersServices.getlist()
        return res.send({
            ActionType: "OK",
            data: result
        })
    },
    //删除某个用户
    delete:async (req,res)=>{
        await UsersServices.delete(req.body._id)
        res.send({
            ActionType: "OK"
        })
    },
    //获得某个用户信息
    getoneuserlist:async (req,res)=>{
        const result = await UsersServices.getoneuserlist(req.params.id)
        res.send({
                ActionType: "OK",
                data: result[0]
            })
    },
    //更新某一个用户
    update:async (req,res)=>{
        await UsersServices.update(req.body)
        res.send({
            ActionType: "OK"
        })
    }
}
module.exports = UsersController