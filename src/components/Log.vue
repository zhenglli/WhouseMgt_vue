<template>
  <div class="log">
    <h4>任务列表</h4>
    <div class="input">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable>
      </el-input>
      <i class="el-icon-circle-plus-outline" @click="handleAdd"></i>
    </div>
    <el-card class="box-card">
      <div v-for="(item,index) in logs" :key="index" class="text item">
        {{item.content}}&nbsp;{{item.logTime}}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Log',
  data(){
    return{
      input:"",
      logs:[]
    }
  },
  methods:{
    load(){
      this.axios.get("/log/v1/logList").then(result=>{
        var logList = result.data.data;
        this.logs = [];
        for(var i=0;i<logList.length;i++){
          let newLog = {
            content:logList[i].log_msg,
            logTime:this.getMyTime(logList[i].log_time)
          }
          this.logs.push(newLog);
        }
      })
    },
    handleAdd(){
      var inMsg = this.input;
      if(inMsg.match(/^[ ]*$/)){
        this.$message({
          showClose: true,
          message: '输入为空，无法提交'
        });
      }else{
        this.axios.post("/log/v1/addLog",{params:inMsg}).then(result=>{
          if(result.data.code == 200){
            this.$message({
              type:"success",
              message:"添加成功!"
            })
            this.input = "";
            this.load();
          }else{
            this.$message.error("添加失败!");
          }
        })
      }
    },
    getMyTime(time){
      var clock = "";
      time = new Date(time);
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var min = time.getMinutes();
      if(m<10){
        clock += `0${m}-`;
      }else{
        clock += `${m}-`;
      }
      if(d<10){
        clock += `0${d} `;
      }else {
        clock += `${d} `;
      }
      if(h<10){
        clock += `0${h}:`;
      }else{
        clock += `${h}:`;
      }
      if(min<10){
        clock += `0${min}`;
      }else{
        clock += min;
      }
      return clock;
    }
  },
  created(){
    this.load();
  }
}
</script>

<style scoped>
  .log{
    width:36%;
    height:420px;
    margin-top:15px;
    background-color:#fff;
    box-sizing: border-box;
    text-align: left;
    padding:1% 1% 1% 1%;
  }
  .log h4{
    font-size:18px;
  } 
  .input {
    display:flex;
    align-items: center;
    margin-top:20px;
  }
  .el-icon-circle-plus-outline {
    /* width:15%; */
    font-size:35px;
    color:#aaa;
  }
  .box-card {
    width: 100%;
    height:70%;
    margin-top:2%;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
</style>