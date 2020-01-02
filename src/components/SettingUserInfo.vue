<template>
  <div class="userInfo">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="昵称" prop="uname">
        <el-input v-model="ruleForm.uname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="uphone">
        <el-input v-model="ruleForm.uphone"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="真实姓名" prop="real_name">
        <el-input v-model="ruleForm.real_name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认修改</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
    <el-button @click="dialogFormVisible = true">修改密码</el-button>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="rulePwd" status-icon :rules="rulesDialog" ref="rulePwd" label-width="100px" class="demo-ruleForm">
        <el-form-item label="新密码" prop="pass" :label-width="formLabelWidth">
          <el-input type="password" v-model="rulePwd.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass" :label-width="formLabelWidth">
          <el-input type="password" v-model="rulePwd.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPwd('rulePwd')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.rulePwd.checkPass !== '') {
          this.$refs.rulePwd.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'));
      } else if (value !== this.rulePwd.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      isUpdate:false,
      newForm:{},
      userInfo:this.$store.state.userInfo,
      ruleForm: {
        uname: '',
        email: '',
        uphone: '',
        gender: '',
        real_name: ''
      },
      rulePwd: {
        // upwd:"",
        pass:"",
        checkPass:""
      },
      newPwd: {
        upwd:""
      },
      rules: {
        uname: [
          {required: true, message: `请输入昵称`, trigger: 'blur' },
          {min: 3,max: 16,message: '长度在 3 到 16 个字符',trigger: 'blur'}],
        email: [{required: true,message: '请输入邮箱',trigger: 'blur'}],
        uphone: [{required: true,message: '请输入手机号',trigger: 'blur'}],
        real_name: [{required: true,message: '请输入真实姓名',trigger: 'blur'}]
      },
      rulesDialog: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    load(){
      for(var key in this.ruleForm){
        this.ruleForm[key] = this.userInfo[key];
      }
      this.ruleForm.gender = this.userInfo.gender==0?"女":"男";
      this.newForm = Object.assign({},this.ruleForm);
    },
    // 修改用户信息，不包含密码
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for(var key in this.ruleForm){
            if(this.ruleForm[key] != this.newForm[key]){
              this.isUpdate = true;
              break;
            }
          }
          if(this.isUpdate){
            this.ruleForm.gender=="男"?this.ruleForm.gender=1:this.ruleForm.gender=0;
            this.axios.post("/users/v1/upUsers",{params:{uid:this.userInfo.uid,obj:this.ruleForm}}).then(result=>{
              if(result.data.code == 200){
                this.$message({
                  type:"success",
                  message:"修改成功!"
                })
              }else{
                this.$message.error("修改失败!");
              }
            }).then(
              this.load()
            )
          }else{
            this.$message('没有任何修改操作');
          }
        } else {
          return false;
        }
      });
    },
    // 重置用户信息，不包含密码
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 修改用户密码
    submitPwd(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          if(this.rulePwd.checkPass == this.userInfo.upwd){
            this.$message("新密码与原密码一致哦");
            this.rulePwd = {};
            this.load();
            return;
          }else{
            this.newPwd.upwd = this.rulePwd.checkPass;
            this.axios.post("/users/v1/upUsers",{params:{uid:this.userInfo.uid,obj:this.newPwd}}).then(result=>{
              if(result.data.code == 200){
                this.$message({
                  type:"success",
                  message:"修改成功!"
                })
              }else{
                this.$message.error("修改失败");
              }
            }).then(
              this.rulePwd = {}
            )
            this.load();
          }
        } else {
          return false;
        }
      });
    }
  },
  created(){
    this.load();
  }
}
</script>
<style scoped>
  .userInfo {
    width:70%;
    margin-left:15%;
    margin-top:1%;
  }
  .el-dialog__wrapper {
    width:80%;
    margin-left:10%;
  }
</style>