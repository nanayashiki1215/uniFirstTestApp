import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'


import apiReq from './utils/http.js'
Vue.prototype.$apiReq = apiReq

const app = new Vue({
    ...App
})
app.$mount()
