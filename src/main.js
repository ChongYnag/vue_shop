import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ZkTable from 'vue-table-with-tree-grid'
import quillEditor  from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
// import * as Quill from 'quill'; // 富文本基于quill

import './plugins/element.js'
import './assets/css/global.css'


Vue.component('tree-table', ZkTable)
//副本本编辑器
Vue.use(quillEditor);

Vue.config.productionTip = false

Vue.filter('dataFormat',function(originVal){
  const dt = new Date(originVal);
  const y =  dt.getFullYear();
  const m =  (dt.getMonth()+1+"").padStart(2,'0');
  const d =  (dt.getDate()+"").padStart(2,'0');

  const hh = (dt.getHours()+'').padStart(2,'0');
  const mm = (dt.getMinutes()+'').padStart(2,'0');
  const ss = (dt.getSeconds()+'').padStart(2,'0');

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

axios.defaults.baseURL = 'http://192.168.0.108:8888/api/private/v1/';
// axios 拦截器
axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});

Vue.prototype.$http = axios;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
