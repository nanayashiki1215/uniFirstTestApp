<template>
	<view>
		
		<!-- 签到地点 -->
		<view class="bg-white">
				<view class="text-black" style="font-size: 30upx;font-weight: 550;display: flex;justify-content: center;align-content: center;align-items: center;">
					<text style="margin-right: 10upx;">软件开发</text>
					<text class="cuIcon-locationfill">A7 318</text>
				</view>
				
				<view style="width: 50%;height: 5upx;background: #8F8F94;margin-left: 25%;margin-top: 1vh;"></view>
				
				<view style="font-weight: 550;font-size: 25upx;margin-top: 10upx;margin-left: 38%;" >
					<text style="margin-right: 10upx;"> 董先生</text>
					<text> 地五、六</text>
				</view>
		</view>
		<!-- end -->
		
		<!-- 图片 -->
		<view class="bg-white" style="padding: 30upx;display: flex;justify-content: center;align-items: center;">
			<image src="../../../static/logo.png" style="width: 300upx;height: 300upx;" mode=""></image>
		</view>
		<view @click.native="sign_in" class="bg-white" style="display: flex;justify-content: center;font-weight: 550;color: #5C8DFF;padding-bottom: 20upx;">
			<text>点击签到</text>
		</view>
		<!-- end -->
		
		<!-- 导航栏 -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<!-- end -->
		
		<!-- 时间轴 -->
		
		<view class="" style="padding: 20upx;">
			
		<view class="bg-white shadow-warp " style="padding: 20upx;border-radius: 20upx;margin-bottom: 20upx;" v-for="(item,index) in 5" :key="index">
			<view  style="margin-left: 2%;">
				<text style="margin-right: 20upx; "> 2019-12-23</text>
				<text>星期五</text>
			</view>
			
			<!-- 内容 -->
			<view class="" style="display: flex;padding: 10upx;" v-for="(item,index) in tiemline" :key="index" >
				
				<view class="" style="width: 12%;font-weight: 550;">
					<text :class="item.state == 0 ? 'text-black' :  item.state == 1 ? 'text-blue': item.state == 2 ? 'text-red' : '' ">准点</text>
				</view>
				
				<view class="" style="width: 10%;">
					<text class="cuIcon-title"></text>
					<view class="" style="background: #007AFF;height: 60upx;width: 3upx;margin-left: 20%;margin-top: 0upx;">
					</view>
				</view>
				
				<view style="">
					<text style="font-size:28upx;font-weight: 550;margin-right: 20upx;">数据库设计与应用</text>
					<text style="font-size: 25upx;">第七、八节</text>
					<view>
						<text class="cuIcon-locationfill" style="font-size: 23upx;">A7 310</text>
					</view>
				</view>
				
			</view>
			<!-- end -->
			
			
		</view>
		
		</view>
		
		<!-- end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 导航条
				TabCur: 0,
				scrollLeft: 0,
				tabList:[
					{
						id:1,
						name:'全部'
					},
					{
						id:1,
						name:'准点'
					},
					{
						id:1,
						name:'缺勤'
					},
					{
						id:1,
						name:'请假'
					},
				
				],
				
				// 时间轴
				tiemline:[
					{ //state:0 准点，1:
						id:1,
						state:0,
						course:'数据库设计',
						time:'第一、二节',
						addr:'A7 310'
					},
					{
						id:1,
						state:1,
						course:'软件开发与管理',
						time:'第一、二节',
						addr:'A7 310'
					},
					{
						id:1,
						state:0,
						course:'HTML5设计',
						time:'第一、二节',
						addr:'A7 310'
					},
					{
						id:1,
						state:2,
						course:'CSS3讲解',
						time:'第一、二节',
						addr:'A7 310'
					},
					{
						id:1,
						state:0,
						course:'java设计入门',
						time:'第一、二节',
						addr:'A7 310'
					},
					{
						id:1,
						state:1,
						course:'数据库设计开发',
						time:'第三、二节',
						addr:'A7 310'
					}
				]
				// end
			}
		},
		methods: {
			// 导航条
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			
			// 点击签到
			sign_in:function(){
				uni.startSoterAuthentication({
					requestAuthModes:['fingerPrint','facial'],
					challenge:'fid',
					authContent:'签到打卡',
					success:function (res) {
						console.log(res)
					},
					fail:function (err) {
						console.log(err)
					}
					 
				})
			}
		},
		onLoad(optins) {
			console.log("签到页面：onLoad")
		},
		onShow() {
			console.log("签到页面：onShow")
		},
		onHide() {
			console.log("签到页面：onHide")
		}
	}
</script>

<style>

</style>
