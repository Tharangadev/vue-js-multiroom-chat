import Vue from "vue"
import App from "./App.vue"
import ElementUI from "element-ui"
import socket from './socket/index.js'
import store from './store/store'

import "element-ui/lib/theme-chalk/index.css"
Vue.config.productionTip = false
Vue.use(ElementUI)
window.socket = socket
window.current_room = ""

new Vue({
  store,
  render: h => h(App),

}).$mount("#app");
