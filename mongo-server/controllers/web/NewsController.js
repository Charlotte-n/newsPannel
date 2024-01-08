const NewsServices = require("../../services/web/NewsServices");
//创建一个对象
const NewsController = {
  //新闻列表
  getList: async (req, res) => {
    const result = await NewsServices.getList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  getTopList: async (req, res) => {
    const result = await NewsServices.getTopList({ limit: req.query.limit });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
};
module.exports = NewsController;
