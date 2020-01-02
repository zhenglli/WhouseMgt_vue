<template>
  <div id="app"  @mousemove="moveEvent" @click="moveEvent">
    <router-view/>
  </div>
</template>

<script>
  
export default {
  name: 'App',
  /*** 监听浏览器刷***/
  data(){
    return {
      timmer: null,
    }
  },
  methods: {
    moveEvent(){
//		console.log("清除了定时器！！！！！")
      let path = ['/login']
      if(!path.includes(this.$route.path)) { //如果不是登录页面的话页面停止进行30分钟后清空session
        clearTimeout(this.timmer);
        this.init();
      }
    },
    init(){
      this.timmer=setTimeout(()=>{
        //清除session
        sessionStorage.removeItem("sessionData");
        sessionStorage.clear();
        //清除缓存
        // this.$cache.reset();
        // console.log(this.$cache);
        //跳往登录页面
        this.$router.push({
          path: "/login",
      });
      },30*60*1000);//设置半小时清空session进入屏保
    },
  }
}
</script>

<style lang="less">
@import url("./assets/css/base.css");
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: "Hiragino Sans GB","Helvetica Neue",Helvetica,"PingFang SC","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
