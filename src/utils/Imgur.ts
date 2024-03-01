import axios from "axios";
import _ from "lodash";

export const checkImageByUrl = async (url: string) => {
  const res = await axios.get(url, { responseType: "stream" });
  const contentType = res.headers['content-type'];
  if (_.startsWith(contentType, 'image/')) {
    return true;
  }
  return false;
}