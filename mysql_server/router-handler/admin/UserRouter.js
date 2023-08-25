const db = require("../../db/index");
const JWT = require('../../utils/JWT');

//路由处理函数
const UserHandler = {
    //登录
    login: (req,res)=>{
        //数据库里的操作在单独的目录操作
        const userInfo = req.body;
        let sql  = 'select * from user where username=? and password=?';
        db.query(sql,[userInfo.username,userInfo.password],function (err,result){
            if(result.length === 0){
               return res.cc('用户名密码不匹配');
            }else{
                //登录成功的操作，生成token
                const token = JWT.generage({id:result[0].id,username:result[0].username,password:result[0].password},"1d");
                //设置响应头
                res.setHeader('Authorization',token);
                const data = {
                    id:result[0].id,
                    username:result[0].username,
                    gender:result[0].gender,
                    avatar:result[0].avatar,
                    introduction:result[0].introduction,
                    role:result[0].role
                }
                return res.send({status:0,message:"成功",token:token,data})
            }
        })
    },
    //上传信息
    upload:(req,res)=>{
        //拿不到req.body数据，因为前端传来的格式为form-data
        const {username,gender,introduction} = req.body;
        const token = req.headers['authorization'].split(' ')[1];
        //将token进行解码
        const  payload = JWT.verify(token);
        const avatar = req.file?`/avataruploads/${req.file.filename}`:"";
        //在数据库里面找到这个上传人的id，把与它相关的数据进行更新
        const str = `update user set username=?,gender=?,introduction=?,avatar=? where id=${payload.id}`;
        db.query(str,[username,Number(gender),introduction,avatar],(err,results)=>{
            if(err){
                return res.cc(err);
            }
            if(results.affectedRows !== 1){
                console.log(123)
                return res.cc("上传数据失败");
            }
            //将更新的信息传递给前端，前端进行使用来更新页面
            let data = null;
            if(avatar){
                data = {
                    username,
                    gender,
                    introduction,
                    avatar
                }
            }else{
                data = {
                    username,
                    gender,
                    introduction,
                }
            }

            res.send({status:0,message:"修改成功",data});
            return;
        })
    },
    //添加用户
    add:(req,res)=>{
        const {username,password,role,introduction} = req.body;
        const avatar = req.file?`/avataruploads/${req.file.filename}`:"";
        const str = `insert into user set?`
        db.query(str,{username,password,introduction,avatar,role},(err,results)=>{
            if(err){
                return res.cc(err);
            }
            if(results.affectedRows !== 1){
                return res.cc("添加用户失败")
            }
            return res.send({status:0,message:"添加用户成功",code:200});
        })

    },
    //获取用户列表
    getuserlist:(req,res)=>{
        const str = 'select username,role,avatar,introduction,id from user'
        db.query(str,(err,results)=>{
                if(err)return res.cc(err)
                return res.send({status:0,message:"查询成功",data:results})
        })
    },
    remove:(req,res)=>{
        const str = `delete from user where id=?`
        db.query(str,req.body.id,(err,results)=>{
            if(err)return res.cc(err)
            if(results.affectedRows !== 1)return res.cc('删除失败')
            return res.send({status:0,message:"成功"})
        })
    },
    getoneuserlist:(req,res)=>{
        const str = `select username,role,introduction,password,id from user where id=?`
        db.query(str,req.params.id,(err,results)=>{
            if(err)return res.cc(err)
            return res.send({status:0,message:"查询成功",data:results[0]})
        })
    },
    update:(req,res)=>{
        const str = `update user set ? where id=${req.params.id}`
        db.query(str,req.body,(err,results)=>{
            if(err)return res.cc(err)
            if(results.affectedRows !== 1)return res.cc("更新失败")
            return res.send({status:1,message:"成功"})
        })

    }
}
module.exports = UserHandler