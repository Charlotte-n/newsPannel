const db = require("../../db/index");
const ProductHandler = {
    add:(req,res)=>{
        const {title,introduction,detail} = req.body
        console.log(detail)
        const editTime = new Date()
        const avatar = req.file?`/newsUploads/${req.file.filename}`:"";
        const str = 'insert into product set ?'
        db.query(str,{title,detail,avatar,introduction,editTime},(err,results)=>{
            if(err)return res.cc(err)
            if(results.affectedRows !== 1)return res.cc("添加失败")
            return res.send({status:0,message:"添加成功"})
        })
    },
    getList:(req,res)=>{
        if(req.params.id){
            const str = `select * from product where id=${Number(req.params.id)}`
            db.query(str,(err,results)=>{
                if(err)return res.cc(err)
                return res.send({status:0,message:'成功',data:results[0]})
            })
        }else{
            const str = `select * from product`
            db.query(str,(err,results)=>{
                if(err)return res.cc(err)
                return res.send({status:0,data:results,message:'成功'})
            })
        }
    },
    delete:(req,res)=>{
        const {id} = req.body
        const str = `delete from product where id=${id}`
        db.query(str,(err,results)=>{
            if(err)return res.cc(err)
            if(results.affectedRows !== 1)return res.cc('删除失败')
            return res.send({status:0,message:'删除成功'})
        })
    },
    updateProduct:(req,res)=>{
        const {id,title,introduction,detail} = req.body
        const editTime = new Date()
        const avatar = req.file?`/newsUploads/${req.file.filename}`:"";
        const str = `update product set ? where id=${id}`
        db.query(str,{title,detail,avatar,introduction,editTime},(err,results)=>{
            if(err)return res.cc(err)
            else if(results.affectedRows !== 1)return res.cc('更新失败')
            return res.send({status:0,message:"成功"})
        })

    }
}
module.exports = ProductHandler