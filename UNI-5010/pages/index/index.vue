<template>
	<view class="content">
		<image class="logo" src="/static/logo4.png"></image>
		<div class="login_title">
			<p style="margin-left: 24px;">重点用能单位</p>
			<p>能耗在线监测系统</p>
		</div>
		<div class="login_content">
		    <div class="input-group">
				<div class="server">
					<input type="text" focus clearable v-model="serve" placeholder="请输入账号"></input>
				</div>
		    	<div class="username">
		    		<input type="text" focus clearable v-model="username" placeholder="请输入账号"></input>
		    	</div>
		    	<div class="password">
		    		<input type="password" displayable v-model="password" placeholder="请输入密码"></input>
		    	</div>
		    </div>
		    <div class="btn-row">
		    	<button type="primary" class="primary" @click="lck">登陆</button>
		    </div>
		</div>
	</view>
</template>

<script>

	import {login} from '@/api/api.js'
		
	export default {
		data() {
			return {
				serve:'http://116.236.149.165:8090/EMS',
				username:'admin',
				password:'Acrel001',
			}
		},
		onLoad() {

		},
		onShow() {
			uni.hideKeyboard()
		},
		methods: {
			lck(){
				/*
				*登陆
				*/
			   let _this = this;
			   uni.showToast({title:'开始登陆',duration: 2000})
			   
			   let data = {
					username:this.username,
					password:this.password,
					device:'app'
				}
				
				uni.setStorageSync('server',this.serve);
				login(data).then(res =>{
					if(res.data.responseCode == 200){
					   _this.userToken =  res.header['auth-token'];
					   uni.setStorageSync('auth-token',this.userToken);
					   uni.switchTab({
						 url:'/pages/home/home'
					   })
					 }else{
					   uni.showToast({
						title:res.data.responseMessage,
						duration: 2000,
						icon:'none'
					   })
					 }
				})

			 // uni.request({
				//  method:'POST',
			 //     url: this.serve+'/api/login',
			 //     data: {
			 //        name:this.username,
				// 	password:this.password,
				// 	Device:'app'
			 //     },
			 //     header: {
			 //         'Content-Type': 'application/json' //自定义请求头信息
			 //     },
			 //     success: (res) => {
			 //         if(res.data.mark == 1){
				// 		   _this.userToken = 'Bearer ' + res.token;
				// 		   uni.setStorageSync('server',this.serve);
				// 		   uni.setStorageSync('Authorization',this.userToken);
				// 		   uni.switchTab({
				// 			 url:'/pages/home/home'
				// 		   })
				// 	 }else{
				// 	   uni.showToast({
				// 		title:'登陆失败~',
				// 		duration: 2000,
				// 		icon:'none'
				// 	   })
				// 	 }
				//  }
				// });
			},
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		width: -webkit-fill-available;
	}
	.login_title{
		font-size: 24px;
		margin-top: 25px;
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.login_content{
		width: 100%;
		margin-top: 40px;
	}
	.input-group{
		margin-left: 15%;
	}
	.server input,.username input,.password input{
		height: 2.2rem;
		line-height: 2.2rem;
		border: 1px solid #c7c8c9;
		width: 85%;
		padding-left: 2.5rem;
		margin-bottom: 0.8rem;
		border-radius: 20px;
		outline: none;
		background-size: 0.5rem 0.5rem;
		
	}
	.server input{
		background: url(../../image/login_server.png) no-repeat  18px center;
		background-size: 12px 14px;
	}
	.username input{
		background: url(../../image/login_user.png) no-repeat  18px center;
		background-size: 12px 14px;
	}
	.password input {
		background: url(../../image/login_lock.png)  no-repeat 18px center;
		background-size: 12px 14px;
	}
	.uni-button{width: 70%;margin-top: 20px;}
	.btn-row{
		width: 73%;
		margin-left: 14%;
		margin-top: 35px;
	}
</style>
