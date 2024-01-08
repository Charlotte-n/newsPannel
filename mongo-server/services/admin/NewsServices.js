const NewsModel = require('../../models/NewsSchem')

const NewsServices = {
    add:async ({title,content,category,cover,isPublish,editTime})=>{
        return  NewsModel.create({title,content,category,cover,isPublish,editTime})
    },
    getList:async ({_id})=>{
        return _id?NewsModel.find({_id}):NewsModel.find({})
    },
    delete:async (_id)=>{
        return NewsModel.deleteOne({_id})
    },
    publish:async ({_id,isPublished,editTime})=>{
        return NewsModel.updateOne({_id},{isPublish:isPublished,editTime})
    },
    updateList:async ({_id,title,content,category,isPublish,cover,editTime})=>{
        if(cover){
            return NewsModel.updateOne({_id},{
                title,content,category,isPublish,cover,editTime
            })
        }else{
            return NewsModel.updateOne({_id},{
                title,content,category,isPublish,editTime
            })
        }
    }
}
module.exports = NewsServices