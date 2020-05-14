import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'
import './assets/css/global.css'

Vue.config.productionTip = false


axios.defaults.baseURL = 'http://192.168.0.108:8888/api/private/v1/';
// axios 拦截器
axios.interceptors.request.use(config=>{
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});

Vue.prototype.$http = axios;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
