import axios from "axios";
import router from "../router"
import store from "../store"

export const instance = axios.create({
  baseURL:'http://127.0.0.1:3000',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    timeout: 30000,
    withCredentials: true, //请求头带cookie
})


instance.interceptors.request.use(
  request=>{
    return request;
  }
)

instance.interceptors.response.use(
  response => {
    switch (response.data.code)
    {
      case -1 :
        // console.log("用户未登录");
        router.push("/login");
      return;
      case -3 :
        // console.log("输出了当前vuex用户信息");
        delete store.state.userInfo;
        router.push("/login");
        // console.log("清除了当前vuex用户信息");
      return response;
      default : 
      // console.log("正常响应")
      return response;
    }
  },
  error => {
    router.push("/login");
    return Promise.reject(error);
  }

);
