<template>
	<view>
		<!-- <view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-titles text-black"></text>
				<text class="text-xl text-bold">课业</text>
			</view>
		</view> -->
		
		
		<!-- 导航条 -->
		<!-- <view class="bg-white" style="padding: 20upx;" >
			
			<view class="top-nav " style="padding: 20upx;display: flex;" >
				<view @click.native="select(0)" class="" style="display: flex;flex-direction: column;justify-content: center;align-content: center;flex: 1;align-items: center;">
					<text :class="select0 ? 'back-circle' : '' " class="  cuIcon-activityfill text-gray " style="font-size: 50upx;margin-bottom: 10upx;"></text>
					<text class="text-white">考试</text>
					<text :class="select0 ? 'lint-or' : '' "></text>
				</view>
				
				<view @click.native="select(1)" class="" style="display: flex;flex-direction: column;justify-content: center;align-content: center;flex: 1;align-items: center;">
					<text :class="select1 ? 'back-circle' : '' " class="cuIcon-activityfill text-gray" style="font-size: 50upx;margin-bottom: 10upx;"></text>
					<text class="text-white">考勤</text>
					<text :class="select1 ? 'lint-or' : '' "></text>
				</view>
				
				<view @click.native="select(2)" class="" style="display: flex;flex-direction: column;justify-content: center;align-content: center;flex: 1;align-items: center;">
					<text :class="select2 ? 'back-circle' : '' " class="cuIcon-activityfill text-gray" style="font-size: 50upx;margin-bottom: 10upx;"></text>
					<text class="text-white">课程表</text>
					<text :class="select2 ? 'lint-or' : '' "></text>
				</view>
			</view>
		</view> -->
		<!-- end -->
		
		
		
	<!-- <timeTable v-if="select2"></timeTable>
	<check v-if="select1"></check>	 -->
	
		
	</view>
	
</template>

<script>
	import check from "./checking/checking.vue"
	import timeTable from "./timetable/timetable.vue"
	export default {
		components:{timeTable,check},
		data() {
			return {
				select0:true,
				select1:false,
				select2:false,
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
			
			
			// 头部选择
			select:function(index){
				if(index == 0){
					this.select0 = true;
					this.select1 = false;
					this.select2 = false;
				}else if(index == 1){
					this.select0 = false;
					this.select1 = true;
					this.select2 = false;
					
				}else if(index == 2){
					this.select0 = false;
					this.select1 = false;
					this.select2 = true;
				}
			}
		}
	}
</script>

<style>
.top-nav{
	background: rgb(84, 93, 161);
	height: 200upx;
	border-radius: 20upx;
}
.lint-or{
	width: 48upx;
	height: 5upx;
	background:rgb(153, 158, 199);
	border-radius: 20upx;
	margin-top: 6upx;
}
.back-circle{
	background: rgb(255, 255, 255);
	padding: 15upx;
	border-radius: 100%;
}
</style>
