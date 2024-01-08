const NewsModel = require("../../models/NewsSchem");
const NewsServices = {
  getList: async ({ _id }) => {
    return _id
      ? NewsModel.find({ _id, isPublish: 0 })
      : NewsModel.find({ isPublish: 0 }).sort({ editTime: -1 });
  },
  getTopList: async ({ limit }) => {
    return limit
      ? NewsModel.find({ isPublish: 0 })
      : NewsModel.find({ isPublish: 0 }).limit(limit);
  },
};
module.exports = NewsServices;
