<template>
	<view class="content" style="padding: 0rpx;background-color: #FFFFFF;">
		<!-- <view class="login-type">
			<view v-for="(item,index) in loginTypeList" :key="index" @click="loginType = index" :class="{act: loginType === index}"
			 class="login-type-btn">{{item}}</view>
		</view> -->
		 <!-- <view class="image-item"> -->
		     <view class="image-content">
		        <image style="width: 100%; height: 600rpx; background-color: #FFFFFF;"  src="../../static/loginImg/ipaddress.png"
		                        @error="imageError"></image>
		     </view>
		<!-- </view> -->
		<view class="input-group" style="margin-top: 100rpx;" v-if='ipAddress != null'>
			<view class="input-row border" style="height: 67rpx;">
				<image style="width:56rpx; height: 60rpx; background-color: #FFFFFF;"  src="../../static/img/ip_icon.png"
				                @error="imageError"></image>
				<m-input class="m-input" type="text" clearable focus v-model="username" placeholder="请输入域名/服务器地址+端口">{{ipAddress}}</m-input>
			</view>
			<!-- <view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view> -->
		</view>
		<view class="input-group" v-else>
			<view class="input-row border" style="height: 67rpx;">
				<image style="width:56rpx; height: 60rpx; background-color: #FFFFFF;"  src="../../static/img/ip_icon.png"
				                @error="imageError"></image>
				<m-input class="m-input" type="text" clearable focus v-model="username"  placeholder="请输入域名/服务器地址+端口"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">保存</button>
		</view>
		<view class="action-row">
			<!-- <navigator url="../reg/reg">注册账号</navigator> -->
			<!-- <text>|</text>
			<navigator url="../pwd/pwd">忘记密码</navigator> -->
		</view>
		<!-- <view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
			<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
				<image :src="provider.image" @tap="oauth(provider.value)"></image> -->
				<!-- #ifdef MP-WEIXIN -->
				<!-- <button v-if="!isDevtools" open-type="getUserInfo" @getuserinfo="getUserInfo"></button> -->
				<!-- #endif -->
			<!-- </view>
		</view> -->
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				loginType: 0,
				loginTypeList: ['密码登录'],
				mobile: '',
				code: '',
				providerList: [],
				hasProvider: false,
				username: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
				codeDuration: 0,
				ipAddress:uni.getStorage("ipAddress")
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			sendSmsCode() {
				if(this.codeDuration) {
					uni.showModal({
						content: `请在${this.codeDuration}秒后重试`,
						showCancel: false
					})
				}
				if (!/^1\d{10}$/.test(this.mobile)) {
					uni.showModal({
						content: '手机号码填写错误',
						showCancel: false
					})
					return
				}
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'sendSmsCode',
						params: {
							mobile: this.mobile
						}
					},
					success: (e) => {
						if (e.result.code == 0) {
							uni.showModal({
								content: '验证码发送成功，请注意查收',
								showCancel: false
							})
							this.codeDuration = 60
							this.codeInterVal = setInterval(() => {
								this.codeDuration--
								if (this.codeDuration === 0) {
									if (this.codeInterVal) {
										clearInterval(this.codeInterVal)
										this.codeInterVal = null
									}
								}
							}, 1000)
						} else {
							uni.showModal({
								content: '验证码发送失败：' + e.result.msg,
								showCancel: false
							})
						}

					},
					fail(e) {
						uni.showModal({
							content: '验证码发送失败',
							showCancel: false
						})
					}
				})
			},
			loginByPwd() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.username.length < 1) {
					uni.showToast({
						icon: 'none',
						title: '域名不能为空'
					});
					return;
				}
				uni.setStorageSync('ipAddress', this.username)
				uni.setStorageSync('login_type', 'online')
				this.toMain(this.username);
				// if (this.password.length < 6) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '最短为 6 个字符'
				// 	});
				// 	return;
				// }
				// const data = {
				// 	username: this.username,
				// 	password: this.password
				// };
				// let _self = this;

				// uniCloud.callFunction({
				// 	name: 'user-center',
				// 	data: {
				// 		action: 'login',
				// 		params: data
				// 	},
				// 	success: (e) => {

				// 		console.log('login success', e);

				// 		if (e.result.code == 0) {
				// 			uni.setStorageSync('uniIdToken', e.result.token)
				// 			uni.setStorageSync('username', e.result.username)
				// 			uni.setStorageSync('login_type', 'online')
				// 			_self.toMain(_self.username);
				// 		} else {
				// 			uni.showModal({
				// 				content: e.result.msg,
				// 				showCancel: false
				// 			})
				// 			console.log('登录失败', e);
				// 		}

				// 	},
				// 	fail(e) {
				// 		uni.showModal({
				// 			content: JSON.stringify(e),
				// 			showCancel: false
				// 		})
				// 	}
				// })
			},
			loginBySms() {
				if (!/^1\d{10}$/.test(this.mobile)) {
					uni.showModal({
						content: '手机号码填写错误',
						showCancel: false
					})
					return
				}
				if (!/^\d{6}$/.test(this.code)) {
					uni.showModal({
						title: '验证码为6位纯数字',
						showCancel: false
					});
					return;
				}
				let _self = this;
				// const username = e.result.username || '新用户'
				// uni.setStorageSync('uniIdToken', e.result.token)
				uni.setStorageSync('ipAddress', this.username.length)
				uni.setStorageSync('login_type', 'online')
				// uniCloud.callFunction({
				// 	name: 'user-center',
				// 	data: {
				// 		action: 'loginBySms',
				// 		params: {
				// 			mobile: this.mobile,
				// 			code: this.code
				// 		}
				// 	},
				// 	success: (e) => {

				// 		console.log('login success', e);

				// 		if (e.result.code == 0) {
				// 			const username = e.result.username || '新用户'
				// 			uni.setStorageSync('uniIdToken', e.result.token)
				// 			uni.setStorageSync('username', username)
				// 			uni.setStorageSync('login_type', 'online')
				// 			_self.toMain(username);
				// 		} else {
				// 			uni.showModal({
				// 				content: e.result.msg,
				// 				showCancel: false
				// 			})
				// 			console.log('登录失败', e);
				// 		}

				// 	},
				// 	fail(e) {
				// 		uni.showModal({
				// 			content: JSON.stringify(e),
				// 			showCancel: false
				// 		})
				// 	}
				// })
			},
			bindLogin() {
				switch (this.loginType) {
					case 0:
						this.loginByPwd()
						break;
					case 1:
						this.loginBySms()
						break;
					default:
						break;
				}
			},
			oauth(value) {
				console.log('三方登录只演示登录api能力，暂未关联云端数据');
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.loginLocal(infoRes.userInfo.nickName);
							},
							fail() {
								uni.showToast({
									icon: 'none',
									title: '登陆失败'
								});
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			getUserInfo({
				detail
			}) {
				console.log('三方登录只演示登录api能力，暂未关联云端数据');
				if (detail.userInfo) {
					this.loginLocal(detail.userInfo.nickName);
				} else {
					uni.showToast({
						icon: 'none',
						title: '登陆失败'
					});
				}
			},
			loginLocal(nickName) {
				uni.setStorageSync('login_type', 'local')
				uni.setStorageSync('username', nickName)
				this.toMain(nickName);
			},
			toMain(userName) {
				// this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.navigateBack();
				} else {
					uni.reLaunch({
						url: '../login/login',
					});
				}

			}
		},
		onReady() {
			this.initPosition();
			this.initProvider();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
		}
	}
</script>

<style>
	.login-type {
		display: flex;
		justify-content: center;
	}

	.login-type-btn {
		line-height: 30px;
		margin: 0px 15px;
	}

	.login-type-btn.act {
		color: #52C378;
		border-bottom: solid 1px #52C378;
	}

	.send-code-btn {
		width: 120px;
		text-align: center;
		background-color: #52C378;
		color: #FFFFFF;
	}

	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #52C378;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	
	.primary{
		background-color: #52C378 !important;
	}
	
	.input-group::before{
		height: 0rpx;
	}
	.input-row.border::after{
		left: 60rpx;
		right: 40rpx;
	}
	
	.input-group::after{
		left: 60rpx;
		right: 40rpx;
	}
</style>
