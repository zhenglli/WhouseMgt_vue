<template>
  <div>
    <!-- 侧边栏 子组件 -->
    <main-aside></main-aside>
    <!-- 右侧 header部分 子组件 -->
    <main-header></main-header>
    <!-- 右侧主体部分 -->
    <!-- 右侧主体--section部分 -->
    <div class="section" :style="{height:cHeight}">
      <!-- section--summary信息展示部分 -->
      <ul class="summary">
        <li>
          <span class="sum_sp1">
            <span></span>&nbsp;&nbsp;待付款
          </span>
          <span class="sum_sp2">{{status_1}}</span>
        </li>
        <li>
          <span class="sum_sp1">
            <span></span>&nbsp;&nbsp;待审核
          </span>
          <span class="sum_sp2">{{status_2}}</span>
        </li>
        <li>
          <span class="sum_sp1">
            <span></span>&nbsp;&nbsp;异常
          </span>
          <span class="sum_sp2">{{status_3}}</span>
        </li>
        <li>
          <span class="sum_sp1">
            <span></span>&nbsp;&nbsp;未发货
          </span>
          <span class="sum_sp2">{{status_4}}</span>
        </li>
        <li>
          <span class="sum_sp1">
            <span></span>&nbsp;&nbsp;今日发货
          </span>
          <span class="sum_sp2">{{status_5}}</span>
        </li>
        <li>
          <span class="sum_sp1">
            <span></span>&nbsp;&nbsp;发货失败
          </span>
          <span class="sum_sp2">{{status_6}}</span>
        </li>
        <li>
          <span class="sum_sp1">
            <span></span>&nbsp;&nbsp;普通退货
          </span>
          <span class="sum_sp2">{{status_7}}</span>
        </li>
        <li>
          <span class="sum_sp1">
            <span></span>&nbsp;&nbsp;已收货待确认
          </span>
          <span class="sum_sp2">{{status_8}}</span>
        </li>
      </ul>
      <!-- section--info信息展示部分 -->
      <div class="info">
        <!-- 子组件 轮播图 -->
        <Carousel></Carousel>
        <!-- 工具项 -->
        <ul class="tool">
          <li>
            <router-link :to="'/orderpage'" class="toolBar">
              <span class="iconfont">&#xe60d;</span>订单
            </router-link>
          </li>
          <li @click="setOption('goods')">
            <router-link :to="'/repertory'" class="toolBar">
              <span class="iconfont">&#xe680;</span>商品库存
            </router-link>
          </li>
          <li @click="setOption('purchase')">
            <router-link :to="'/repertory'" class="toolBar">
              <span class="iconfont">&#xe605;</span>采购入库
            </router-link>
          </li>
          <li>
            <router-link :to="'/orderpage'" class="toolBar">
              <span class="iconfont">&#xe618;</span>销售出库
            </router-link>
          </li>
          <li>
            <router-link :to="'/newbie'" class="toolBar">
              <span class="iconfont">&#xe72f;</span>新手入门
            </router-link>
          </li>
          <li @click="setOption('provider')">
            <router-link :to="'/setting'"  class="toolBar">
              <span class="iconfont">&#xe604;</span>供应链
            </router-link>
          </li>
          <li @click="setOption('clients')">
            <router-link :to="'/setting'" class="toolBar">
              <span class="iconfont">&#xe696;</span>客户群
            </router-link>
          </li>
          <li>
            <a href="https://page.1688.com/" target="_blank" class="toolBar">
              <span class="iconfont">&#xe655;</span>1688淘管家
            </a>
          </li>
        </ul>
        <!-- 子组件 系统提示信息 -->
        <system-msg></system-msg>
        <!-- 子组件 财务报表 -->
        <charts></charts>
        <!-- 子组件 日志 -->
        <log></log>
        <!-- 服务中心 -->
        <service></service>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from '../components/Carousel'
import SystemMsg from '../components/SystemMsg'
import Charts from '../components/Charts'
import Log from '../components/Log'
import Service from '../components/Service'

export default {
  components:{
    Carousel,SystemMsg,Charts,Log,Service 
  },
  data(){
    return {
      cHeight:0,
      status_1:0,
      status_2:0,
      status_3:0,
      status_4:0,
      status_5:0,
      status_6:0,
      status_7:0,
      status_8:0
    }
  },
  created(){
    this.cHeight=(document.body.clientHeight-48)+'px';
    this.statusCode();
  },
  methods:{
    setOption(val){
      this.$store.state.setOptionVal=val;
    },
    statusCode(){//请求后台服务器，返回所有订单状态
      this.axios.get("/order/v1/statusCode").then(result=>{
        let statusList=result.data.data;
        statusList.map(obj=>{
          obj.ostatus=parseInt(obj.ostatus);
          switch(obj.ostatus){
            case 1:
              this.status_1++;
              return;
            case 2:
              this.status_2++;
              return;
            case 3:
              this.status_3++;
              return;
            case 4:
              this.status_4++;
              return;
            case 5:
              this.status_5++;
              return;
            case 6:
              this.status_6++;
              return;
            case 7:
              this.status_7++;
              return;
            case 8:
              this.status_8++;
              return;
            default:return;
          }
        })
      })
    }
  }
}
</script>

<style scoped>
  /* 右侧主体--section部分 */
  .section {
    width:96%;
    min-width:1300px;
    min-height:903px;
    position:relative;
    left:4%;
    top:48px;
    padding:28px 60px 30px 60px;
    box-sizing: border-box;
    background-color:#eceff3;
  }
  /* section--summary信息展示 */
  .summary{
    height:90px;
    color:#000;
    min-width:930px;
    background-color:#fff;
  }
  .summary li{
    float:left;
    width:12%;
    height:75px;
    text-align: center;
    padding-top:15px;
  }
  .summary .sum_sp1 span{
    display:inline-block;
    width:12px;
    height:12px;
    border-radius:50%;
  }
  .summary li:nth-child(1)>span span {background-color:#5bccff;}
  .summary li:nth-child(2)>span span {background-color:#fe7328;}
  .summary li:nth-child(3)>span span {background-color:#53bf8a;}
  .summary li:nth-child(4)>span span {background-color:#6dcbcd;}
  .summary li:nth-child(5)>span span {background-color:#e9bb89;}
  .summary li:nth-child(6)>span span {background-color:#00aaee;}
  .summary li:nth-child(7)>span span {background-color:#53bf8a;}
  .summary li:nth-child(8)>span span {background-color:#6dc6cd;}
  .summary .sum_sp1{
    font-size:15px;
  }
  .summary .sum_sp2{
    display:block;
    font-size:32px;
  }
  /* section--info信息展示 */
  .info{
    margin-top:15px;
    display:flex;
    flex-wrap:wrap;
    justify-content: space-between;
  }
  /* 工具项 */
  .tool{
    width:36%;
    height:310px;
    background-color:#fff;
    display:flex;
    flex-wrap:wrap;
    justify-content: space-around;
    padding:2% 0;
    box-sizing: border-box;
  }
  .tool li{
    width:21%;
    text-align:center;
  }
  .tool li .toolBar{
    display:block;
    color:#6a6a6a;
    margin-top:20%;
    font-size:14px;
  }
  .tool .iconfont{
    display:block;
    font-size:34px;
    margin-bottom:5px;
  }
  /* 服务中心 */
  .service{
    width:26%;
    height:420px;
    margin-top:15px;
    background-color:#fff;
  }
</style>