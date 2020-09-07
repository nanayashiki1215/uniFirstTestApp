<template>
	<view style="padding: 20upx;">
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
		
		<!-- 日期 -->
		<view @click.native="toDesc" class="bg-white shadow" style="border-radius: 20upx;" v-for="(citem,index) in score" :key="index">
			
			<view class="" style="display: flex;margin-bottom: 20upx;">
				<view class="class_biao" style="width: 18%;height: 150upx;display: flex;flex-direction: column;align-items: center;align-content: center;justify-content: center;
				padding: 20upx;font-weight: 550;
				">
					软件开发设计
				</view>
				<view class="" style="width: 5upx;height: 150upx;background: #007AFF;"></view>
				
				<view  class="" style="padding: 10upx;display: flex;flex-direction: column;justify-content: center;align-content: center;align-items: center; width: 150upx;">
					<text>考勤分</text>
					<view style="margin-top: 20upx;">
						<text>{{citem.not1}}</text>
					</view>
				</view>
				
				<view  class="" style="padding: 10upx;display: flex;flex-direction: column;justify-content: center;align-content: center;align-items: center; width: 150upx;">
					<text>作业均分</text>
					<view style="margin-top: 20upx;">
						<text :style="citem.not2 < 60 ? 'color: red;font-weight: 550;' : '' ">{{citem.not2}}</text>
					</view>
				</view>
				
				<view  class="" style="padding: 10upx;display: flex;flex-direction: column;justify-content: center;align-content: center;align-items: center; width: 150upx;">
					<text>期末成绩</text>
					<view style="margin-top: 20upx;">
						<text :style="citem.not3 < 60 ? 'color: red;font-weight: 550;' : '' ">{{citem.not3}}</text>
					</view>
				</view>
				
				<view  class="" style="padding: 10upx;display: flex;flex-direction: column;justify-content: center;align-content: center;align-items: center; width: 150upx;">
					<text>总分</text>
					<view style="margin-top: 20upx;">
						<text :style="citem.not4 < 60 ? 'color: red;font-weight: 550;' : '' ">{{citem.not4}}</text>
					</view>
				</view>
				
			</view>
			
			</view>
			<!-- end -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gradeTitle:['','','',''],
				score:[
					{
						id:1,
						not1:8.0,
						not2:56.6,
						not3:69.5,
						not4:78
					},
					{
						id:1,
						not1:8.0,
						not2:60.6,
						not3:59,
						not4:78
					},
					{
						id:1,
						not1:8.0,
						not2:56.6,
						not3:69.5,
						not4:50
					}
				]
			}
		},
		methods: {
			
			// 跳转到详细页面
			toDesc:function(){
				uni.navigateTo({
					url:"/pages/my/transcriptDesc/transcriptDesc"
				})
			}
			
		}
	}
</script>

<style>

</style>
