import fetcher from "./fetcher";

const authAPI = {
  signin: (values) => {
    return fetcher.post("auth/signin", values);
  },

  signup: (values) => {
    return fetcher.post("auth/signup", values);
  },
};

export default authAPI;
