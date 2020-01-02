<template>
  <div class="service">
    <div class="s1">
      <div class="service1">
        <span>
          <img src="../assets/kefu.png">
        </span>
        <p style="font-size:14px">Tel:400-660-4299</p>
      </div>
      <div class="service2" >
        <p class="p1style">日常服务时间</p>
        <p class="p2style">周一到周日8:30-21:00</p>
      </div>
    </div> 
    <div class="service3">
      <table>
        <tr>
          <td colspan="2">
            <h4 class="text">*内容描述:</h4>
            <textarea class="textarea" placeholder="请输入需求、改进建议。反馈程序缺陷。及投诉、举报，200字以内。" v-model="content"></textarea>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="select1">
            选择分类:
            <select class="selectstyle" name="Advice" size="1" v-model="selectstyle">
              <option value="xq">需求</option>
              <option value="gj">改进建议</option>
              <option value="cx">程序错误</option>
              <option value="ts">投诉</option>
              <option value="jubao">举报</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="phone1">联系电话:
            <input type="number" class="phonestyle" placeholder="请输入联系方式" v-model="phone">
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding:10px 0 0 20px;text-align:left;">
            <form action="get">
              <input type="file" name="pic" id='file' class="file" @change="tips"/><label for="file">
              <span class="uploading">上传图片<i class="el-icon-upload el-icon--right"></i></span>
              <br>
              <span style="font-size:8px;" >{{tip}}</span>
              </label>
            </form>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-button  class="submit" @click="submitInfo">提交</el-button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
    data() {
     return {
       tip:`*仅限"jpg","png"图片`,
       content:'',
       phone:'',
       selectstyle:'xq'
     }
    },
    methods:{
      tips(e){
        this.tip=e.target.value;
      },
      submitInfo(){
        if(this.content==''){
          this.$message({
            type: 'info',
            message: '内容描述为空!提交失败！'
          });
          return;
        }else if(this.phone==''){
           this.$message({
            type: 'info',
            message: '联系电话为空!提交失败！'
          });
          return;
        }
        this.content='';
        this.phone='';
        this.tip=`*仅限"jpg","png"图片`;
        this.selectstyle='xq';
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
      }
    }
  }
</script>
<style scoped>
  .service-img{
    width:25px;
    margin-left:30px;
    margin-top:20px;
  }
  .service-Tel{
    margin-top:18px;
    font-size:2px;
  }
  .service>td{
    font-size:2px;
  }
  .service1{
    margin-top:30px;
    margin-left:30px;
    float: left;
    clear:left;
    position: relative;
    font-size: 20px;
  }
  .service2{
    float: right;
    position: absolute;
    clear:left;
    margin-top: 30px;
    margin-left: 150px;
    font-size: 12px;
  }
  .s1{
    display:flex;
  }
  .p1style{ margin-bottom:5px;
  margin-top:9px;}
  .p2style{
    margin-top:13px;
    margin-left: 9px;
  }
  .text{
    margin-top:10px;margin-left:-165px;padding-bottom:5px;
  }
  .textarea{margin-left:22px;
      min-width:247px;
      max-width:250px;
      min-height:100px;
      margin-top:10px;}
  .select1{padding-left:22px;
      padding-top:10px;
  }
  .selectstyle{
    width:180px;
    padding:2px;}
  .phone1{
    padding-left:22px;
    padding-top:10px;}
  .phonestyle{
    padding:2px;
    width: 172px;}
  .file{
    visibility:hidden;
    height:0px;
    opacity: 0;
    display:block;
  }
  .submit{
    margin-left:210px;
    margin-top:10px;
    padding:5px 15px;
 }
  .buttonstyle{
    padding:2px;
    border-radius: 5px;}
  .uploading{
    padding:5px 15px;
    border:1px solid black;
    border-radius: 0.2rem;
  }
</style>