const ProductSchema = require('../../models/ProductSchem')

const ProductServices = {
    add:async ({title,introduction,detail, cover,editTime})=>{
        return ProductSchema.create({title,introduction,detail, cover,editTime})
    },
    getList:async ({_id})=>{
        return _id?ProductSchema.find({_id}): ProductSchema.find({})
    },
    delete:async (_id)=>{
        return ProductSchema.deleteOne({_id})
    },
    updateProduct:async ({title,introduction,detail,_id,cover,editTime})=>{
        return ProductSchema.updateOne({_id},{title,introduction,detail,_id,cover,editTime})
    }
}
module.exports = ProductServices