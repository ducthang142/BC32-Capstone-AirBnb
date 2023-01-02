import fetcher from "./fetcher";

const binhluanAPI = {
  getBinhLuanTheoPhong: (MaPhong) => {
    return fetcher.get(`binh-luan/lay-binh-luan-theo-phong/${MaPhong}`);
  },

  postBinhLuan: (values) => {
    return fetcher.post("binh-luan", values);
  },
};

export default binhluanAPI;
