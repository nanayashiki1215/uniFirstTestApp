<template>
	<view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles text-black"></text>
				<text class="text-xl text-bold">我的</text>
			</view>
		</view>
		
		<!-- 头像 -->
		<view class="bg-white" style="padding: 20upx;display: flex;justify-content: center;align-items: center;">
			<image src="../../static/logo.png" mode="" style="width: 200upx;height: 200upx;border-radius: 100%;margin-bottom: 20upx;"></image>
		</view>
		<!-- end -->
		
		<!-- 列表 -->
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''" style="margin-bottom: 20upx;margin-top: 20upx;">
				<view class="content">
					<text class="cuIcon-settingsfill text-grey"></text>
					<text class="text-black text-w">我的档案</text>
				</view>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
					<text class="cuIcon-selectionfill text-orange"></text>
					<text class="text-black text-w">收藏</text>
				</navigator>
			</view>
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
					<text class="cuIcon-appreciatefill text-orange"></text>
					<text class="text-black text-w">设置</text>
				</navigator>
			</view>
			
			<view @click.native="toSetting" class="cu-item" :class="menuArrow?'arrow':''" style="margin-top: 20upx;margin-bottom: 20upx;">
				<navigator class="content" hover-class="none" url="../index/index" open-type="redirect">
					<text class="cuIcon-creativefill text-orange"></text>
					<text class="text-black text-w">退出登陆</text>
				</navigator>
			</view>
			
		</view>
		<!-- end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 列表
				menuBorder: true,
				menuArrow: true,
				menuCard: false,
				// end
			}
		},
		methods: {
			// 跳转设置页面
			toSetting:function(){
				
				uni.removeStorageSync('auth-token');
				uni.navigateTo({url:"../index/index"})
			},
			// 跳转到成绩单
			toTranscript:function(){
				uni.navigateTo({
					url:"/pages/my/transcript/transcript"
				})
			}
			
		}
	}
</script>

<style>
	.text-w{
		font-weight: 550;
	}
</style>
