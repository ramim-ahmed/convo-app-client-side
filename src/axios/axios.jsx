import axios from "axios";
const instance = axios.create({
  baseURL: "https://convo-server-side-api.vercel.app/api/v1",
});

export default instance;
