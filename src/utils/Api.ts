// Api.js
import axios from "axios";
import moment from "moment";
import Encoding from "./Encoding";

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

axiosAPI.interceptors.request.use(config => {
  if (config.method.search(/post/i) > -1) {
    config.headers["Content-Type"] = "text/plain; charset=utf-8";
  }
  console.log(config.method);
  return config;
});

const googlePost = (action, data) => {
  const token = `${action}_${moment().format('YYYYMMDDHHmmss')}`;
  return axiosAPI.post('', {
    ...data,
    token
  });
}
export default axiosAPI;