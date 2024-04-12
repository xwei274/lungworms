import Vue from 'vue'
import router from './router'
import App from './App.vue'
import kukeui from '../src/index'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './fonts/iconfont.css'
// 引入axios
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)
Vue.use(kukeui)
Vue.use(iView)

new Vue({
    router,
    el: '#app',
    render: h => h(App)
})

