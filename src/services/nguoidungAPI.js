import fetcher from "./fetcher";

const nguoidungAPI = {
  getThongTinNguoiDungTheoId: (id) => {
    return fetcher.get(`users/${id}`);
  },

  putChinhSuaThongTin: (id, values) => {
    return fetcher.put(`users/${id}`, values);
  },

  postDoiAvatar: (formData) => {
    return fetcher.post("users/upload-avatar", formData);
  }
};

export default nguoidungAPI;
