<template>
  <div class="msg">
    <h4>系统提示</h4>
    <el-timeline class="tLine">
      <el-timeline-item class="item"
        v-for="(activity, index) in activities"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
        :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
export default {
  name: "SystemMsg",
  data() {
    return {
      activities: []
    };
  },
  methods:{
    load(){
      this.axios.get("/tips/v1/tipList").then(result=>{
        var dataList = result.data.data;
        var myTime;
        for(var i = 0;i < dataList.length;i++){
          let newActive;
          myTime = this.getMyTime(dataList[i].create_time);
          if(dataList[i].type==0){
            newActive = {
              content: dataList[i].msg,
              timestamp: myTime,
              size: 'large',
              type: 'primary',
              icon: 'el-icon'
            }
          }else{
            newActive = {
              content: dataList[i].msg,
              timestamp: myTime,
              size: 'large',
              type: 'danger',
              icon: 'el-icon'
            }
          }
          this.activities.push(newActive);
        }
      })
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
  .msg{
    width:26%;
    height:310px;
    padding:1%;
    box-sizing: border-box;
    background-color:#fff;
    text-align: left;
  }
  .msg h4 {
    font-size:18px;
  }
  .msg .tLine{
    margin-left:5%;
    margin-top:3%;
  }
  .el-timeline-item__wrapper {
    display:flex;
    align-items: center;
    justify-content: space-around;
  }
</style>