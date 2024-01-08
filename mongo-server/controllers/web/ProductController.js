const ProductServices = require("../../services/web/ProductServices");

const ProductController = {
  //获得产品列表
  getList: async (req, res) => {
    const result = await ProductServices.getList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
};
module.exports = ProductController;
