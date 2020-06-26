import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { Http, Auth, Currency } from './providers';
import App from './App';
import router from './router';
import store from './store';

Http.setBaseUrl(process.env.VUE_APP_API_URL);
Http.setInterceptorRequest((request) => {
  if (request.baseURL === process.env.VUE_APP_API_URL) {
    if (Auth.isAuth()) {
      const { token } = Auth.getUser();

      Object.assign(request.headers, {
        token,
      });
    }
  }

  return request;
}, error => Promise.reject(error));
Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// Filters
Vue.filter('percentage', (value, decimals = 2, language = 'pt-BR') => {
  let percent = value;

  if (typeof percent === 'string') percent = Number(percent);
  if (Number.isNaN(percent) || typeof percent !== 'number') return null;

  return `${parseFloat(percent.toFixed(decimals)).toLocaleString(language)}%`;
});

Vue.filter('currencyReal', Currency.formatReal);
Vue.filter('currencyUsd', Currency.formatUsd);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
