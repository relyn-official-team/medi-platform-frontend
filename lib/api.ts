// frontend/lib/api.ts

import axios from "axios";

const api = axios.create({
   baseURL: "/api",
   withCredentials: true,   // 🔥 쿠키 자동 포함
 });


api.interceptors.request.use((config: any) => {
  const noAuthEndpoints = ["/auth/register", "/auth/login"];

  if (config.url && noAuthEndpoints.some((path) => config.url.includes(path))) {
    return config;
  }


  return config;
});

export default api;
