<template>
  <div>
    <main-aside></main-aside>
    <main-header></main-header>
    <div class="repertory">
      <el-tabs type="border-card" v-model="activeName" >
        <el-tab-pane label="采购入库" name="preference">
          <purchase-table></purchase-table>
        </el-tab-pane>
        <el-tab-pane label="库存信息" name="goods" style="text-align:center">
          <repertory-info></repertory-info>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import purchaseTable from "../components/purchaseTable"
  import RepertoryInfo from "../components/RepertoryInfo"

  export default {
    components:{
      purchaseTable,RepertoryInfo
    },
    data() {
      return {
        activeName: this.$store.state.setOptionVal,
      }
    }
  }
</script>

<style scoped>
  .repertory{
    width:96%;  
    position:relative;
    left:4%;
    top:3rem;
    background-color:#eceff3;
  }
  .el-tabs{
    box-shadow: none;
    border:none;
  }
 .el-tabs--border-card>.el-tabs__content{
   padding: 0 !important;
 }
.el-tab-pane{
  margin:0 auto;
}
</style>