import fetcher from "./fetcher";

const datphongAPI = {
  getDanhSachPhongDat: () => {
    return fetcher.get("dat-phong");
  },

  postDatPhong: (values) => {
    return fetcher.post("dat-phong", values);
  },

  getThongTinDatPhongTheoNguoiDung: (MaNguoiDung) => {
    return fetcher.get(`dat-phong/lay-theo-nguoi-dung/${MaNguoiDung}`)
  }
};

export default datphongAPI;
