<template>
  <div>
    <main-aside></main-aside>
    <main-header></main-header>
    <div class="section" :style="{height:cHeight}">
      <el-tabs v-model="activeName">
        <el-tab-pane label="个人信息" name="preference">
          <setting-user-info></setting-user-info>
        </el-tab-pane>
        <el-tab-pane label="供应商管理" name="provider" v-if="token_id==1||token_id==2">
          <setting-provide></setting-provide>
        </el-tab-pane>
        <el-tab-pane label="客户管理" name="clients" v-if="token_id==1||token_id==2">
          <setting-client></setting-client>
        </el-tab-pane>
        <el-tab-pane label="用户管理" name="users" v-if="token_id==1">
          <setting-user></setting-user>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SettingUser from "../components/SettingUser"
import SettingProvide from "../components/SettingProvide"
import SettingClient from "../components/SettingClient"
import SettingUserInfo from "../components/SettingUserInfo"
export default {
  components:{
    SettingUser,SettingProvide,SettingClient,SettingUserInfo
  },
  data() {
    return {
      cHeight:0,
      activeName: this.$store.state.setOptionVal,
      token_id:this.$store.getters.getUserToken
    }
  }, 
  created() {
    this.cHeight=(document.body.clientHeight-48)+"px";
  }
}
</script>

<style scoped>
  .section{
    width:96%;
    min-width:700px;
    min-height:910px;
    position:relative;
    left:4%;
    top:48px; 
    padding:28px 70px 30px 60px;
    box-sizing: border-box;
    background-color: #fff;
    /* border:1px #000 solid; */
  }
</style>