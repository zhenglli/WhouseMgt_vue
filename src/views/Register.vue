<template>
<!-- 背景图片 -->
	<div class="home" :style="{height:cHeight}"><table></table>
		<div id="h1" style="text-align:right">
			<a id="a1" href="">已有账号？</a>
			<router-link to="/login" id="a2">登录</router-link>
		</div> 
		<div id="black">
			<h1 style="text-align:center;color:#fff; ">欢迎注册Whouse</h1>
			<table id="table" >
				<tr>
					<td colspan="2">
						<input v-model="uname" id="uname"  placeholder="请输入用户名">
						<div id="uname-msg"></div>
					</td>               
				</tr>
				<tr>
					<td colspan="2">
						<input type="text" id="uphone" v-model="uphone" placeholder="请输入手机号">
						<div id="uphone-msg"></div>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<input type="text" id="upwd" v-model="upwd" minlength="6" 
						maxlength="16" placeholder="设置8-16位数字和字母组合的密码"><div id="upwd-msg"></div>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<input type="text" id="cpwd"  minlength="6" maxlength="16" placeholder="请再次输入密码">
					</td>                   
					<div id="cpwd-msg"></div>
				</tr>
				<tr>
					<td colspan="2">
						<input type="checkbox">同意《用户协议》和《客户隐私》
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<button @click="submitForm">注册</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
export default{
	data() {
		return {
			uname:"",
			uphone:"",
			upwd:"",
			tableData:"",
			cHeight:0
		}
	},
	methods:{
		submitForm(){
			this.axios.post("/users/v1/register",{
				params:{
					uname:this.uname,
					uphone:this.uphone,
					upwd:this.upwd
				}
			}).then(result=>{
        this.tableData=result.data.data;
        this.$message({type:'success',message:'注册成功!'})
			})
		}
	},
	created(){
    this.cHeight = document.body.clientHeight+'px';
	}
}
</script>
<style scoped>
  body {
		margin:0;
		padding:0;
	}
	.home{
		width:100%;
		/* min-height:900px; */
		/* height:100%; */
		background-image:url("/img/login_bg.png");
		/* background-size:100%; */
		background-repeat: no-repeat;
		background-size: cover;
	}
	#black {margin:170px auto;}
	.home a {color:#fff;text-decoration:none;font-size:3px;}
	#a1 { margin-right:15px;font-size:15px;}
	#a2 {
		color:#fff;
		background:#0aa1ed;
		padding-left:27px;
		padding-right:27px;
		padding-top:6px;
		padding-bottom:6px;
		font-size:1rem; 
	}
	#h1{margin-top:25px;margin-right:25px;}
	table{margin:auto;}
	#uname,#uphone,#cpwd,#upwd{
		width:380px;height:40px;
		background:#fff no-repeat 97% center;
		box-sizing:border-box;
		margin:15px 0;
		font-size:15px;
		padding:5px  10px;
		border-top:0;
		border-left:0;
		border-right:0;
		outline: none;
		border-radius: 5px;
	}
	table button{
		width:100%;height:37px;
		border:0;
		background:#0aa1ed;
		margin-top:10px;
		color:#fff;
		border-radius: 5px;
	}
	#uname-msg,#upwd-msg,#uphone-msg,#cpwd-msg{
		color:red;
	}
</style>
  