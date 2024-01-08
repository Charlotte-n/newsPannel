const UserSchema = require('../../models/UsersSchem')

const UserServices = {
    login:async ({username,password})=>{
        //查找数据
        return UserSchema.find({
            username,
            password
        })
    },
    upload:async ({_id,username,introduction,gender,avatar})=>{
        //有头像就更新，没有就不更新
        if(avatar){
            return UserSchema.updateOne({_id},{
                username,
                introduction,
                gender,
                avatar
            })
        }else{
            return UserSchema.updateOne({_id},{
                username,
                introduction,
                gender
            })
        }
    },
    add:async ({username,password,introduction,avatar,role})=>{
        return UserSchema.create({username,password,introduction,avatar,role})
    },
    getlist:async ()=>{
        return UserSchema.find({},["username","role","avatar","introduction","gender"])
    },
    delete:async (_id)=>{
        return UserSchema.deleteOne({_id})
    },
    getoneuserlist:async (_id)=>{
        console.log(_id)
        return UserSchema.find({_id:_id})
    },
    update:async (body)=>{
        return UserSchema.updateOne({_id:body._id},body)
    }

}
module.exports = UserServices
