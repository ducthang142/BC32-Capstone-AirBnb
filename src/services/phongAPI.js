import fetcher from "./fetcher";

const phongAPI = {
  getPhongTheoViTri: (maViTri) => {
    return fetcher.get("phong-thue/lay-phong-theo-vi-tri", {
      params: {
        maViTri: maViTri,
      },
    });
  },

  getPhongId: (id) => {
    return fetcher.get(`phong-thue/${id}`);
  },

  getPhong: () => {
    return fetcher.get("phong-thue");
  },
};

export default phongAPI;
