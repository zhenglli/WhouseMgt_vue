import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MainHeader from './components/MainHeader'
import MainAside from './components/MainAside'
import echarts from 'echarts'
//引入ElementUI组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$echarts = echarts ;
Vue.config.productionTip = false
//引入经过拦截过后的axios
import {instance} from './assets/axios.js'
Vue.prototype.axios = instance;

Vue.component("main-header",MainHeader);
Vue.component("main-aside",MainAside);

router.beforeEach((to, from, next) => {
  if (to.path === '/'|| to.path === '/login'|| to.path === '/register') {
    // console.log("目标路由是登录页！！")
    next()
  }else {
    // console.log("目标路由不是登录页");
    instance.get("/users/v1/userInfo").then(result=>{
      // console.log("获取用户信息")
      if(!(from.path=='/'||from.path=='/login')){
        // console.log("来源页不是登录页");
        let oldStatus = store.state.userInfo.status;
        let newStatus = result.data.data.status;
        if(oldStatus!==newStatus){
          Vue.prototype.$alert(
            '禁止重复登录账号，您已被迫退出！', 
            '用户重复登录', 
            { confirmButtonText: '确定'}
            );
          next({ path: '/login' })
        }
      }
      // console.log(1111111111);
      store.state.userInfo=result.data.data;
      let uid=store.state.userInfo.uid;
      // console.log(2222222222);
      if (!uid) {
        // console.log("vuex用户信息不存在");
        next({ path: '/login' })
      }else{
        // console.log("vuex用户信息存在!!");
        next()
      }
    }).catch(()=>{
      // console.log("catch");
      // console.log(err);
      next({ path: '/login' })
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
