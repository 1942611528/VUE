// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入elementui -- npm i element-ui -S
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入axios -- cnpm install axios --save
import Axios from 'axios'
Vue.prototype.$axios = Axios

// 引入qs -- npm install qs
import qs from 'qs'
Vue.prototype.qs = qs

// 跨域根路径
Axios.defaults.baseURL = '/api';
// 设置请求头Content-type
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// TODO 将所有未登录会话重定向到 /login
