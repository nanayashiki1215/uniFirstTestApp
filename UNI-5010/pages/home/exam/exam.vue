<template>
	<view>
		<!-- 导航条 -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(item,index) in Tab" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<!-- end -->
		
		<!-- 时间提示 -->
		<view class="" style="background: #1CBBB4;height: 60upx;padding: 10upx;">
			<text style="font-weight: 550;">2017-2018学年第二学期</text>
		</view>
		<!-- end -->
		
		<view class="bg-white"  style="padding: 20upx;display: flex;" v-for="(item,index) in 5" :key="index" >
			<view class="" style="margin-left: 20upx;">
				<text class="" style="color: #2E2E2E; font-weight: 650;font-size: 30upx;" >[010122001]教师语音技能</text>
				<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
					<text>学分:</text>
					<text  style="margin-left: 10upx;">2.0</text>
				</view>
				
				<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
					<text>考试性质:</text>
					<text  style="margin-left: 10upx;">中考</text>
				</view>
				<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
					<text>考核方式:</text>
					<text  style="margin-left: 10upx;">考查</text>
				</view>
				<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
					<text>轮 次:</text>
					<text  style="margin-left: 10upx;">其中考试</text>
				</view>
				<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
					<text>考试地点:</text>
					<text  style="margin-left: 10upx;">A7 316</text>
				</view>
				<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
					<text>座位号:</text>
					<text  style="margin-left: 10upx;">7</text>
				</view>
				<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
					<text>2018-04-23(8周 星期一)08：30-09：30:</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				Tab:["备考中",'已结束'],
				
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style>

</style>
