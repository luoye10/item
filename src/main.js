import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/style.css';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

new Vue({
    render: h => h(App)
}).$mount('#app');
