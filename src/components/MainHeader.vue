<template>
  <header>
    <ul>
      <li>whouse主页</li>
    </ul>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        whouse仓库管理系统<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="exit">退出登录</el-dropdown-item>
        <el-dropdown-item command="b">修改密码</el-dropdown-item>
        <el-dropdown-item command="c">下载控件</el-dropdown-item>
        <el-dropdown-item command="d" disabled>测试工具</el-dropdown-item>
        <el-dropdown-item command="e" divided>建议反馈</el-dropdown-item>
        <el-dropdown-item command="f" divided>联系客服</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </header>
</template>
<script>
export default {
  data(){
    return {
      
    }
  },
  methods: {
    handleCommand(command) {
      if(command=="exit"){
        this.axios.post("/users/v1/clearUser").then(()=>{
          this.$router.push("/login");
          this.$message('退出成功！');
        })
      }
      // this.$message('click on item ' + command);
    }
  }
}
</script>
<style scoped>
  header{
    width:96%;
    height:48px;
    min-width:1200px;
    position:fixed;
    left:4%;
    z-index:99;
    background-color:#f3f3f3;
    border-bottom:3px #e3e3e3 solid;
    display:flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-right:10px;
  }
  header ul {
    height:46px;
  }
  header ul li {
    height:100%;
    padding:10px 10px 0 10px;
    background-color:#fff;
    box-sizing: border-box;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
    border-bottom:2px #0095ff solid;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 16px;
  }
</style>