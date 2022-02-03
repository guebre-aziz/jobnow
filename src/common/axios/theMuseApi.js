import axios from "axios";

export default axios.create({
  baseURL: "https://www.themuse.com/api/public",
});
