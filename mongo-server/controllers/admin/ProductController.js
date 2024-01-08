const ProductServices = require('../../services/admin/ProductServices')

const ProductController = {
    //添加产品
    add:async (req,res)=>{
        // console.log(req.file,req.body)
        const cover = req.file?`/productuploads/${req.file.filename}`:""
        const {title,introduction,detail} = req.body
        //调用 service进行添加
        await ProductServices.add({
            title,introduction,detail,
            cover,
            editTime:new Date()
        })
        res.send({
            ActionType:"OK"
        })
    },
    //获得产品列表
    getList:async (req,res)=>{
        const result = await ProductServices.getList({_id:req.params.id})
            res.send({
                ActionType: "OK",
                data: result
            })
    },
    //删除产品
    delete:async (req,res)=>{
        await ProductServices.delete(req.body._id)
        res.send({
            ActionType:"OK"
        })
    },
    //更新产品
    updateProduct:async (req,res)=>{
        console.log(req.file)
        const cover = req.file?`/productuploads/${req.file.filename}`:""
        const {title,introduction,detail,_id} = req.body
        await  ProductServices.updateProduct({cover,title,introduction,detail,_id,editTime:new Date()})
        res.send({
            ActionType:"OK"
        })
    }
}
module.exports = ProductController