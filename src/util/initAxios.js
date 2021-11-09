import axios from "axios";
import { ElLoading } from "element-plus";
import router from '../router'

let token = localStorage.getItem("token")
if (token) {
    axios.defaults.headers.common["Authorization"] = token
}
let loading = null
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    loading = ElLoading.service({ fullscreen: true });
    return config;
}, function (error) {
    // 对请求错误做些什么
    loading.close()
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    loading.close()
    if (response.data.code === 401) {
        let formPath = window.location.hash.split("#")[1]
        router.push({ path: "/login", query: { path: formPath } })
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    loading.close()
    return Promise.reject(error);
});
export default axios