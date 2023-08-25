const db = require("../../db/index");

const NewsHandler = {
    add:(req,res)=>{
        const {title,content,isPublished,category} = req.body
        const editTime = new Date()
        const avatar = req.file?`/newsUploads/${req.file.filename}`:"";
        const str = 'insert into news set ?'
        db.query(str,{title,content,avatar,isPublished,editTime,category},(err,results)=>{
            if(err)return res.cc(err)
            if(results.affectedRows !== 1)return res.cc("添加失败")
            return res.send({status:0,message:"添加成功"})
        })
        // return res.send({message:"ok",status:0})
    },
    //获得新闻列表
    getList:(req,res)=>{
        console.log(req.params)
        if(req.params.id){
            const str = `select * from news where id=${Number(req.params.id)}`
            db.query(str,(err,results)=>{
                if(err)return res.cc(err)
                return res.send({status:0,message:'成功',data:results[0]})
            })
        }else{
            const str = `select * from news`
            db.query(str,(err,results)=>{
                if(err)return res.cc(err)
                return res.send({status:0,data:results,message:'成功'})
            })
        }
    },
    //发布新闻
    publish:(req,res)=>{
        const {isPublished,id} = req.body
        const str = `update news set isPublished=? where id=?`
        db.query(str,[isPublished,id],(err,results)=>{
            if(err)return res.cc(err);
            if(results.affectedRows !== 1)return res.cc('发布失败')
            return res.send({status:0,message:'发布成功'})
        })
    },
    //删除新闻
    delete:(req,res)=>{
        const {id} = req.body
        const str = `delete from news where id=${id}`
        db.query(str,(err,results)=>{
            if(err)return res.cc(err)
            if(results.affectedRows !== 1)return res.cc('删除失败')
            return res.send({status:0,message:'删除成功'})
        })
    },
    //更新某个新闻
    updateNews:(req,res)=>{
        const {id,title,content,category} = req.body
        const editTime = new Date()
        const avatar = req.file?`/newsUploads/${req.file.filename}`:"";
        const str = `update news set ? where id=${id}`
        db.query(str,{title,content,avatar,editTime,category},(err,results)=>{
            if(err)return res.cc(err)
            else if(results.affectedRows !== 1)return res.cc('更新失败')
            return res.send({status:0,message:"成功"})
        })

    }
}

module.exports = NewsHandler