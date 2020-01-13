<template>
	<div class="home">
		<div></div>
	<table></table>
	<div class="bu">
		<el-button type="primary"><router-link to="/login" class="black">已有账号去登录</router-link></el-button>
	</div>
	<div class="fo">
		<div class="title">欢迎注册 Whouse</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
			<el-form-item label="用户名" prop="uname">
				<el-input v-model="ruleForm.uname"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="upwd">
				<el-input type="password" v-model="ruleForm.upwd" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkupwd">
				<el-input type="password" v-model="ruleForm.checkupwd" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="手机" prop="uphone">
				<el-input type="text" v-model="ruleForm.uphone" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
			</el-form-item> 
			<el-form-item label="性别" prop="gender">
				<el-radio-group v-model="ruleForm.gender">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
	<div></div>
	<table></table>
</div>
</template>
<script>

export default {
  data() {
		//验证 输入密码
		var validateUpwd = (rule, value, callback) => {
			if (!( /^(\w){6,20}$/.test(value))) {
				callback(new Error('密码格式不正确,请重新填写!'))
			} else{
				callback();
			}
		}
		//验证 确认密码
    var validateUpwd2 = (rule, value, callback) => {
      if (value !== this.ruleForm.upwd) {
        callback(new Error('两次输入密码不一致!'));
      }else{
				callback();
			}
		}
		//验证 手机号
		var validateUphone = (rule, value, callback) => {
			if (!(/^1[3456789]\d{9}$/.test(value))) {
				callback(new Error('手机号格式不正确,请重新填写!'))
			} else{
				callback();
			}
		}
		//验证 邮箱号
		var validateEmail = (rule, value, callback) => {
			if (!(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/.test(value))) {
				callback(new Error('邮箱号格式不正确,请重新填写!'))
			}else{
				callback();
			}
		}
    return {
      ruleForm: {
				uname: '',
				upwd:'',
				checkupwd:'',
				uphone:'',
				email:'',
        gender: '',
      },
      rules: {
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符之间', trigger: 'blur' }
				],
				upwd: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, max: 20, message: '密码长度在6到20之间', trigger: 'blur'},
					{ validator: validateUpwd, trigger: 'blur' },
				],
				checkupwd: [
					{ required: true, message:'请再次输入密码', trigger: 'blur' },
					{ validator: validateUpwd2, trigger: 'blur' },
				],
				uphone: [
					{ required: true, message: '请输入手机号', trigger: 'blur' },
					{ validator: validateUphone, trigger: 'blur' },
				],
				email: [
					{ required: true, message: '请输入邮箱号', trigger: 'blur' },
					{ validator: validateEmail, trigger: 'blur' },
				],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
		submitForm(ruleForm){
			this.$refs[ruleForm].validate((valid) => {
        if (valid) {
					this.axios.post("/users/v1/register",{
						params:{
							uname:this.ruleForm.uname,
							upwd:this.ruleForm.upwd,
							uphone:this.ruleForm.uphone,
							email:this.ruleForm.email,
							gender:this.ruleForm.gender,
						}
					}).then(result=>{
						if(result.data.code===200){
							this.$router.push("/login");
						}
						this.$message({type:'success',message:'注册成功!'})
					}).catch((e) => {
						console.log(e);
					});
				}
				else{
					return false
				}
			})
		},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}	
</script>
<style>
body {
	margin:0;
	padding:0;
	
} 
.home{
	height: 100%;
	background-image:url("/img/login_bg.png");
	background-repeat: no-repeat;
	background-size: cover;
}
.bu{
	padding-left: 720px;
	padding-top: 51px;
}
.black{
	color:#fff;
	background:#0aa1ed;
	font-size:1rem;
}
.fo{
	width: 600px;
	height: 500px;
	margin-left: 330px;
	margin-top: 30px; 
}
.title{
	font-size: 36px;
	color:#fff;
	padding-bottom: 20px;
	margin-left: 90px;
} 
.el-form-item__label{
	font-size:17px !important;
}
</style>
  