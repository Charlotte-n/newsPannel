const NewsServices = require("../../services/admin/NewsServices");
//创建一个对象
const NewsController = {
  //添加新闻
  add: async (req, res) => {
    const cover = req.file ? `/newsuploads/${req.file.filename}` : "";
    const { title, content, category, isPubulished } = req.body;
    await NewsServices.add({
      title,
      content,
      category: Number(category),
      isPublish: Number(isPubulished),
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
  //新闻列表
  getList: async (req, res) => {
    const result = await NewsServices.getList({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  //删除用户
  delete: async (req, res) => {
    await NewsServices.delete(req.body._id);
    res.send({
      ActionType: "OK",
    });
  },
  //发布新闻
  publish: async (req, res) => {
    await NewsServices.publish({
      ...req.body,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
  //更新某一个列表
  updateList: async (req, res) => {
    const cover = req.file ? `/newsuploads/${req.file.filename}` : "";
    const { title, content, category, isPublish, _id } = req.body;
    await NewsServices.updateList({
      title,
      content,
      category: Number(category),
      isPublish: Number(isPublish),
      _id,
      cover,
      editTime: new Date(),
    });
    res.send({
      ActionType: "OK",
    });
  },
};
module.exports = NewsController;
