<template>
  <ul class="aside">
    <li>
      <router-link :to="'/index'">
        <span class="iconfont">&#xe606;</span>
      </router-link>
    </li>
    <li>
      <router-link :to="'/orderpage'">
        <span class="iconfont">&#xe60d;</span>订单
      </router-link>
    </li>
    <li>
      <router-link :to="'/productpage'">
        <span class="iconfont">&#xe67b;</span>商品
      </router-link>
    </li>
    <li @click="setOption('preference')">
      <router-link :to="'/repertory'">
        <span class="iconfont">&#xe680;</span>库存
      </router-link>
    </li>
    <li @click="setOption('preference')">
      <router-link :to="'/setting'">
        <span class="iconfont">&#xe607;</span>设置
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  methods:{
    setOption(val){
      this.$store.state.setOptionVal=val;
    }
  }
}
</script>
<style scoped>
  .aside{
    width:4%;
    height:100%;
    min-width:60px;
    position:fixed;
    background-color:dodgerblue;
    z-index:100;
  }
  .aside li{
    width:100%;
    height:80px;
  }
  .aside li:first-child a{
    margin-top:25px;
  }
  .aside li a{
    color:#fff;
    font-size:14px;
    display:block;
    /* margin-top:10px; */
    /* border:1px #000 solid; */
  }
  .aside .iconfont{
    font-size:28px;
    display: block;
    margin-bottom:5px;
  }
  .aside li:first-child .iconfont{
    font-size:34px;
  }
  .aside li:last-child{
    position:absolute;
    bottom:10px;
  }
</style>