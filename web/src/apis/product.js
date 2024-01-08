//获取产品的数据
import http from "@/services/http";

export const getProdcutListApi = () => {
  return http({
    url: "/product/getProductList",
    method: "GET",
  });
};
