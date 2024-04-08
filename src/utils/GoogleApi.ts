import moment from "moment";
import axios from "./Api";
import Encoding from "./Encoding";

const post = (action, data) => {
  const token = Encoding.crypto(import.meta.env.VITE_API_SALT, `${action}_${moment().format('YYYYMMDDHHmmss')}`);
  return axios.post('', {
    ...data,
    token
  });
}

export default { post };