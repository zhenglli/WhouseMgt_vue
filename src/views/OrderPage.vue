<template>
  <div>
    <main-aside></main-aside>
    <main-header></main-header>
    <div class="order-page" :style="{height:canHeight}">
      <el-tabs type="border-card" :style="{height:canHeight}">
        <el-tab-pane label="订单提交">
          <order-submission
          :options="options"></order-submission>
        </el-tab-pane>
        <el-tab-pane label="订单查询">
          <order-search
          :options="options"
          :search_options="search_options"
          :token_id="token_id"></order-search>
        </el-tab-pane>
        <el-tab-pane label="订单即时查询">
          <order-tracking></order-tracking>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import citysJson from "../assets/citys.json"
  import OrderSubmission from "../components/OrderSubmission"
  import OrderSearch from "../components/OrderSearch"
  import OrderTracking from "../components/OrderTracking"
  export default {
    components:{
      OrderSubmission,OrderSearch,OrderTracking
    },
    data() {
      return {
        canHeight:0,
        options:citysJson,
        //订单查询标签页数据
        token_id:this.$store.getters.getUserToken,
        search_options: [{
            value: '选项1',
            label: 'AppleMacBook Air'
          }, {
            value: '选项2',
            label: '小米'
          }, {
            value: '选项3',
            label: 'ThinkPad'
          }, {
            value: '选项4',
            label: '华硕'
          }, {
            value: '选项5',
            label: '联想'
          }, {
            value: '选项6',
            label: '戴尔'
          }, {
            value: '选项7',
            label: '神舟'
          }],
      };
    },
    created(){
      this.canHeight = (document.body.clientHeight-48)+"px";
    }
  }
</script>

<style scoped>
  .order-page{
    width:98%;
    min-width:1300px;
    position:absolute;
    top:48px;
    padding-left:2%;
    box-sizing: border-box;
    left: 2%;
    /* border:1px #f00 solid; */
  }
  .el-tabs{
    box-shadow: none;
    border:none;
  }
  /* .el-tabs--border-card>.el-tabs__content {
    box-sizing: border-box;
    padding:20px;
  } */
</style>
