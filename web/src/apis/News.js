//获取新闻列表
import http from "@/services/http";

export const getNewsListApi = () => {
  return http({
    url: "/news/getNewsList",
    method: "GET",
  });
};

export const getNewsDetailApi = (id) => {
  return http({
    url: `/news/getNewsList/${id}`,
    method: "GET",
  });
};

export const getNewNewsApi = (limit) => {
  return http({
    url: `/news/getNewNews?limit=${limit}`,
    method: "GET",
  });
};
