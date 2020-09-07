<template>
	<view style="padding: 10upx;">
		
		
		<!-- 学期 -->
		<view style="padding: 20upx;display: flex;align-content: center;align-items: center;justify-content: center;">
			<view class="">
				<text style="font-weight: 550;">学年</text>
			</view>
			<view class="" style="margin-top: 5upx;margin-left: 20upx;border: 1upx solid #2E2E2E;padding: 5upx;width: 200upx;border-radius: 10upx;padding-left: 10upx; ">
				<text style="font-size: 26upx;font-weight: 550;">2018</text>
				<text class="cuIcon-triangledownfill" style="margin-left: 45%"></text>
			</view>
			
			<view class="" style="margin-left: 30upx;">
				<text style="font-weight: 550;">学期</text>
			</view>
			<view class="" style="margin-top: 5upx;margin-left: 20upx;border: 1upx solid #2E2E2E;padding: 5upx;width: 200upx;border-radius: 10upx;padding-left: 10upx; ">
				<text style="font-size: 26upx;width: 100%;font-weight: 550;">第二学期</text>
				<text class="cuIcon-triangledownfill" style="margin-left: 20%"></text>
			</view>
		</view>
		<!-- end -->
		
		<!-- 日期 -->
		<view class="bg-white shadow" style="border-radius: 20upx;">
			
			<view class="" style="display: flex;margin-bottom: 20upx;">
				<view class="class_biao" style="width: 18%;height: 150upx;display: flex;flex-direction: column;align-items: center;align-content: center;justify-content: center;" >
					<text>5月</text>
					<view style="margin-top: 10upx;">
						12/周
					</view>
				</view>
				<view class="" style="width: 5upx;height: 150upx;background: #007AFF;"></view>
				
				<view v-for="(item,index) in 5" :key="index" class="" style="padding: 10upx;display: flex;flex-direction: column;justify-content: center;align-content: center;align-items: center; width: 130upx;">
					<text>MON</text>
					<view style="margin-top: 20upx;">
						<text>06</text>
					</view>
				</view>
				
				
			</view>
			
			</view>
			<!-- end -->
			
		
		<!-- 课程表 -->
		<view class="bg-white shadow " style="padding: 10upx;margin-top: 20upx;border-top-left-radius: 20upx;border-top-right-radius: 20upx;">
			<view class="" style="display: flex;" v-for="(item,index) in 8" :key="index">
				
			<view class="class_biao" style="width: 22%;height: 150upx;display: flex;flex-direction: column;align-items: center;align-content: center;justify-content: center;" >
				<text>第一节</text>
				<view class="" style="font-size: 20upx;margin-top: 10upx;">
					<text>8:20-9:30</text>
				</view>
			</view>
			<view class="" style="width: 5upx;height: 150upx;background: #007AFF;"></view>
				
					
				<view v-for="(item,index) in 5" :key="item" class="bg-grey" style="width: 150upx;margin-left: 10upx;margin-bottom: 10upx;">
				
				<view class="" style="padding: 10upx;">
					<text style="font-size: 20upx;font-weight: 550;color: #2E2E2E;">软件开发</text>
					<view style="display: flex;justify-content: center;">
						<text style="font-size: 18upx;">1-20周</text>
					</view>
					<view class="" style="display: flex;justify-content: center;">
						<text style="font-size: 15upx;">李老师</text>
					</view>
					<view class="" style="display: flex;justify-content: center;">
						<text class="cuIcon-locationfill" style="font-size: 15upx;">A7 316</text>
					</view>
				</view>
				
				</view>
				
			</view>
			
			</view>
			<!-- end -->
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			
		},
		methods: {
			
		},
		onLoad(optins) {
			console.log("课程表：onLoad")
		},
		onShow() {
			console.log("课程表：onShow")
		},
		onHide() {
			console.log("课程表：onHide")
		}
	}
</script>

<style>
.class_biao{
	height: 200upx;
	font-weight: 550;
}
</style>
