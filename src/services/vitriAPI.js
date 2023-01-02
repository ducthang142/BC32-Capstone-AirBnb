import fetcher from "./fetcher";

const vitriAPI = {
  getViTriPhanTrang: () => {
    return fetcher.get("vi-tri/phan-trang-tim-kiem", {
      params: {
        pageIndex: 1,
        pageSize: 18,
      },
    });
  },

  getViTri: () => {
    return fetcher.get("vi-tri");
  },
};

export default vitriAPI;
