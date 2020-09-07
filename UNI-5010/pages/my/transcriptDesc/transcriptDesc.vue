<template>
	<view>
		<!-- 学年 -->
		<view class="bg-white" style="padding: 20upx;">
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
			</view>
			<!-- end -->
			<radio-group class="block" >
			<view class="bg-white"  style="padding: 20upx;margin-top: 20upx;display: flex;" v-for="(item,index) in 5" :key="index" >
							<view >
								<radio  class='blue radio'  :checked="index == 0 ? true : false " value="C"></radio>
							</view>
				<view class="" style="margin-left: 20upx;">
					<text class="" style="color: #6739B6; font-weight: 650;font-size: 35upx;" >产品设计</text>
					<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
						<text>考试姓名:</text>
						<text  style="margin-left: 10upx;">董先生</text>
					</view>
					
					<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
						<text>考试类型:</text>
						<text  style="margin-left: 10upx;">补考</text>
					</view>
					<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
						<text>考试时间:</text>
						<text  style="margin-left: 10upx;">2019.09.05</text>
						<text  style="margin-left: 10upx;">下午3:-00 5:00</text>
					</view>
					<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
						<text>考试地点:</text>
						<text  style="margin-left: 10upx;">A7 316</text>
					</view>
					<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
						<text>考试座位:</text>
						<text  style="margin-left: 10upx;">16</text>
					</view>
					<view class="" style="font-size: 25upx;margin-top: 10upx;font-weight: 550;">
						<text>准考证号:</text>
						<text  style="margin-left: 10upx;">GZ20176666</text>
					</view>
				</view>
			</view>
			</radio-group>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
