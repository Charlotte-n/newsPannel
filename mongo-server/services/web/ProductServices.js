const ProductSchema = require("../../models/ProductSchem");

const ProductServices = {
  getList: async ({ _id }) => {
    return _id ? ProductSchema.find({ _id }) : ProductSchema.find({});
  },
};
module.exports = ProductServices;
